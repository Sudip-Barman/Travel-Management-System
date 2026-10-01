import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const InstagramIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = () => {
  const {
    setCustomerTab,
    setIsEnquiryModalOpen,
    setIsChatOpen,
    showToast
  } = useApp();

  const handleLegalClick = (title) => {
    showToast(`${title} — AuraVoyage client confidentiality guarantee active.`, 'info');
  };

  return (
    <footer className="bg-[#0b0c0e] text-[#8e929a] py-12 md:py-16 border-t border-white/[0.08] mt-auto w-full relative select-none">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        
        {/* Brand Mark */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-display text-2xl md:text-3xl font-medium tracking-[0.06em] text-white uppercase">
            AuraVoyage
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-champagne inline-block mb-1" />
        </div>

        {/* One short sentence */}
        <p className="text-xs md:text-sm text-white/60 font-light max-w-[440px] mb-8 leading-relaxed">
          Curated sanctuaries and private voyages crafted for those who seek the extraordinary.
        </p>

        {/* Compact Horizontal Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs tracking-wider uppercase text-white/70 mb-8" aria-label="Footer Navigation">
          <button
            type="button"
            onClick={() => setCustomerTab('destinations')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Destinations
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setCustomerTab('experiences')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Experiences
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setCustomerTab('packages')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Packages
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setCustomerTab('hotels')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Hotels
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setCustomerTab('ai-planner')}
            className="hover:text-white transition-colors cursor-pointer py-1 text-champagne"
          >
            AI Planner
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setCustomerTab('trips')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            My Trips
          </button>
          <span className="text-white/20 select-none hidden sm:inline">·</span>

          <button
            type="button"
            onClick={() => setIsEnquiryModalOpen(true)}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Contact
          </button>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => showToast('AuraVoyage Instagram Journal', 'info')}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-champagne/40 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Instagram"
          >
            <InstagramIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => showToast('AuraVoyage LinkedIn', 'info')}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-champagne/40 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-champagne/40 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Concierge Chat"
          >
            <MessageSquare size={13} />
          </button>
        </div>

        {/* Very Small Legal Row */}
        <div className="pt-6 border-t border-white/[0.06] w-full max-w-[680px] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <div>
            © 2026 AuraVoyage. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleLegalClick('Privacy')}
              className="hover:text-white/70 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleLegalClick('Terms')}
              className="hover:text-white/70 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleLegalClick('Confidentiality')}
              className="hover:text-white/70 transition-colors cursor-pointer"
            >
              Confidentiality
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
