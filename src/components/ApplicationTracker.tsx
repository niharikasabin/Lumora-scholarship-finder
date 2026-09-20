import React, { useState } from 'react';
import { ApplicationItem, ApplicationStatus, Scholarship } from '../types';
import { 
  Kanban, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  FileText, 
  Trash2, 
  Edit3, 
  Sparkles,
  Check,
  Bell
} from 'lucide-react';

interface ApplicationTrackerProps {
  applications: ApplicationItem[];
  onUpdateApplication: (app: ApplicationItem) => void;
  onRemoveApplication: (id: string) => void;
  scholarships: Scholarship[];
}

const KANBAN_COLUMNS: { id: ApplicationStatus; title: string; color: string }[] = [
  { id: 'Interested', title: 'Interested / Saved', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  { id: 'Preparing', title: 'Preparing Application', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'Submitted', title: 'Submitted', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'Interview', title: 'Interview Stage', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'Accepted', title: 'Accepted / Awarded', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'Rejected', title: 'Rejected / Archived', color: 'bg-rose-100 text-rose-800 border-rose-200' },
];

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateApplication,
  onRemoveApplication,
  scholarships,
}) => {
  const [editingApp, setEditingApp] = useState<ApplicationItem | null>(null);
  const [newReminderText, setNewReminderText] = useState('');

  // Handle moving card to another column
  const handleMoveColumn = (app: ApplicationItem, newStatus: ApplicationStatus) => {
    onUpdateApplication({
      ...app,
      status: newStatus
    });
  };

  // Handle adding reminder
  const handleAddReminder = () => {
    if (!editingApp || !newReminderText.trim()) return;
    const updatedReminders = [
      ...editingApp.customReminders,
      {
        id: 'rem-' + Date.now(),
        text: newReminderText.trim(),
        date: new Date().toISOString().split('T')[0],
        completed: false
      }
    ];
    const updatedApp = { ...editingApp, customReminders: updatedReminders };
    setEditingApp(updatedApp);
    onUpdateApplication(updatedApp);
    setNewReminderText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Kanban className="w-3.5 h-3.5" />
            <span>Agent 3: Automated Deadline & Pipeline Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Application Pipeline Kanban
          </h1>
          <p className="text-xs text-slate-500">
            Track progress from initial interest to final acceptance and funding disbursements.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl">
          Total Tracked: {applications.length} Applications
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((column) => {
          const columnApps = applications.filter((a) => a.status === column.id);

          return (
            <div
              key={column.id}
              className="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/80 min-h-[500px] flex flex-col space-y-3 shrink-0"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${column.color}`}>
                  {column.title}
                </span>
                <span className="text-xs font-extrabold text-slate-500">
                  {columnApps.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1">
                {columnApps.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl">
                    No applications
                  </div>
                ) : (
                  columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3 relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{app.scholarshipTitle}</h4>
                          <span className="text-[11px] text-slate-500 block truncate">{app.organization}</span>
                        </div>
                        <button
                          onClick={() => onRemoveApplication(app.id)}
                          className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          title="Remove from tracker"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Amount:</span>
                        <span className="font-bold text-emerald-600">{app.amountDisplay}</span>
                      </div>

                      {/* Deadline & Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {app.deadline}
                          </span>
                          <span className="font-bold text-blue-600">{app.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${app.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Stage Move Controls */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <select
                          id={`move-stage-select-${app.id}`}
                          aria-label="Move application stage"
                          value={app.status}
                          onChange={(e) => handleMoveColumn(app, e.target.value as ApplicationStatus)}
                          className="text-[11px] font-semibold bg-slate-100 p-1 rounded-md border border-slate-200 cursor-pointer text-slate-700"
                        >
                          {KANBAN_COLUMNS.map((col) => (
                            <option key={col.id} value={col.id}>
                              Move to: {col.title}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => setEditingApp(app)}
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
                          title="Edit application details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT APPLICATION MODAL */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Application Notes & Reminders</span>
                <h3 className="font-bold text-slate-900 text-lg">{editingApp.scholarshipTitle}</h3>
              </div>
              <button
                onClick={() => setEditingApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Progress Percentage Slider */}
            <div>
              <label htmlFor="progress-percent-input" className="block text-xs font-bold text-slate-700 mb-1">
                Completion Progress: <span className="text-blue-600 font-bold">{editingApp.progressPercent}%</span>
              </label>
              <input
                id="progress-percent-input"
                type="range"
                min="0"
                max="100"
                value={editingApp.progressPercent}
                onChange={(e) => {
                  const updated = { ...editingApp, progressPercent: parseInt(e.target.value) };
                  setEditingApp(updated);
                  onUpdateApplication(updated);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Notes Textarea */}
            <div>
              <label htmlFor="app-notes-textarea" className="block text-xs font-bold text-slate-700 mb-1">Application Notes</label>
              <textarea
                id="app-notes-textarea"
                rows={3}
                value={editingApp.notes}
                onChange={(e) => {
                  const updated = { ...editingApp, notes: e.target.value };
                  setEditingApp(updated);
                  onUpdateApplication(updated);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-blue-500 focus:outline-hidden"
                placeholder="Record recommendation letter statuses, login credentials, or essay outlines..."
              />
            </div>

            {/* Custom Reminders */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-700">Custom Reminder Schedule</span>
              <div className="flex items-center gap-2">
                <input
                  id="new-reminder-input"
                  type="text"
                  value={newReminderText}
                  onChange={(e) => setNewReminderText(e.target.value)}
                  placeholder="e.g. Email Professor Miller for LOR by Friday"
                  className="flex-1 p-2 rounded-xl border border-slate-300 text-xs"
                />
                <button
                  onClick={handleAddReminder}
                  className="px-3 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pt-2">
                {editingApp.customReminders.map((rem) => (
                  <div key={rem.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-slate-800">{rem.text}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{rem.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setEditingApp(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
