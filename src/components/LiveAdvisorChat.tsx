import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldCheck, Download, Minimize2, Maximize2, Bot, User, CheckCircle, RefreshCw } from 'lucide-react';
import { ChatMessage, SupportTopic } from '../types';

interface LiveAdvisorChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: SupportTopic | null;
}

export const LiveAdvisorChat: React.FC<LiveAdvisorChatProps> = ({
  isOpen,
  onClose,
  initialTopic
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const caseId = useRef(`CAS-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(1000 + Math.random() * 9000)}`);

  const initialGreeting = initialTopic
    ? `Hello! Thank you for contacting Apple Support. My name is Sarah, your dedicated Apple Advisor today. I see you're inquiring about "${initialTopic.title}". Let's get this resolved for you. Are you near your device right now?`
    : `Hello! Welcome to Apple Official Support. My name is Sarah, your Apple Care Advisor. How can I assist you with your Apple device or account today?`;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'system',
          text: `Chat session initiated with Apple Support. Case Reference: ${caseId.current}. Advisor Sarah M. has joined.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: '2',
          sender: 'advisor',
          advisorName: 'Sarah M.',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: 'Yes, I have device here', actionId: 'device_ready' },
            { label: 'Check repair pricing', actionId: 'pricing' },
            { label: 'Reset Apple ID password', actionId: 'password_reset' },
            { label: 'Send diagnostic telemetry', actionId: 'run_diag' }
          ]
        }
      ]);
    }
  }, [isOpen, initialTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const triggerAdvisorReply = (userText: string, actionId?: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let actions: { label: string; actionId: string }[] | undefined;

      const lower = (actionId || userText).toLowerCase();

      if (lower.includes('device_ready') || lower.includes('yes') || lower.includes('ready')) {
        reply = `Wonderful! First, let's verify if you can access Settings > General > About to verify your serial number and iOS version. If your device is unresponsive, we can perform a quick hard reboot by pressing and quickly releasing Volume Up, then Volume Down, and holding the Side Power Button until the Apple logo appears.`;
        actions = [
          { label: 'Hard reboot completed', actionId: 'reboot_done' },
          { label: 'Need battery replacement', actionId: 'pricing' },
          { label: 'Talk on phone instead', actionId: 'switch_to_phone' }
        ];
      } else if (lower.includes('pricing') || lower.includes('price') || lower.includes('cost') || lower.includes('repair')) {
        reply = `Under AppleCare+, front screen replacements are only $29 across all iPhone models, and battery replacements are completely covered ($0) if your battery health is under 80%. For out-of-warranty service, iPhone screen repairs range from $279 to $379 depending on the model. All repairs use 100% genuine Apple components with warranty.`;
        actions = [
          { label: 'Book a Genius Bar slot', actionId: 'book_store' },
          { label: 'Check my device serial number', actionId: 'check_serial' }
        ];
      } else if (lower.includes('password') || lower.includes('apple id') || lower.includes('locked')) {
        reply = `For your security, Apple passwords cannot be viewed by advisors. However, you can instantly reset your password at iforgot.apple.com, or through Settings > [Your Name] > Sign-In & Security on any trusted iPad or Mac signed in to your account. Would you like me to send a verification prompt to your trusted phone number?`;
        actions = [
          { label: 'Send verification prompt', actionId: 'send_prompt' },
          { label: 'I do not have trusted phone', actionId: 'account_recovery' }
        ];
      } else if (lower.includes('diag') || lower.includes('run_diag') || lower.includes('test')) {
        reply = `I have dispatched an Apple System Diagnostic ping to your device queue. When you open Settings > Privacy & Security > Analytics & Improvements > Start Diagnostics with Apple Support, enter diagnostic session code: 948-201. This will evaluate battery wear, display touch matrix, and sensor health.`;
        actions = [
          { label: 'Code entered, test running', actionId: 'diag_passed' },
          { label: 'Request Phone Advisor call', actionId: 'switch_to_phone' }
        ];
      } else if (lower.includes('switch_to_phone') || lower.includes('call')) {
        reply = `I can transfer this active case directly to our telephone helpline queue! Our toll-free line is 1-800-275-2273. Mention your Case ID: ${caseId.current} and you'll skip general automated prompts straight to our senior hardware tier.`;
      } else if (lower.includes('reboot_done') || lower.includes('diag_passed')) {
        reply = `Great news! The diagnostic telemetry returned normal operating parameters with no logic board faults detected. If you are still noticing battery drain or sluggishness, I suggest backing up to iCloud and updating to the latest software release. I will keep Case ${caseId.current} open for 48 hours in case you need further help.`;
      } else {
        reply = `Thank you for sharing those details. I've logged this directly into Apple Support Case ${caseId.current}. Based on your symptom, you can either continue troubleshooting here, or we can arrange a mail-in repair box with express courier pickup. Would you like me to initiate the mail-in service?`;
        actions = [
          { label: 'Check mail-in repair options', actionId: 'pricing' },
          { label: 'Call 1-800-275-2273', actionId: 'switch_to_phone' }
        ];
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          sender: 'advisor',
          advisorName: 'Sarah M.',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions
        }
      ]);
    }, 1200);
  };

  const handleSendMessage = (textToSend?: string, actionId?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    triggerAdvisorReply(text, actionId);
  };

  const handleDownloadTranscript = () => {
    const transcriptText = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'advisor' ? `Apple Advisor (${m.advisorName}):` : m.sender === 'user' ? 'Customer:' : 'System:'} ${m.text}`
      )
      .join('\n\n');

    const blob = new Blob([`Apple Support Chat Transcript\nCase ID: ${caseId.current}\nDate: ${new Date().toLocaleDateString()}\n\n${transcriptText}`], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apple_Support_Transcript_${caseId.current}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col transition-all overflow-hidden ${
        isMinimized ? 'w-80 h-14' : 'w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh]'
      }`}
    >
      {/* Chat Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold flex items-center gap-1.5">
              <span>Sarah M. · Apple Advisor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[10px] text-slate-300 font-mono tabular-nums">
              Case {caseId.current}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!isMinimized && (
            <button
              onClick={handleDownloadTranscript}
              title="Download Transcript"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
              aria-label="Download chat transcript"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            aria-label={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Body (When not minimized) */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.sender === 'system' ? (
                  <div className="text-center text-[11px] text-slate-500 bg-slate-100/80 rounded-md py-1.5 px-3 max-w-xs mx-auto">
                    {msg.text}
                  </div>
                ) : msg.sender === 'advisor' ? (
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      
                    </div>
                    <div>
                      <div className="bg-white border border-slate-200 text-slate-800 text-xs p-3 rounded-2xl rounded-tl-xs shadow-2xs leading-relaxed">
                        {msg.text}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 pl-1 tabular-nums">
                        {msg.timestamp}
                      </div>

                      {/* Quick Interactive Prompt Chips */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.actions.map((act) => (
                            <button
                              key={act.actionId}
                              onClick={() => handleSendMessage(act.label, act.actionId)}
                              className="text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-end gap-2 max-w-[85%] ml-auto">
                    <div>
                      <div className="bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-xs shadow-2xs leading-relaxed">
                        {msg.text}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 pr-1 text-right tabular-nums">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 max-w-[80%]">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] shrink-0">
                  
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl text-xs text-slate-500 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Sarah is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Reply to Apple Advisor..."
                className="flex-1 text-xs py-2 px-3 bg-slate-100 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 border border-transparent focus:border-blue-600 transition-all"
                aria-label="Message Apple Advisor"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-1.5">
              Secure 256-bit encrypted AppleCare Support session
            </div>
          </div>
        </>
      )}
    </div>
  );
};
