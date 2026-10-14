import React from 'react';
import { Cloud, KeyRound, Smartphone, CheckSquare, ShieldCheck, HelpCircle } from 'lucide-react';

export const PreparationChecklist: React.FC = () => {
  const steps = [
    {
      icon: <Cloud className="w-5 h-5 text-blue-600" />,
      title: '1. Back Up Your Apple Device',
      description: 'Back up via iCloud or to your Mac using Finder before hardware service to ensure no photos or messages are lost.'
    },
    {
      icon: <KeyRound className="w-5 h-5 text-blue-600" />,
      title: '2. Have Your Apple Account Ready',
      description: 'Ensure you know your Apple Account email and password. Have a secondary trusted device or phone nearby for 2FA.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      title: '3. Locate Your Serial Number',
      description: 'Find it in Settings > General > About, or engraved on the rear casing, SIM card tray, or original product box.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: '4. Temporarily Disable Find My',
      description: 'Apple Store technicians require Find My / Activation Lock to be turned off before initiating screen or battery repairs.'
    }
  ];

  return (
    <section className="py-14 bg-[#f5f5f7] border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            <CheckSquare className="w-4 h-4" />
            <span>Preparation Guide</span>
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Before You Call or Visit the Helpline
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Taking these 4 quick steps prior to connecting with an advisor will speed up resolution and protect your personal data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  {st.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
