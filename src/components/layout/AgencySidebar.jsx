import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Luggage,
  FileSpreadsheet,
  PlaneTakeoff,
  Users,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgencySidebar = () => {
  const { agencyTab, setAgencyTab, enquiries, setRole } = useApp();
  const pendingCount = enquiries.filter((e) => e.status === 'New').length;

  const links = [
    { id: 'dashboard', label: 'Travel Desk', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Client Enquiries', icon: Inbox, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'packages', label: 'Curated Dossiers', icon: Luggage },
    { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet },
    { id: 'bookings', label: 'Departures', icon: PlaneTakeoff },
    { id: 'customers', label: 'Client Directory', icon: Users },
    { id: 'reports', label: 'Performance', icon: BarChart3 }
  ];

  return (
    <aside className="agency-sidebar">
      {/* Brand Workspace Title */}
      <div style={{ marginBottom: 'var(--space-xl)', padding: '0 var(--space-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-charcoal-deep)' }}>
              AuraVoyage Desk
            </div>
            <div style={{ fontSize: '10.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-champagne-dark)', fontWeight: 600 }}>
              Operational Workspace
            </div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = agencyTab === link.id;
          return (
            <button
              key={link.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setAgencyTab(link.id)}
            >
              <Icon size={16} />
              <span style={{ flex: 1, textAlign: 'left' }}>{link.label}</span>
              {link.badge && (
                <span
                  style={{
                    backgroundColor: 'var(--color-champagne)',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Specialist Identity Profile & Client Site Switcher */}
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Elena Rostova"
            style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-charcoal-deep)' }}>
              Elena Rostova
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
              Senior Travel Designer
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRole('customer')}
          className="sidebar-nav-item"
          style={{
            fontSize: '11.5px',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-sand)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-ink)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>Return to Client Site</span>
          <span style={{ fontSize: '10px', color: 'var(--color-champagne-dark)' }}>↗</span>
        </button>
      </div>
    </aside>
  );
};
