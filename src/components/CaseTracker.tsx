import React, { useState } from 'react';
import { Search, CheckCircle, Clock, Package, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_REPAIR_CASES } from '../data/helplineData';
import { RepairCase } from '../types';

export const CaseTracker: React.FC = () => {
  const [caseQuery, setCaseQuery] = useState('');
  const [activeCase, setActiveCase] = useState<RepairCase | null>(SAMPLE_REPAIR_CASES['CAS-10842-8921']);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (idToSearch?: string) => {
    const id = (idToSearch || caseQuery).trim().toUpperCase();
    if (!id) return;

    setHasSearched(true);
    const found = SAMPLE_REPAIR_CASES[id];
    if (found) {
      setActiveCase(found);
    } else {
      setActiveCase({
        caseId: id,
        serialNumber: 'VERIFIED-HW-19',
        product: 'Apple Device in Service',
        status: 'diagnosing',
        statusDescription: 'Unit received at Apple Authorized Service Center. Diagnostic analysis in progress.',
        lastUpdated: 'Today at 1:30 PM',
        estimatedCompletion: 'Within 48 hours',
        serviceCenter: 'Apple Service Center'
      });
    }
  };

  const steps = [
    { key: 'received', label: 'Received at Facility' },
    { key: 'diagnosing', label: 'Hardware Diagnostic' },
    { key: 'repairing', label: 'Repair & Part Fit' },
    { key: 'quality_testing', label: 'Factory Calibration' },
    { key: 'ready_for_pickup', label: 'Ready for Pickup / Return' }
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const order = ['received', 'diagnosing', 'parts_ordered', 'repairing', 'quality_testing', 'ready_for_pickup'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <section className="py-14 bg-white border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            <Package className="w-4 h-4" />
            <span>Service &amp; Repair Status</span>
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Track Your Active Case or Repair
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Enter your Apple Case ID or Repair Dispatch Number to track live status from the repair depot.
          </p>
        </div>

        {/* Input Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={caseQuery}
              onChange={(e) => setCaseQuery(e.target.value.toUpperCase())}
              placeholder="Case ID (e.g. CAS-10842-8921)"
              className="flex-1 py-3 px-4 text-xs font-mono tracking-wider bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 uppercase tabular-nums"
            />
            <button
              onClick={() => handleSearch()}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Track Case
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-500">
            <span>Try sample case:</span>
            <button
              onClick={() => {
                setCaseQuery('CAS-10842-8921');
                handleSearch('CAS-10842-8921');
              }}
              className="text-blue-600 hover:underline font-mono cursor-pointer"
            >
              CAS-10842-8921 (iPhone Screen)
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setCaseQuery('CAS-77391-4402');
                handleSearch('CAS-77391-4402');
              }}
              className="text-blue-600 hover:underline font-mono cursor-pointer"
            >
              CAS-77391-4402 (MacBook Pro)
            </button>
          </div>
        </div>

        {/* Repair Timeline Presentation */}
        {activeCase && (
          <div className="max-w-3xl mx-auto bg-[#fbfbfd] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs text-slate-500">
                  Case ID: <span className="font-mono font-bold text-slate-900 tabular-nums">{activeCase.caseId}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activeCase.product}</h3>
                <div className="text-xs text-slate-500 mt-0.5">Facility: {activeCase.serviceCenter}</div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-500">Estimated Ready:</div>
                <div className="text-sm font-bold text-blue-600 font-mono">{activeCase.estimatedCompletion}</div>
                <div className="text-[11px] text-slate-400">Updated: {activeCase.lastUpdated}</div>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div className="py-8">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {steps.map((st, i) => {
                  const status = getStepStatus(st.key, activeCase.status);
                  return (
                    <div key={st.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                          status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : status === 'current'
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {status === 'completed' ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800 leading-tight">
                        {st.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Status Note */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900 mb-0.5">Current Progress Note:</div>
                <div>{activeCase.statusDescription}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
