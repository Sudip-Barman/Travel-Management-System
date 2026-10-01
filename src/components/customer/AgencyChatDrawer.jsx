import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgencyChatDrawer = () => {
  const { isChatOpen, setIsChatOpen, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const quickQuestions = [
    'Can we upgrade to a cedar plunge pool suite?',
    'What is the recommended attire for the private tea ceremony?',
    'Is the private Capri boat charter flexible with timings?'
  ];

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={() => setIsChatOpen(false)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[480px] h-[88dvh] sm:h-[84vh] flex flex-col overflow-hidden border border-black/[0.07] shadow-float relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="py-3 px-4 sm:px-6 flex items-center justify-between border-b border-black/[0.07] bg-canvas flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Claire de la Tour"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-status-emerald border-[1.5px] border-white" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-base sm:text-lg font-semibold text-ink leading-tight truncate">
                Claire de la Tour
              </div>
              <p className="text-[10px] sm:text-[11px] text-ink-muted truncate">
                Senior Destination Concierge • Online
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-9 h-9 sm:w-[44px] sm:h-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer flex-shrink-0"
            onClick={() => setIsChatOpen(false)}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-canvas/60">
          {chatMessages.map((msg) => {
            const isAgent = msg.sender === 'agent';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  isAgent ? 'items-start self-start' : 'items-end self-end'
                }`}
              >
                {isAgent && (
                  <span className="text-[10px] text-ink-muted mb-0.5">
                    {msg.agentName} • {msg.time}
                  </span>
                )}
                <div
                  className={`py-2.5 px-3.5 rounded text-xs leading-relaxed ${
                    isAgent
                      ? 'bg-white border border-black/[0.07] text-ink'
                      : 'bg-ink text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="p-2.5 bg-canvas border-t border-black/[0.07] flex flex-col gap-1.5 flex-shrink-0">
          <span className="text-[10px] text-ink-faint uppercase tracking-wider block">
            Suggested inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendChatMessage(q)}
                className="text-[11px] py-1 px-2.5 rounded-full bg-white hover:bg-sand border border-black/10 text-ink-muted hover:text-ink cursor-pointer transition-colors text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-black/[0.07] bg-white flex items-center gap-2 flex-shrink-0"
        >
          <input
            type="text"
            placeholder="Compose message to concierge..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs text-ink bg-sand rounded-full py-2.5 px-4 outline-none border border-transparent focus:border-ink/20"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-ink-soft cursor-pointer transition-colors flex-shrink-0"
            aria-label="Send"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
