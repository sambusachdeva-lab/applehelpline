import React, { useState } from 'react';
import { PhoneCall, Clock, Check, Copy, Globe, ShieldCheck } from 'lucide-react';
import { OFFICIAL_HELPLINE_NUMBERS } from '../data/helplineData';
import { CountryHelpline } from '../types';

interface HelplineBannerProps {
  onOpenCallback: () => void;
  onSelectCountry?: (country: CountryHelpline) => void;
}

export const HelplineBanner: React.FC<HelplineBannerProps> = ({ onOpenCallback, onSelectCountry }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US');
  const [copied, setCopied] = useState<boolean>(false);

  const currentCountry = OFFICIAL_HELPLINE_NUMBERS.find((c) => c.code === selectedCountryCode) || OFFICIAL_HELPLINE_NUMBERS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCountry.tollFree.replace(/[^0-9+]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedCountryCode(code);
    const country = OFFICIAL_HELPLINE_NUMBERS.find((c) => c.code === code);
    if (country && onSelectCountry) {
      onSelectCountry(country);
    }
  };

  return (
    <section className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Direct Line info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400">
                <PhoneCall className="w-3.5 h-3.5" />
              </span>
              <span className="text-slate-300">Apple Official Toll-Free Helpline:</span>
              <a
                href={`tel:${currentCountry.tollFree.replace(/[^0-9+]/g, '')}`}
                className="text-base sm:text-lg font-bold font-mono tracking-tight text-white hover:text-blue-400 transition-colors tabular-nums"
              >
                {currentCountry.tollFree}
              </a>
              <button
                onClick={handleCopy}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400 border-l border-slate-800 pl-4">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentCountry.localHours}</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified Advisors</span>
            </div>
          </div>

          {/* Right: Country switch & Callback request button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedCountryCode}
                onChange={handleCountryChange}
                className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer pr-1"
                aria-label="Select Country Helpline"
              >
                {OFFICIAL_HELPLINE_NUMBERS.map((country) => (
                  <option key={country.code} value={country.code} className="bg-slate-900 text-white">
                    {country.country} ({country.tollFree})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onOpenCallback}
              className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Request a Callback
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
