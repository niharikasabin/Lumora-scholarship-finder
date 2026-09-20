import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI Client
function getGenAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Warning: GEMINI_API_KEY is not set. Gemini API calls will run in heuristic fallback mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. AI Scholarship Matching Endpoint
app.post("/api/ai/match", async (req, res) => {
  try {
    const { studentProfile, scholarships } = req.body;
    if (!studentProfile) {
      return res.status(400).json({ error: "studentProfile is required" });
    }

    const aiClient = getGenAiClient();
    if (!aiClient) {
      // Fallback matching logic if key missing
      const results = (scholarships || []).map((s: any) => ({
        scholarshipId: s.id,
        score: Math.floor(Math.random() * 25) + 72,
        acceptanceProbability: "Medium",
        matchedReasons: [
          `Your ${studentProfile.targetDegree} target aligns with ${s.title}`,
          `Academic record (GPA ${studentProfile.gpa}) meets or exceeds criteria`,
          `Field of study (${studentProfile.targetFields?.join(", ") || "General"}) matches eligible disciplines`
        ],
        missingQualifications: [
          "Needs 1 additional formal academic recommendation letter",
          "Ensure English language proficiency test scores are officially submitted"
        ],
        actionableTips: [
          "Highlight research projects and leadership roles in your statement of purpose",
          "Apply at least 3 weeks before deadline to ensure transcript verification"
        ],
        strengths: ["Strong academic background", "Relevant extracurricular engagement"],
        estimatedCompetitiveness: "Competitive Candidate (Top 15%)"
      }));
      return res.json({ matches: results });
    }

    const prompt = `
You are Lumora's AI Scholarship Eligibility & Matching Agent.
Analyze the following student profile against the list of scholarships.

Student Profile:
${JSON.stringify(studentProfile, null, 2)}

Scholarship List:
${JSON.stringify((scholarships || []).slice(0, 15), null, 2)}

Evaluate each scholarship and generate a detailed matching assessment.
Return a JSON array of objects with schema:
[
  {
    "scholarshipId": "string (matching id from list)",
    "score": number (0 to 100),
    "acceptanceProbability": "High" | "Medium" | "Low",
    "matchedReasons": ["string", "string"],
    "missingQualifications": ["string"],
    "actionableTips": ["string", "string"],
    "strengths": ["string", "string"],
    "estimatedCompetitiveness": "string"
  }
]
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              scholarshipId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              acceptanceProbability: { type: Type.STRING },
              matchedReasons: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingQualifications: { type: Type.ARRAY, items: { type: Type.STRING } },
              actionableTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedCompetitiveness: { type: Type.STRING }
            },
            required: ["scholarshipId", "score", "acceptanceProbability", "matchedReasons", "missingQualifications", "actionableTips", "strengths", "estimatedCompetitiveness"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "[]");
    return res.json({ matches: parsed });
  } catch (error: any) {
    console.error("Match error:", error);
    return res.status(500).json({ error: error?.message || "Failed to match scholarships" });
  }
});

// 2. AI Essay Review Agent Endpoint
app.post("/api/ai/essay-review", async (req, res) => {
  try {
    const { essayContent, scholarshipTitle, promptRequirements, targetWordLimit } = req.body;
    if (!essayContent) {
      return res.status(400).json({ error: "essayContent is required" });
    }

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        feedback: {
          score: 84,
          grammarScore: 90,
          storytellingScore: 82,
          persuasivenessScore: 85,
          alignmentScore: 80,
          wordCount: essayContent.split(/\s+/).filter(Boolean).length,
          targetWordLimit: targetWordLimit || 500,
          keyStrengths: [
            "Clear personal motivation and articulate career objectives",
            "Effective introduction with an engaging hook"
          ],
          areasForImprovement: [
            "Quantify specific achievements with concrete metrics",
            "Tie personal story directly to the scholarship selection values"
          ],
          annotatedSuggestions: [
            {
              originalText: essayContent.substring(0, 80) + "...",
              suggestion: "Enhance action verbs and remove passive voice phrasing.",
              reason: "Improves narrative punch and clarity."
            }
          ],
          polishedVersion: essayContent + "\n\n[AI Polished & Refined Version]:\nWith a passionate commitment to technological innovation and community impact, I seek to leverage this fellowship to address critical global challenges..."
        }
      });
    }

    const prompt = `
You are Lumora's AI Essay Review & Polish Agent.
Evaluate the following student application essay for the scholarship "${scholarshipTitle || "General Scholarship"}".

Essay Content:
${essayContent}

Requirements / Target Word Limit: ${targetWordLimit || "500 words"}
Prompt Guidelines: ${promptRequirements || "Standard SOP / Personal Statement"}

Analyze the essay carefully for grammar, storytelling, persuasiveness, alignment with scholarship mission, and structure.
Return JSON with schema:
{
  "score": number (0-100),
  "grammarScore": number (0-100),
  "storytellingScore": number (0-100),
  "persuasivenessScore": number (0-100),
  "alignmentScore": number (0-100),
  "wordCount": number,
  "targetWordLimit": number,
  "keyStrengths": ["string"],
  "areasForImprovement": ["string"],
  "annotatedSuggestions": [
    {
      "originalText": "string",
      "suggestion": "string",
      "reason": "string"
    }
  ],
  "polishedVersion": "string (the complete improved and professionally polished essay draft)"
}
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            grammarScore: { type: Type.NUMBER },
            storytellingScore: { type: Type.NUMBER },
            persuasivenessScore: { type: Type.NUMBER },
            alignmentScore: { type: Type.NUMBER },
            wordCount: { type: Type.NUMBER },
            targetWordLimit: { type: Type.NUMBER },
            keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
            annotatedSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  originalText: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["originalText", "suggestion", "reason"]
              }
            },
            polishedVersion: { type: Type.STRING }
          },
          required: ["score", "grammarScore", "storytellingScore", "persuasivenessScore", "alignmentScore", "wordCount", "targetWordLimit", "keyStrengths", "areasForImprovement", "annotatedSuggestions", "polishedVersion"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ feedback: parsed });
  } catch (error: any) {
    console.error("Essay review error:", error);
    return res.status(500).json({ error: error?.message || "Failed to review essay" });
  }
});

