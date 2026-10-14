/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HelplineBanner } from './components/HelplineBanner';
import { HeroSearch } from './components/HeroSearch';
import { GetSupportWizard } from './components/GetSupportWizard';
import { LiveAdvisorChat } from './components/LiveAdvisorChat';
import { CoverageChecker } from './components/CoverageChecker';
import { GeniusBarBooking } from './components/GeniusBarBooking';
import { RepairCostCalculator } from './components/RepairCostCalculator';
import { HelplineDirectory } from './components/HelplineDirectory';
import { CaseTracker } from './components/CaseTracker';
import { PreparationChecklist } from './components/PreparationChecklist';
import { CallbackModal } from './components/CallbackModal';
import { Footer } from './components/Footer';
import { SupportTopic, CountryHelpline } from './types';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<SupportTopic | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState<boolean>(false);
  const [callbackTopic, setCallbackTopic] = useState<SupportTopic | null>(null);
  const [callbackSerial, setCallbackSerial] = useState<string>('');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTopicFromSearch = (topic: SupportTopic) => {
    setActiveTopic(topic);
    if (topic.productId) {
      setSelectedProductId(topic.productId);
    }
    scrollTo('get-support');
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId || null);
    setActiveTopic(null);
    scrollTo('get-support');
  };

  const handleOpenChat = (topic?: SupportTopic | null) => {
    if (topic) {
      setActiveTopic(topic);
    }
    setIsChatOpen(true);
  };

  const handleOpenCallback = (topic?: SupportTopic | null, serial?: string) => {
    setCallbackTopic(topic || null);
    setCallbackSerial(serial || '');
    setIsCallbackOpen(true);
  };

  const handleBookFromRepairCalc = (model: string, serviceType: string) => {
    scrollTo('genius-bar');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Global Official Toll-Free Helpline Strip */}
      <HelplineBanner
        onOpenCallback={() => handleOpenCallback()}
      />

      {/* 2. Top Navigation Bar (Strict 3-zone contract) */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollTo}
        onRequestCall={() => handleOpenCallback()}
      />

      <main className="flex-1">
        {/* 3. Hero Diagnostic Search & Product Selector */}
        <HeroSearch
          onSelectTopic={handleSelectTopicFromSearch}
          onSelectProduct={handleSelectProduct}
          selectedProductId={selectedProductId}
          onOpenCoverageCheck={() => scrollTo('coverage-checker')}
          onOpenGeniusBar={() => scrollTo('genius-bar')}
        />

        {/* 4. Guided Troubleshooting & Support Channel Selector */}
        <GetSupportWizard
          selectedProductId={selectedProductId}
          onOpenChat={handleOpenChat}
          onOpenBooking={() => scrollTo('genius-bar')}
          onRequestCall={handleOpenCallback}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
        />

        {/* 5. Check Service & Support Coverage (AppleCare+) */}
        <CoverageChecker
          onRequestCallWithSerial={(serial) => handleOpenCallback(null, serial)}
          onBookGeniusWithSerial={(serial) => scrollTo('genius-bar')}
        />

        {/* 6. Genius Bar In-Store Reservation */}
        <GeniusBarBooking
          initialTopic={activeTopic}
        />

        {/* 7. Official Repair Pricing Matrix */}
        <RepairCostCalculator
          onBookAppointment={handleBookFromRepairCalc}
          onCallForEstimate={() => handleOpenCallback()}
        />

        {/* 8. Active Case & Repair Tracker */}
        <CaseTracker />

        {/* 9. Preparation Checklist Before Calling */}
        <PreparationChecklist />

        {/* 10. Comprehensive Global Helpline Directory */}
        <HelplineDirectory
          onDirectCall={(phone, dept) => handleOpenCallback()}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Trigger for Live Advisor Chat */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer border border-slate-700/50"
          aria-label="Open Apple Advisor Live Chat"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold tracking-tight">Chat with Apple Advisor</span>
        </button>
      )}

      {/* Live Apple Advisor Chat Drawer */}
      <LiveAdvisorChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialTopic={activeTopic}
      />

      {/* Priority Callback Request Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        initialTopic={callbackTopic}
        initialSerial={callbackSerial}
      />
    </div>
  );
}
