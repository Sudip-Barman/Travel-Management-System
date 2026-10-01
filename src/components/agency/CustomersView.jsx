import React from 'react';
import { Users, Phone, Mail, Award, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomersView = () => {
  const { customers } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
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
          Private Client Directory
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--color-charcoal-deep)'
          }}
        >
          High-Net-Worth Voyager Profiles
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {customers.map((c) => (
          <div
            key={c.id}
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
                marginBottom: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-champagne-dark)' }}>
                  {c.id}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-ivory-warm)',
                    color: 'var(--color-charcoal-deep)',
                    fontWeight: 600
                  }}
                >
                  {c.tier}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {c.totalTrips} Bespoke Journeys Completed
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
              {c.name}
            </h3>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-sm)'
              }}
            >
              <span>{c.city}</span>
              <span>•</span>
              <span>{c.email}</span>
              <span>•</span>
              <span>{c.phone}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 'var(--space-sm)',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: 'var(--text-xs)'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Latest Journey: </span>
                <strong>{c.lastTrip}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Cumulative Spend: </span>
                <strong style={{ color: 'var(--color-charcoal-deep)' }}>{c.totalSpent}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
