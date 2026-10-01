import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/common/Toast';
import { ScrollRestoration } from './components/common/ScrollRestoration';

// Customer Components
import { CustomerHome } from './components/customer/CustomerHome';
import { DestinationsPage } from './components/customer/DestinationsPage';
import { ExperiencesPage } from './components/customer/ExperiencesPage';
import { PackageList } from './components/customer/PackageList';
import { HotelsPage } from './components/customer/HotelsPage';
import { AIPlanner } from './components/customer/AIPlanner';
import { MyTripsPage } from './components/customer/MyTripsPage';

// Customer Modals & Drawers
import { PackageDetailModal } from './components/customer/PackageDetailModal';
import { EnquiryModal } from './components/customer/EnquiryModal';
import { TripItineraryModal } from './components/customer/TripItineraryModal';
import { AgencyChatDrawer } from './components/customer/AgencyChatDrawer';
import { AuthModal } from './components/customer/AuthModal';

import './styles/globals.css';

const MainAppContent = () => {
  const { customerTab, toast, setToast } = useApp();

  return (
    <div className="min-h-screen flex flex-col pb-[calc(64px+env(safe-area-inset-bottom,0px))] lg:pb-0 overflow-x-hidden">
      <ScrollRestoration />
      <Header />
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Customer-Only Experience Shell */}
      <main className="flex-1 w-full overflow-x-hidden">
        {customerTab === 'home' && <CustomerHome />}
        {customerTab === 'destinations' && <DestinationsPage />}
        {customerTab === 'experiences' && <ExperiencesPage />}
        {customerTab === 'packages' && <PackageList />}
        {customerTab === 'hotels' && <HotelsPage />}
        {customerTab === 'ai-planner' && <AIPlanner />}
        {customerTab === 'quotes' && <MyTripsPage defaultTab="quotes" />}
        {customerTab === 'trips' && <MyTripsPage defaultTab="bookings" />}

        {/* Customer Modals & Drawers */}
        <PackageDetailModal />
        <EnquiryModal />
        <TripItineraryModal />
        <AgencyChatDrawer />
        <AuthModal />
      </main>

      {/* Modular Luxury Travel Footer */}
      <Footer />

      {/* Touch-Friendly Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