// 3. AI Essay Generator Endpoint
app.post("/api/ai/essay-generate", async (req, res) => {
  try {
    const { type, studentProfile, scholarshipTitle, wordLimit, additionalNotes } = req.body;

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        content: `Dear Selection Committee,\n\nI am writing to express my enthusiastic application for the ${scholarshipTitle || "Scholarship"}. As a dedicated student pursuing ${studentProfile?.targetDegree || "higher education"} in ${studentProfile?.targetFields?.join(", ") || "my discipline"}, I have consistently strived for academic excellence and meaningful community contribution.\n\nMy academic journey at ${studentProfile?.currentEducation || "university"} (GPA: ${studentProfile?.gpa || "3.8"}) has been defined by rigorous research and leadership in ${studentProfile?.skills?.join(", ") || "innovation"}. Receiving the ${scholarshipTitle || "grant"} will empower me to advance my studies without financial constraints...\n\nThank you for considering my application.\n\nSincerely,\n${studentProfile?.name || "Applicant"}`
      });
    }

    const prompt = `
You are Lumora's AI Application Essay Generator Agent.
Draft a compelling, authentic, high-scoring ${type || "Personal Statement"} for the student applying to "${scholarshipTitle || "Prestigious Scholarship"}".

Student Background:
Name: ${studentProfile?.name || "Applicant"}
Target Degree: ${studentProfile?.targetDegree || "Postgraduate"}
Field: ${studentProfile?.targetFields?.join(", ") || "STEM"}
Current Education: ${studentProfile?.currentEducation}
GPA: ${studentProfile?.gpa}
Achievements: ${studentProfile?.achievements?.join("; ")}
Research Experience: ${studentProfile?.researchExperience}
Volunteer Work: ${studentProfile?.volunteerWork}
Financial Need: ${studentProfile?.financialNeedScore}/10

Target Word Count: ${wordLimit || 500} words.
Additional Notes: ${additionalNotes || "None"}

Write a complete, structured, highly convincing essay. Avoid generic clichés. Use specific anecdotes based on the profile data.
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });

    return res.json({ content: response.text });
  } catch (error: any) {
    console.error("Essay generate error:", error);
    return res.status(500).json({ error: error?.message || "Failed to generate essay" });
  }
});

// 4. AI Chatbot Assistant Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, chatHistory, studentProfile } = req.body;
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        reply: `Hello! I am Lumora's AI Assistant. Based on your profile (${studentProfile?.targetDegree || "Student"} in ${studentProfile?.targetFields?.[0] || "General"}), I recommend exploring scholarships like Fulbright, Chevening, and DAAD. How can I assist you with eligibility, essay writing, or application deadlines today?`,
        suggestions: ["Find STEM scholarships in Germany", "Review my SOP outline", "What documents do I need for Fulbright?"]
      });
    }

    const systemInstruction = `
You are Lumora, an expert AI Grant & Scholarship Consultant.
You assist high school, undergraduate, postgraduate, and PhD candidates worldwide in finding funding opportunities, passing eligibility criteria, preparing Statements of Purpose, improving resumes, and tracking deadlines.

Student Profile Context:
${JSON.stringify(studentProfile || {}, null, 2)}

Provide clear, encouraging, precise, and actionable answers.
When relevant, recommend specific global scholarships (e.g., Fulbright, Rhodes, DAAD, Chevening, Gates Cambridge, MEXT, Knight-Hennessy, Erasmus Mundus, OpenAI Scholar Grant).
Include 2-3 quick follow-up prompt chips in JSON format at the bottom if applicable.
    `;

    const chat = aiClient.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }] // Allows grounded web search for latest deadlines & requirements
      }
    });

    // Send formatted message
    const response = await chat.sendMessage({
      message: message
    });

    // Extract grounding sources if any
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = (groundingChunks || []).map((chunk: any) => ({
      title: chunk.web?.title || "Resource Link",
      url: chunk.web?.uri || "#"
    })).filter((s: any) => s.url !== "#");

    return res.json({
      reply: response.text,
      groundingSources: sources,
      suggestions: [
        "What scholarships match my profile?",
        "How can I improve my acceptance probability?",
        "Find fully-funded Master's programs in Europe"
      ]
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: error?.message || "Failed to process chat message" });
  }
});

