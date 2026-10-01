import React from 'react';
import {
  PlaneTakeoff,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  Eye,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const BookingsView = () => {
  const { bookings, setViewingItinerary } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Header */}
      <div>
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-champagne-dark)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '4px'
          }}
        >
          Operations Desk
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--color-charcoal-deep)'
          }}
        >
          Confirmed Departures & Bookings
        </h2>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 'var(--space-sm)',
                marginBottom: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-champagne-dark)' }}>
                  {b.bookingRef}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--status-emerald-bg)',
                    color: 'var(--status-emerald)',
                    fontWeight: 600
                  }}
                >
                  {b.bookingStatus}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Concierge: {b.agentContact}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: 'var(--color-charcoal-deep)',
                marginBottom: '4px'
              }}
            >
              {b.packageName}
            </h3>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)'
              }}
            >
              <span>Client: <strong>{b.customerName}</strong> ({b.travelersCount} Guests)</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} color="var(--color-champagne-dark)" /> {b.dates}
              </span>
              <span>•</span>
              <span>Stay: <strong>{b.hotelName}</strong></span>
              <span>•</span>
              <span>Flight: <strong>{b.flightCode}</strong></span>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-sm)',
                paddingTop: 'var(--space-sm)',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Payment Settlement</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--status-emerald)' }}>
                  {b.paymentStatus} ({b.priceFormatted || `$${b.totalPrice.toLocaleString()}`})
                </span>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={Eye}
                onClick={() => setViewingItinerary(b)}
              >
                Inspect Flight & Voucher
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
