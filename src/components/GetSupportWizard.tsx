import React, { useState } from 'react';
import { 
  Wrench, Battery, KeyRound, CreditCard, Cpu, Wifi, 
  ChevronRight, Phone, MessageSquare, Calendar, CheckCircle2, 
  HelpCircle, ExternalLink, ArrowLeft, ShieldAlert
} from 'lucide-react';
import { COMMON_SUPPORT_TOPICS } from '../data/helplineData';
import { SupportTopic } from '../types';

interface GetSupportWizardProps {
  selectedProductId: string | null;
  onOpenChat: (initialTopic?: SupportTopic) => void;
  onOpenBooking: (topic?: SupportTopic) => void;
  onRequestCall: (topic?: SupportTopic) => void;
  activeTopic: SupportTopic | null;
  setActiveTopic: (topic: SupportTopic | null) => void;
}

export const GetSupportWizard: React.FC<GetSupportWizardProps> = ({
  selectedProductId,
  onOpenChat,
  onOpenBooking,
  onRequestCall,
  activeTopic,
  setActiveTopic
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Issues', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'repairs', label: 'Repairs & Damage', icon: <Wrench className="w-4 h-4" /> },
    { id: 'battery', label: 'Battery & Power', icon: <Battery className="w-4 h-4" /> },
    { id: 'passwords', label: 'Apple ID & Password', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Subscriptions', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance & OS', icon: <Cpu className="w-4 h-4" /> },
    { id: 'connectivity', label: 'Wi-Fi & Bluetooth', icon: <Wifi className="w-4 h-4" /> },
  ];

  const filteredTopics = COMMON_SUPPORT_TOPICS.filter((t) => {
    const matchesProduct = !selectedProductId || t.productId === selectedProductId;
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesProduct && matchesCat;
  });

  const toggleStep = (stepIndex: number) => {
    if (!activeTopic) return;
    const key = `${activeTopic.id}_${stepIndex}`;
    setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="get-support" className="py-14 bg-white border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Interactive Assistance
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Guided Troubleshooting &amp; Support Channels
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your symptom to run diagnostics or connect immediately with an Apple certified advisor.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveTopic(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* If Active Topic is Selected: Show Detailed Diagnostic & Helpline Actions */}
        {activeTopic ? (
          <div className="bg-[#fbfbfd] rounded-2xl border border-slate-200 p-6 sm:p-8">
            <button
              onClick={() => setActiveTopic(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all symptoms</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Symptom Summary & Interactive Checklist */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="capitalize">{activeTopic.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Self-Guided Diagnostics</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-3">
                  {activeTopic.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  {activeTopic.summary}
                </p>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Recommended Self-Service Steps:
                  </h4>
                  <div className="space-y-3">
                    {activeTopic.quickSteps.map((step, idx) => {
                      const isChecked = !!checkedSteps[`${activeTopic.id}_${idx}`];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <div className="w-4 h-4 rounded border border-slate-300 bg-white" />
                            )}
                          </div>
                          <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Need hands-on technical guidance? Our certified advisors can remotely run diagnostic scripts.
                  </span>
                </div>
              </div>

              {/* Right Column: Support Channel Options */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Connect With Apple Helpline
                  </h4>

                  <div className="space-y-3">
                    {/* Channel 1: Phone */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Direct Helpline Call</div>
                            <div className="text-xs text-slate-500">Toll-free 1-800-275-2273 · &lt; 2 min wait</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Available 24/7
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">
                        Speak directly with an Apple Advisor. We can generate a fast-track PIN for immediate routing.
                      </p>
                      <button
                        onClick={() => onRequestCall(activeTopic)}
                        className="w-full py-2 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Request Immediate Callback
                      </button>
                    </div>

                    {/* Channel 2: Live Chat */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Chat with Apple Advisor</div>
                            <div className="text-xs text-slate-500">Live text messaging · Fast response</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          Online
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">
                        Real-time message chat with an Apple Senior Advisor. Diagnostic tools and transcripts included.
                      </p>
                      <button
                        onClick={() => onOpenChat(activeTopic)}
                        className="w-full py-2 px-3 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Start Live Chat Session
                      </button>
                    </div>

                    {/* Channel 3: Genius Bar */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Genius Bar Reservation</div>
                            <div className="text-xs text-slate-500">Hands-on hardware repair at Apple Store</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Store Visit
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">
                        Book a time with an Apple Genius. Certified repairs using genuine Apple parts and diagnostic calibration.
                      </p>
                      <button
                        onClick={() => onOpenBooking(activeTopic)}
                        className="w-full py-2 px-3 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Reserve Genius Bar Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Topic Grid when no topic is currently focused */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className="bg-[#fbfbfd] hover:bg-white rounded-xl border border-slate-200/90 p-5 transition-all hover:border-blue-400 hover:shadow-xs cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {topic.category}
                    </span>
                    <span className="text-[11px] text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      Diagnose &rarr;
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>{topic.quickSteps.length} Guided Steps</span>
                  <span className="font-medium text-slate-700 capitalize">
                    {topic.recommendedChannel === 'call' && 'Helpline Recommended'}
                    {topic.recommendedChannel === 'chat' && 'Live Chat Ready'}
                    {topic.recommendedChannel === 'reservation' && 'Store Service'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
