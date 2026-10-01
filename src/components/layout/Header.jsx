import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Menu,
  X,
  User,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const {
    customerTab,
    setCustomerTab,
    setIsChatOpen,
    setIsAuthModalOpen,
    setIsEnquiryModalOpen,
    user
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab) => {
    setCustomerTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] h-16 lg:h-20 flex items-center bg-[#fbf9f5]/95 backdrop-blur-md border-b border-black/[0.07] transition-all duration-150">
        <div className="w-full max-w-[1360px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo / Editorial Brand Mark */}
            <div
              className="flex items-baseline gap-1.5 xs:gap-2 cursor-pointer select-none min-w-0"
              onClick={() => handleNavClick('home')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
            >
              <span className="font-display text-[1.3rem] xs:text-[1.5rem] lg:text-[1.6rem] font-medium tracking-[0.03em] text-ink uppercase truncate">
                AuraVoyage
              </span>
              <span className="font-sans text-[9px] xs:text-[10px] tracking-[0.16em] uppercase text-champagne-dark font-semibold hidden xs:inline">
                Bespoke
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-8" aria-label="Customer Navigation">
              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'destinations'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('destinations')}
              >
                Destinations
              </button>

              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'experiences'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('experiences')}
              >
                Experiences
              </button>

              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'packages'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('packages')}
              >
                Packages
              </button>

              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'hotels'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('hotels')}
              >
                Hotels
              </button>

              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'ai-planner'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('ai-planner')}
              >
                <span className="hidden xl:inline">AI Trip Planner</span>
                <span className="xl:hidden">AI Planner</span>
              </button>

              <button
                type="button"
                className={`text-[11px] xl:text-xs font-medium tracking-[0.06em] xl:tracking-[0.08em] uppercase py-1.5 relative transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  customerTab === 'trips' || customerTab === 'quotes'
                    ? 'text-ink after:content-[\'\'] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => handleNavClick('trips')}
              >
                My Trips
              </button>
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Profile / Account Action */}
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 xs:gap-2 py-1 pr-2.5 xs:pr-3.5 pl-1 bg-sand hover:bg-sand-dark border border-black/[0.07] hover:border-black/15 rounded-full text-ink text-xs font-medium cursor-pointer transition-all duration-150"
                title={user ? `Signed in as ${user.name}` : 'Sign In to Private Circle'}
                aria-label="Account Profile"
              >
                <div className="w-[24px] h-[24px] xs:w-[26px] xs:h-[26px] rounded-full bg-ink text-white flex items-center justify-center text-[10px] xs:text-[11px] font-semibold">
                  {user ? user.name.charAt(0) : <User size={13} />}
                </div>
                <span className="hidden sm:inline">
                  {user ? user.name.split(' ')[0] : 'Member'}
                </span>
              </button>

              {/* Primary Plan My Trip CTA (Desktop XL only to avoid tablet collisions) */}
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="hidden xl:inline-flex items-center justify-center gap-2 font-sans text-xs tracking-wide font-medium py-2 px-4 rounded-full min-h-[38px] bg-ink hover:bg-ink-soft text-white transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                Plan My Trip
              </button>

              {/* Mobile Hamburger / Menu Toggle Button */}
              <button
                type="button"
                className="lg:hidden flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 rounded-full text-ink bg-transparent hover:bg-sand border border-black/[0.08] cursor-pointer transition-colors duration-150"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Down Mobile Drawer / Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#0d0e11]/60 backdrop-blur-sm z-[999] transition-all duration-280 flex flex-col justify-start ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`bg-white w-full max-h-[85vh] overflow-y-auto border-b border-black/[0.07] shadow-deep p-4 pb-9 flex flex-col transition-transform duration-280 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.07] mb-4">
            <div>
              <span className="font-display text-[1.4rem] font-medium tracking-[0.04em] text-ink uppercase">
                AuraVoyage
              </span>
              <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-champagne-dark font-semibold block">
                Private Travel Portfolio
              </span>
            </div>
            <button
              type="button"
              className="w-[44px] h-[44px] flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Member Card in Mobile Menu */}
          <div
            className="flex items-center gap-3 p-3 bg-sand hover:bg-sand-dark rounded border border-black/[0.07] mb-4 cursor-pointer transition-colors duration-150"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
              {user ? user.name.charAt(0) : <User size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink truncate">
                {user ? user.name : 'Private Member Portal'}
              </div>
              <div className="text-[11px] text-champagne-dark tracking-wide truncate">
                {user ? user.tier : 'Tap to Sign In / Join'}
              </div>
            </div>
            <ArrowRight size={14} className="text-ink-muted flex-shrink-0" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mb-6">
            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'home'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('home')}
            >
              <span>Home</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'destinations'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('destinations')}
            >
              <span>Destinations</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'experiences'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('experiences')}
            >
              <span>Experiences</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'packages'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('packages')}
            >
              <span>Packages</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'hotels'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('hotels')}
            >
              <span>Hotels & Stays</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'ai-planner'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('ai-planner')}
            >
              <span className="flex items-center gap-1.5">
                AI Trip Planner <Sparkles size={14} className="text-champagne-dark" />
              </span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className={`flex items-center justify-between p-3.5 rounded font-sans text-base transition-colors min-h-[44px] cursor-pointer text-left ${
                customerTab === 'trips' || customerTab === 'quotes'
                  ? 'bg-sand text-ink font-semibold border-l-[3px] border-ink'
                  : 'text-ink hover:bg-sand'
              }`}
              onClick={() => handleNavClick('trips')}
            >
              <span>My Trips / Account</span>
              <ArrowRight size={16} />
            </button>
          </nav>

          {/* Mobile CTAs & On-call advisor */}
          <div className="mt-auto pt-4 border-t border-black/[0.07]">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center font-sans text-xs tracking-wide font-medium py-3 px-6 rounded-full min-h-[44px] bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEnquiryModalOpen(true);
              }}
            >
              Request Custom Itinerary
            </button>

            <div className="flex gap-2 mt-2.5">
              <button
                type="button"
                className="w-1/2 inline-flex items-center justify-center gap-1.5 font-sans text-[11.5px] font-medium py-2 px-3 rounded-full min-h-[38px] bg-transparent hover:bg-sand border border-black/15 text-ink transition-colors cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatOpen(true);
                }}
              >
                <MessageSquare size={14} /> Contact Concierge
              </button>
              <button
                type="button"
                className="w-1/2 inline-flex items-center justify-center gap-1.5 font-sans text-[11.5px] font-medium py-2 px-3 rounded-full min-h-[38px] bg-sand hover:bg-white border border-black/15 text-ink transition-colors cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                <User size={14} /> Profile / Login
              </button>
            </div>

            <div className="text-[10.5px] text-ink-faint text-center mt-3 tracking-wide">
              AuraVoyage • High Jewelry of Travel • Dedicated 24/7 Advisor
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