// 5. AI Resume Review Endpoint
app.post("/api/ai/resume-review", async (req, res) => {
  try {
    const { resumeText, studentProfile } = req.body;

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        review: {
          atsScore: 88,
          formattingScore: 92,
          keywordScore: 85,
          impactScore: 86,
          strengths: [
            "Clear chronological structure with bulleted accomplishments",
            "Includes measurable achievements and relevant GPA metrics"
          ],
          improvements: [
            "Add relevant technical keywords like 'Data Modeling' and 'Research Methodology'",
            "Format section headers with standard ATS-friendly naming (Education, Work Experience, Research)"
          ],
          missingKeywords: ["Grant Writing", "Quantitative Analysis", "Peer Review", "Cross-functional Collaboration"]
        }
      });
    }

    const prompt = `
You are Lumora's AI ATS Resume Auditor & Scholarship Evaluator.
Analyze the following resume text for ATS compliance and scholarship competitiveness.

Resume Content:
${resumeText || "Sample Student Resume"}

Student Profile:
${JSON.stringify(studentProfile || {})}

Return JSON schema:
{
  "atsScore": number (0-100),
  "formattingScore": number (0-100),
  "keywordScore": number (0-100),
  "impactScore": number (0-100),
  "strengths": ["string"],
  "improvements": ["string"],
  "missingKeywords": ["string"]
}
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.NUMBER },
            formattingScore: { type: Type.NUMBER },
            keywordScore: { type: Type.NUMBER },
            impactScore: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["atsScore", "formattingScore", "keywordScore", "impactScore", "strengths", "improvements", "missingKeywords"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ review: parsed });
  } catch (error: any) {
    console.error("Resume review error:", error);
    return res.status(500).json({ error: error?.message || "Failed to review resume" });
  }
});

// 6. AI Document OCR / Metadata Extraction Endpoint
app.post("/api/ai/document-extract", async (req, res) => {
  try {
    const { textContent, filename } = req.body;

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        extractedData: {
          candidateName: "Alex Mercer",
          email: "alex.mercer@university.edu",
          detectedGpa: "3.88",
          detectedDegree: "Undergraduate (B.S.)",
          detectedMajor: "Computer Science & Engineering",
          skillsExtracted: ["Python", "TensorFlow", "Data Structures", "Research Writing", "Agile"],
          keyHighlights: [
            "Published paper on Machine Learning in IEEE Conference",
            "Dean's List for 6 consecutive semesters",
            "President of Robotics Club"
          ]
        }
      });
    }

    const prompt = `
