import React, { useState } from 'react';
import { X, PhoneCall, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SupportTopic } from '../types';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: SupportTopic | null;
  initialSerial?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialSerial
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serial, setSerial] = useState(initialSerial || '');
  const [issueSummary, setIssueSummary] = useState(initialTopic?.title || 'General technical assistance');
  const [callPreference, setCallPreference] = useState<'immediate' | 'scheduled'>('immediate');
  const [submittedCase, setSubmittedCase] = useState<{ caseId: string; pin: string; phone: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const caseId = `CAS-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}`;
    const pin = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;

    setSubmittedCase({
      caseId,
      pin,
      phone
    });
  };

  const handleReset = () => {
    setSubmittedCase(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold">Request Apple Helpline Callback</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedCase ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Callback Dispatched</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              We&apos;re getting an advisor on the line for you
            </h4>
            <p className="text-xs text-slate-600 mb-6">
              An Apple Senior Advisor will call your phone at{' '}
              <span className="font-semibold text-slate-900">{submittedCase.phone}</span> in approximately 2 minutes.
            </p>

            <div className="bg-[#fbfbfd] rounded-xl border border-slate-200 p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500">Case Reference Number</span>
                <span className="font-mono font-bold text-blue-600 text-sm tabular-nums">
                  {submittedCase.caseId}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs text-slate-500">Direct Verification PIN</span>
                <span className="font-mono font-bold text-slate-900 text-base tabular-nums tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                  {submittedCase.pin}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Estimated Hold Time</span>
                <span className="text-xs font-semibold text-emerald-700">&lt; 2 minutes</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mb-6">
              When the advisor calls, quote your Verification PIN to bypass preliminary identity checks and jump straight to technical diagnosis.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <p className="text-xs text-slate-600 mb-2">
              Skip hold music. Enter your details and an Apple technical advisor will ring your phone directly.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number to Call</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Serial Number (Optional)</label>
                <input
                  type="text"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value.toUpperCase())}
                  placeholder="e.g. F17K908LQP"
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 tabular-nums uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">When Should We Call?</label>
                <select
                  value={callPreference}
                  onChange={(e) => setCallPreference(e.target.value as 'immediate' | 'scheduled')}
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="immediate">Call Immediately (~2 min)</option>
                  <option value="scheduled">In 30 Minutes</option>
                  <option value="scheduled">In 1 Hour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Topic</label>
              <input
                type="text"
                value={issueSummary}
                onChange={(e) => setIssueSummary(e.target.value)}
                placeholder="Brief description of the problem"
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Request Priority Callback
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Apple Official Privacy &amp; Data Security Protected</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
