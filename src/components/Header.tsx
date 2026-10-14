import React from 'react';
import { Phone, Search } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onRequestCall: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onRequestCall, activeSection }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-slate-900 hover:text-black transition-colors shrink-0 text-left cursor-pointer"
          aria-label="Apple Support Home"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170" aria-hidden="true">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.79-11.89-14.24-5.26-8.08-9.5-17.15-12.74-27.22-3.23-10.07-4.85-19.98-4.85-29.74 0-14.34 3.73-25.96 11.18-34.86 7.45-8.9 16.63-13.43 27.53-13.59 4.35 0 9.28 1.13 14.78 3.39 5.51 2.26 9.17 3.44 10.98 3.52 1.58 0 5.42-1.29 11.53-3.88 6.1-2.58 11.39-3.71 15.86-3.39 12.35.76 22.34 5.34 29.98 13.73-10.89 6.64-16.22 15.65-16.01 27.04.22 9.13 3.78 16.89 10.68 23.27 6.9 6.38 15.11 10.05 24.63 11.01-2.29 6.96-4.99 13.73-8.1 20.31zM119.22 31.85c0-7.39 2.66-14.39 7.97-21 5.31-6.62 11.99-10.57 20.03-11.85.22 1.3.32 2.45.32 3.44 0 7.39-2.77 14.5-8.31 21.32-5.54 6.83-12.33 10.74-20.37 11.75-.11-1.19-.17-2.42-.17-3.66z"/>
          </svg>
          <span className="font-semibold text-[15px] tracking-tight whitespace-nowrap">Support Helpline</span>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
          <button
            onClick={() => onNavigate('helpline-directory')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activeSection === 'helpline-directory' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Helpline Numbers
          </button>
          <button
            onClick={() => onNavigate('get-support')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activeSection === 'get-support' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Guided Troubleshooting
          </button>
          <button
            onClick={() => onNavigate('coverage-checker')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activeSection === 'coverage-checker' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Check Coverage
          </button>
          <button
            onClick={() => onNavigate('genius-bar')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activeSection === 'genius-bar' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Genius Bar Booking
          </button>
          <button
            onClick={() => onNavigate('repair-costs')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activeSection === 'repair-costs' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Repair Pricing
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRequestCall}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#0071e3] rounded-full hover:bg-[#0077ed] active:bg-[#0062c4] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 1-800-APL-CARE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