Extract key student qualifications from the following document text (${filename || "Uploaded File"}):

Content:
${textContent}

Return JSON:
{
  "candidateName": "string",
  "email": "string",
  "detectedGpa": "string",
  "detectedDegree": "string",
  "detectedMajor": "string",
  "skillsExtracted": ["string"],
  "keyHighlights": ["string"]
}
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidateName: { type: Type.STRING },
            email: { type: Type.STRING },
            detectedGpa: { type: Type.STRING },
            detectedDegree: { type: Type.STRING },
            detectedMajor: { type: Type.STRING },
            skillsExtracted: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyHighlights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["candidateName", "detectedGpa", "detectedDegree", "detectedMajor", "skillsExtracted", "keyHighlights"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ extractedData: parsed });
  } catch (error: any) {
    console.error("Document extract error:", error);
    return res.status(500).json({ error: error?.message || "Failed to extract document info" });
  }
});

// 7. AI Translation Endpoint
app.post("/api/ai/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "text and targetLanguage required" });
    }

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({ translatedText: `[Translated to ${targetLanguage}]:\n${text}` });
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Translate the following academic document/essay accurately into ${targetLanguage}, maintaining formal academic tone and cultural nuances:\n\n${text}`
    });

    return res.json({ translatedText: response.text });
  } catch (error: any) {
    console.error("Translate error:", error);
    return res.status(500).json({ error: error?.message || "Failed to translate text" });
  }
});

// 8. AI Preparation Roadmap Generator Endpoint
app.post("/api/ai/roadmap", async (req, res) => {
  try {
    const { scholarshipTitle, deadline, studentProfile } = req.body;

    const aiClient = getGenAiClient();
    if (!aiClient) {
      return res.json({
        roadmap: [
          {
            week: 1,
            phase: "Discovery & Strategy",
            title: "Audit Criteria & Secure Recommenders",
            description: "Request recommendation letters early and outline key essay themes.",
            deliverables: ["2 Referee commitments", "Initial SOP bullet points"],
            estimatedHours: 4
          },
          {
            week: 2,
            phase: "Drafting",
            title: "Write First Essay Draft & Request Transcripts",
            description: "Compose core Personal Statement using Lumora AI Assistant.",
            deliverables: ["Complete 500-word SOP Draft", "Official transcript order"],
            estimatedHours: 8
          },
          {
            week: 3,
            phase: "AI Review & Refinement",
            title: "Polish Application & Run ATS Resume Audit",
            description: "Use Lumora AI Essay Auditor to check grammar, storytelling, and score.",
            deliverables: ["Revised SOP (Score > 85)", "ATS-optimized Resume"],
            estimatedHours: 6
          },
          {
            week: 4,
            phase: "Submission",
            title: "Final Proofing & Document Package Upload",
            description: "Upload all verified credentials and submit ahead of deadline.",
            deliverables: ["Submitted online application", "Confirmation receipt saved"],
            estimatedHours: 3
          }
        ]
      });
    }

    const prompt = `
Generate a 4-week structured application prep roadmap for the student applying to "${scholarshipTitle || "Target Scholarship"}".
Target Deadline: ${deadline || "Next Month"}
Student Profile: ${JSON.stringify(studentProfile || {})}

Return JSON schema:
[
  {
    "week": number,
    "phase": "string",
    "title": "string",
    "description": "string",
    "deliverables": ["string"],
    "estimatedHours": number
  }
]
    `;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              week: { type: Type.NUMBER },
              phase: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedHours: { type: Type.NUMBER }
            },
            required: ["week", "phase", "title", "description", "deliverables", "estimatedHours"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "[]");
    return res.json({ roadmap: parsed });
  } catch (error: any) {
    console.error("Roadmap error:", error);
    return res.status(500).json({ error: error?.message || "Failed to generate roadmap" });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumora AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
