import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  DESTINATIONS,
  PACKAGES,
  HOTELS,
  TRAVEL_EXPERIENCES,
  TRAVEL_INSPIRATION,
  MOCK_ENQUIRIES,
  MOCK_QUOTATIONS,
  MOCK_BOOKINGS,
  MOCK_CUSTOMERS,
  MOCK_AGENCY_STATS,
  MOCK_CHAT_MESSAGES
} from '../data/mockData';

const AppContext = createContext(null);

// In-memory persistent map of history entry keys to their exact scroll positions
const scrollPositions = new Map();

const parseRouteFromUrl = () => {
  if (typeof window === 'undefined') return { tab: 'home', hash: '', role: 'customer', agencyTab: 'dashboard' };
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash || '';

  // Agency desk routes
  if (path === '/agency' || path.startsWith('/agency/')) {
    const sub = path.replace('/agency', '').replace(/^\/+/, '') || 'dashboard';
    return { tab: 'home', hash, role: 'agency', agencyTab: sub };
  }
  if (path === '/reports') return { tab: 'home', hash, role: 'agency', agencyTab: 'reports' };
  if (path === '/enquiries') return { tab: 'home', hash, role: 'agency', agencyTab: 'enquiries' };
  if (path === '/bookings') return { tab: 'home', hash, role: 'agency', agencyTab: 'bookings' };
  if (path === '/quotations') return { tab: 'home', hash, role: 'agency', agencyTab: 'quotations' };
  if (path === '/customers') return { tab: 'home', hash, role: 'agency', agencyTab: 'customers' };

  if (hash.toLowerCase().startsWith('#agency')) {
    const sub = hash.toLowerCase().replace('#agency-', '').replace('#agency', '') || 'dashboard';
    return { tab: 'home', hash, role: 'agency', agencyTab: sub };
  }

  if (path === '/destinations') return { tab: 'destinations', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/experiences') return { tab: 'experiences', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/packages') return { tab: 'packages', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/hotels') return { tab: 'hotels', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/ai-planner') return { tab: 'ai-planner', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/quotes') return { tab: 'quotes', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/trips' || path === '/account') return { tab: 'trips', hash, role: 'customer', agencyTab: 'dashboard' };
  if (path === '/explore') return { tab: 'home', hash: hash || '#explore', role: 'customer', agencyTab: 'dashboard' };

  if (hash.toLowerCase() === '#destinations') return { tab: 'destinations', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#experiences') return { tab: 'experiences', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#packages') return { tab: 'packages', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#hotels') return { tab: 'hotels', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#ai-planner') return { tab: 'ai-planner', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#quotes') return { tab: 'quotes', hash, role: 'customer', agencyTab: 'dashboard' };
  if (hash.toLowerCase() === '#trips' || hash.toLowerCase() === '#account') return { tab: 'trips', hash, role: 'customer', agencyTab: 'dashboard' };

  return { tab: 'home', hash, role: 'customer', agencyTab: 'dashboard' };
};

const generateHistoryKey = () => Math.random().toString(36).substring(2, 9);

export const AppProvider = ({ children }) => {
  const initialRoute = parseRouteFromUrl();
  // Role & Navigation
  const [role, setRole] = useState(initialRoute.role || 'customer'); // 'customer' | 'agency'
  const [customerTab, setCustomerTabState] = useState(initialRoute.tab);
  const customerTabRef = useRef(customerTab);
  useEffect(() => {
    customerTabRef.current = customerTab;
  }, [customerTab]);
  const [navKey, setNavKey] = useState(0);
  const [agencyTab, setAgencyTab] = useState(initialRoute.agencyTab || 'dashboard');

  // Navigation action tracker: PUSH | POP | HASH
  const [navAction, setNavAction] = useState(() => ({
    type: initialRoute.hash ? 'HASH' : 'PUSH',
    key: (typeof window !== 'undefined' && window.history.state?.key) || generateHistoryKey(),
    tab: initialRoute.tab,
    hash: initialRoute.hash,
    targetScroll: { x: 0, y: 0 },
    timestamp: 0
  }));

  // Track scroll position continuously for the active history entry
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentKey = window.history.state?.key;
          if (currentKey) {
            scrollPositions.set(currentKey, { x: window.scrollX, y: window.scrollY });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setCustomerTab = useCallback((tab, options = {}) => {
    // 1. Save scroll position of the route we are navigating away from
    const currentKey = window.history.state?.key;
    if (currentKey) {
      const pos = { x: window.scrollX, y: window.scrollY };
      scrollPositions.set(currentKey, pos);
      try {
        window.history.replaceState({
          ...window.history.state,
          scrollX: pos.x,
          scrollY: pos.y
        }, '', window.location.href);
      } catch {}
    }

    const nextKey = generateHistoryKey();
    const path = tab === 'home' ? '/' : `/${tab}`;
    const hash = options.hash ? (options.hash.startsWith('#') ? options.hash : `#${options.hash}`) : '';
    const targetUrl = `${path}${hash}`;

    try {
      window.history.pushState({
        key: nextKey,
        tab,
        hash,
        scrollX: 0,
        scrollY: 0
      }, '', targetUrl);
    } catch {}

    setCustomerTabState(tab);
    setNavKey((k) => k + 1);
    setNavAction({
      type: hash ? 'HASH' : 'PUSH',
      key: nextKey,
      tab,
      hash,
      targetScroll: { x: 0, y: 0 },
      timestamp: Date.now()
    });
  }, []);

  useEffect(() => {
    // Ensure initial entry has state
    const currentKey = window.history.state?.key || generateHistoryKey();
    const route = parseRouteFromUrl();
    try {
      if (!window.history.state || !window.history.state.key) {
        window.history.replaceState({
          key: currentKey,
          tab: route.tab,
          hash: route.hash,
          scrollX: window.scrollX,
          scrollY: window.scrollY
        }, '', window.location.href);
      }
    } catch {}

    const handlePopState = (e) => {
      const state = e.state;
      const targetKey = state?.key;
      const routeInfo = parseRouteFromUrl();
      const targetTab = state?.tab || routeInfo.tab;
      const targetHash = window.location.hash || state?.hash || '';

      // Exact saved scroll position for this history entry
      const savedPos = (targetKey && scrollPositions.get(targetKey)) || {
        x: state?.scrollX ?? 0,
        y: state?.scrollY ?? 0
      };

      setCustomerTabState(targetTab);
      setNavKey((k) => k + 1);
      setNavAction({
        type: 'POP',
        key: targetKey || 'pop',
        tab: targetTab,
        hash: targetHash,
        targetScroll: savedPos,
        timestamp: Date.now()
      });
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      setNavAction({
        type: 'HASH',
        key: window.history.state?.key || 'hash',
        tab: customerTabRef.current,
        hash,
        targetScroll: { x: 0, y: 0 },
        timestamp: Date.now()
      });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Modals & Drawers
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Elena Rostova',
    email: 'elena.rostova@vipvoyage.com',
    tier: 'Private Member (Aura Black)',
    memberSince: '2024'
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [viewingItinerary, setViewingItinerary] = useState(null); // booking or package object

  // Dynamic Mock Datasets
  const [enquiries, setEnquiries] = useState(MOCK_ENQUIRIES);
  const [quotations, setQuotations] = useState(MOCK_QUOTATIONS);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'info' | 'warning' }

  // Destination filter state
  const [destinationFilter, setDestinationFilter] = useState('All');
  const [packageSearchQuery, setPackageSearchQuery] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Customer actions
  const submitEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: enquiryData.fullName,
      email: enquiryData.email,
      phone: enquiryData.phone || '+1 (555) 000-0000',
      destination: enquiryData.destination,
      travelDates: enquiryData.dates || 'Flexible 2026',
      travelers: `${enquiryData.travelers || 2} Travelers`,
      budget: enquiryData.budget || '$5,000 – $10,000',
      preferredStyle: enquiryData.style || 'Luxury Bespoke',
      status: 'New',
      createdAt: 'Just now',
      specialNotes: enquiryData.notes || 'Submitted via customer portal'
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Your travel enquiry has been received! A personal travel designer will contact you within 4 hours.', 'success');
    setIsEnquiryModalOpen(false);
  };

  const acceptQuotation = (quotationId) => {
    setQuotations((prev) =>
      prev.map((q) =>
        q.id === quotationId ? { ...q, status: 'Accepted' } : q
      )
    );
    showToast('Quotation accepted! Your private advisor is preparing booking vouchers.', 'success');
  };

  const sendChatMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: 'customer',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated responsive agent reply
    setTimeout(() => {
      const replies = [
        "I've noted that preference in your private dossier! Let me refine the timings for you right now.",
        "Wonderful choice! Positano and Capri during that month have pristine calm waters.",
        "Your private chauffeur and yacht skipper have been briefed with these exact specifications.",
        "I am updating your day-by-day itinerary now. You can check the Trips tab in real-time."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        agentName: 'Claire de la Tour',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, agentMsg]);
    }, 1200);
  };

  // Agency actions
  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast(`Enquiry ${id} updated to ${newStatus}`, 'info');
  };

  const updateBookingStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bookingStatus: newStatus } : item))
    );
    showToast(`Booking ${id} status set to ${newStatus}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        customerTab,
        setCustomerTab,
        navKey,
        navAction,
        agencyTab,
        setAgencyTab,
        selectedPackage,
        setSelectedPackage,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        setUser,
        isChatOpen,
        setIsChatOpen,
        viewingItinerary,
        setViewingItinerary,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        quotations,
        acceptQuotation,
        bookings,
        updateBookingStatus,
        customers: MOCK_CUSTOMERS,
        agencyStats: MOCK_AGENCY_STATS,
        chatMessages,
        sendChatMessage,
        toast,
        showToast,
        destinationFilter,
        setDestinationFilter,
        packageSearchQuery,
        setPackageSearchQuery,
        destinations: DESTINATIONS,
        packages: PACKAGES,
        hotels: HOTELS,
        experiences: TRAVEL_EXPERIENCES,
        inspirations: TRAVEL_INSPIRATION
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
