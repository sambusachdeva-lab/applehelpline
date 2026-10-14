import React, { useState } from 'react';
import { Phone, Globe, Clock, Copy, Check, Headphones, Shield, Search, ExternalLink } from 'lucide-react';
import { OFFICIAL_HELPLINE_NUMBERS, SPECIALIZED_DEPARTMENTS } from '../data/helplineData';
import { CountryHelpline } from '../types';

interface HelplineDirectoryProps {
  onDirectCall: (phone: string, department: string) => void;
}

export const HelplineDirectory: React.FC<HelplineDirectoryProps> = ({ onDirectCall }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num.replace(/[^0-9+]/g, ''));
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filteredCountries = OFFICIAL_HELPLINE_NUMBERS.filter((c) =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tollFree.includes(searchQuery) ||
    c.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="helpline-directory" className="py-14 bg-white border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            <Globe className="w-4 h-4" />
            <span>Worldwide Phone Support</span>
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Official Apple Helpline Directory
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Freephone and toll-free telephone support direct to certified Apple specialists.
          </p>
        </div>

        {/* Specialized Department Hotlines */}
        <div className="mb-12">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Specialized Department Lines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIALIZED_DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                className="bg-[#fbfbfd] rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-600">{dept.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{dept.hours}</span>
                  </div>
                  <div className="text-base font-bold font-mono text-slate-900 mb-1 tabular-nums">
                    {dept.tollFree}
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 mb-2">
                    {dept.extension}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {dept.focus}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${dept.tollFree.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>
                  <button
                    onClick={() => handleCopy(dept.tollFree)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedNumber === dept.tollFree ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Country Directory */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Country &amp; Regional Toll-Free Numbers
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or language..."
                className="w-full text-xs py-1.5 pl-8 pr-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCountries.map((item) => (
              <div
                key={item.code}
                className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:border-slate-300 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-xs text-slate-900">{item.country}</span>
                    <span className="text-[10px] text-slate-400">({item.languages.join(', ')})</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                    {item.tollFree}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{item.localHours}</div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`tel:${item.tollFree.replace(/[^0-9+]/g, '')}`}
                    className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors cursor-pointer"
                    title={`Call ${item.country}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(item.tollFree)}
                    className="p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy"
                  >
                    {copiedNumber === item.tollFree ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
