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

// Agency Components
import { AgencySidebar } from './components/layout/AgencySidebar';
import { AgencyDashboard } from './components/agency/AgencyDashboard';
import { EnquiriesView } from './components/agency/EnquiriesView';
import { BookingsView } from './components/agency/BookingsView';
import { QuotationsView } from './components/agency/QuotationsView';
import { CustomersView } from './components/agency/CustomersView';
import { ReportsView } from './components/agency/ReportsView';

import './styles/globals.css';

const MainAppContent = () => {
  const {
    role,
    setRole,
    customerTab,
    agencyTab,
    setAgencyTab,
    toast,
    setToast,
    enquiries
  } = useApp();

  const newEnquiriesCount = (enquiries || []).filter((e) => e.status === 'New').length;

  if (role === 'agency') {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8f5] text-ink">
        <ScrollRestoration />
        <Toast toast={toast} onClose={() => setToast(null)} />

        {/* Agency Top Navigation Bar */}
        <header className="sticky top-0 z-[100] h-16 bg-white/95 backdrop-blur-md border-b border-black/[0.08] flex items-center px-4 sm:px-6 lg:px-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5 cursor-pointer" onClick={() => setAgencyTab('dashboard')}>
              <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink uppercase">
                AuraVoyage
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-champagne-dark font-bold">
                Desk
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-sand text-ink-muted font-medium border border-black/[0.05]">
              Operations Workspace
            </span>
          </div>

          {/* Quick Agency Tab Pills for Mobile / Tablet */}
          <div className="flex lg:hidden items-center gap-1 overflow-x-auto py-1 max-w-[50vw]">
            {[
              { id: 'dashboard', label: 'Desk' },
              { id: 'enquiries', label: `Enquiries${newEnquiriesCount > 0 ? ` (${newEnquiriesCount})` : ''}` },
              { id: 'bookings', label: 'Bookings' },
              { id: 'quotations', label: 'Quotes' },
              { id: 'customers', label: 'Clients' },
              { id: 'reports', label: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAgencyTab(tab.id)}
                className={`text-[11px] font-medium py-1 px-2.5 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  agencyTab === tab.id
                    ? 'bg-ink text-white font-semibold'
                    : 'bg-sand/60 text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Switch back to Customer Portal */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-sand hover:bg-sand-dark text-ink text-xs font-semibold border border-black/[0.08] transition-colors cursor-pointer"
              title="Switch to customer experience"
            >
              <span>Client Portal</span>
              <span className="text-[10px] text-champagne-dark">→</span>
            </button>
          </div>
        </header>

        {/* Agency Layout */}
        <div className="agency-layout flex-1 flex flex-col lg:flex-row">
          <AgencySidebar />
          <main className="agency-main flex-1 p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto w-full">
            {agencyTab === 'dashboard' && <AgencyDashboard />}
            {agencyTab === 'enquiries' && <EnquiriesView />}
            {agencyTab === 'bookings' && <BookingsView />}
            {agencyTab === 'quotations' && <QuotationsView />}
            {agencyTab === 'customers' && <CustomersView />}
            {agencyTab === 'reports' && <ReportsView />}
            {agencyTab === 'packages' && <PackageList isAgencyView={true} />}

            {/* Modals */}
            <PackageDetailModal />
            <TripItineraryModal />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-[calc(64px+env(safe-area-inset-bottom,0px))] lg:pb-0 overflow-x-hidden">
      <ScrollRestoration />
      <Header />
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Customer Experience Shell */}
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
