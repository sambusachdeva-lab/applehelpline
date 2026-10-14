import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5f7] text-slate-500 text-xs border-t border-black/[0.08] pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-slate-200 pb-6 mb-6 text-[11px] leading-relaxed text-slate-400">
          <p className="mb-2">
            * 1-800-APL-CARE (1-800-275-2273) is a toll-free helpline accessible from landlines and mobile providers across the United States and Canada. Standard international calling charges may apply when dialing from outside the designated coverage country.
          </p>
          <p>
            AppleCare+ coverage provides repair or replacement coverage, both parts and labor, from Apple-authorized technicians. Pricing shown is subject to applicable state and local sales taxes. Service fees are subject to verification of active hardware coverage and physical damage assessment at an Apple Store or authorized service depot.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-xs">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Helpline Services</h4>
            <ul className="space-y-1.5">
              <li><a href="#helpline-directory" className="hover:text-slate-900 transition-colors">Toll-Free Numbers</a></li>
              <li><a href="#get-support" className="hover:text-slate-900 transition-colors">Diagnostics &amp; Troubleshoot</a></li>
              <li><a href="#coverage-checker" className="hover:text-slate-900 transition-colors">AppleCare+ Check</a></li>
              <li><a href="#genius-bar" className="hover:text-slate-900 transition-colors">Genius Bar Reservation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Hardware Service</h4>
            <ul className="space-y-1.5">
              <li><a href="#repair-costs" className="hover:text-slate-900 transition-colors">iPhone Screen Replacement</a></li>
              <li><a href="#repair-costs" className="hover:text-slate-900 transition-colors">Battery Service Program</a></li>
              <li><a href="#repair-costs" className="hover:text-slate-900 transition-colors">Mac Display Calibration</a></li>
              <li><a href="#repair-costs" className="hover:text-slate-900 transition-colors">Express Replacement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Specialized Desks</h4>
            <ul className="space-y-1.5">
              <li><a href="#helpline-directory" className="hover:text-slate-900 transition-colors">Apple Account Recovery</a></li>
              <li><a href="#helpline-directory" className="hover:text-slate-900 transition-colors">Billing &amp; Subscriptions</a></li>
              <li><a href="#helpline-directory" className="hover:text-slate-900 transition-colors">Accessibility (TTY)</a></li>
              <li><a href="#helpline-directory" className="hover:text-slate-900 transition-colors">Enterprise &amp; Education</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2.5">Apple Account</h4>
            <ul className="space-y-1.5">
              <li><a href="#get-support" className="hover:text-slate-900 transition-colors">Manage Your Apple ID</a></li>
              <li><a href="#get-support" className="hover:text-slate-900 transition-colors">iCloud Storage</a></li>
              <li><a href="#get-support" className="hover:text-slate-900 transition-colors">Find My Protection</a></li>
              <li><a href="#get-support" className="hover:text-slate-900 transition-colors">Family Sharing</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Use</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Sales Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Legal</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
