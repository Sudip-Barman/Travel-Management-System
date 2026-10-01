import React from 'react';
import {
  ArrowRight,
  Inbox,
  FileSpreadsheet,
  PlaneTakeoff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { MOCK_TODAYS_ATTENTION } from '../../data/mockData';

export const AgencyDashboard = () => {
  const {
    enquiries,
    quotations,
    bookings,
    setAgencyTab,
    setSelectedBooking,
    setIsItineraryModalOpen
  } = useApp();

  const handleAttentionAction = (item) => {
    if (item.targetTab === 'bookings') {
      const kashmirBooking = bookings.find((b) => b.id === 'BK-9950') || bookings[0];
      setSelectedBooking(kashmirBooking);
      setIsItineraryModalOpen(true);
    } else {
      setAgencyTab(item.targetTab);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* 1. Refined Workspace Header */}
      <div>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-champagne-dark)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '4px'
          }}
        >
          Good morning.
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
            fontWeight: 500,
            color: 'var(--color-charcoal-deep)',
            lineHeight: 1.15,
            marginBottom: 'var(--space-md)'
          }}
        >
          Your travel desk
        </h1>

        {/* Calm Operational Status Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            padding: '12px 18px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--status-emerald)' }} />
            <strong style={{ color: 'var(--color-charcoal-deep)' }}>24</strong> active journeys
          </div>

          <span style={{ color: 'var(--color-stone-medium)' }}>•</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-champagne-dark)' }} />
            <strong style={{ color: 'var(--color-charcoal-deep)' }}>8</strong> enquiries awaiting response
          </div>

          <span style={{ color: 'var(--color-stone-medium)' }}>•</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-charcoal-deep)' }} />
            <strong style={{ color: 'var(--color-charcoal-deep)' }}>5</strong> trips departing this week
          </div>
        </div>
      </div>

      {/* 2. Today's Attention (Exact prompt structure) */}
      <section>
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.75rem',
              fontWeight: 500,
              color: 'var(--color-charcoal-deep)'
            }}
          >
            Today's attention
          </h2>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            High-priority concierge matters requiring action or operational sign-off.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {MOCK_TODAYS_ATTENTION.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
                transition: 'border-color var(--transition-fast)'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: item.type === 'departure' ? 'var(--status-emerald)' : 'var(--color-champagne-dark)'
                    }}
                  >
                    {item.title}
                  </span>
                  <span style={{ color: 'var(--color-stone-medium)', fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.urgency}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal-deep)',
                    marginBottom: '4px'
                  }}
                >
                  {item.subtitle}
                </h3>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {item.detail}
                </p>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAttentionAction(item)}
                  iconRight={ArrowRight}
                >
                  {item.actionLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Operational Quick Access */}
      <section>
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.35rem',
              fontWeight: 500,
              color: 'var(--color-charcoal-deep)'
            }}
          >
            Desk Workspaces
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          <div
            onClick={() => setAgencyTab('enquiries')}
            style={{
              backgroundColor: '#ffffff',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
                Enquiries
              </span>
              <Inbox size={18} color="var(--color-charcoal-deep)" />
            </div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-charcoal-deep)' }}>
              {enquiries.length} Inquiries
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {enquiries.filter(e => e.status === 'New').length} unassigned client briefs
            </p>
          </div>

          <div
            onClick={() => setAgencyTab('quotations')}
            style={{
              backgroundColor: '#ffffff',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
                Quotations
              </span>
              <FileSpreadsheet size={18} color="var(--color-charcoal-deep)" />
            </div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-charcoal-deep)' }}>
              {quotations.length} Active Quotes
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Itemized hotel, yacht & guide proposals
            </p>
          </div>

          <div
            onClick={() => setAgencyTab('bookings')}
            style={{
              backgroundColor: '#ffffff',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-muted)' }}>
                Departures
              </span>
              <PlaneTakeoff size={18} color="var(--color-charcoal-deep)" />
            </div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-charcoal-deep)' }}>
              {bookings.length} Confirmed
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Kashmir departing tomorrow · Amalfi May 12
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
