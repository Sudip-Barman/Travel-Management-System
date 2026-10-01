import React from 'react';
import {
  Compass,
  Luggage,
  CalendarCheck,
  Home,
  User,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav = () => {
  const {
    customerTab,
    setCustomerTab,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useApp();

  const handleNav = (tab) => {
    setCustomerTab(tab);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-14 sm:h-16 bg-[#faf8f5]/95 backdrop-blur-md border-t border-black/[0.08] flex items-center justify-around px-0.5 xs:px-1 pb-[env(safe-area-inset-bottom,0px)] select-none"
      aria-label="Customer Mobile Navigation"
    >
      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          customerTab === 'home' ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => handleNav('home')}
      >
        <Home size={17} className={customerTab === 'home' ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Home</span>
      </button>

      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          customerTab === 'destinations' ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => handleNav('destinations')}
      >
        <Compass size={17} className={customerTab === 'destinations' ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Explore</span>
      </button>

      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          customerTab === 'experiences' ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => handleNav('experiences')}
      >
        <Activity size={17} className={customerTab === 'experiences' ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Activity</span>
      </button>

      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          customerTab === 'packages' ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => handleNav('packages')}
      >
        <Luggage size={17} className={customerTab === 'packages' ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Trips</span>
      </button>

      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          customerTab === 'trips' || customerTab === 'quotes' ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => handleNav('trips')}
      >
        <CalendarCheck size={17} className={customerTab === 'trips' || customerTab === 'quotes' ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Dossier</span>
      </button>

      <button
        type="button"
        className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full min-w-0 px-0.5 text-[9px] xs:text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          isAuthModalOpen ? 'text-ink font-semibold' : 'text-ink-faint font-medium hover:text-ink'
        }`}
        onClick={() => setIsAuthModalOpen(true)}
      >
        <User size={17} className={isAuthModalOpen ? '-translate-y-0.5 transition-transform text-ink' : ''} />
        <span className="truncate max-w-full">Profile</span>
      </button>
    </nav>
  );
};
