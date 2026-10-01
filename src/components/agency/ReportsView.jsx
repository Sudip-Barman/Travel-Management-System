import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Award, Percent } from 'lucide-react';

export const ReportsView = () => {
  const destinationPerformance = [
    { name: 'The Kashmir Escape & Dal Lake', revenue: '₹38,40,000 / $46,000', share: '34%' },
    { name: 'Kyoto & Tokyo, Japan', revenue: '$148,000', share: '31%' },
    { name: 'Amalfi Coast & Capri', revenue: '$122,000', share: '24%' },
    { name: 'Swiss Alps & Zermatt', revenue: '$74,000', share: '11%' }
  ];

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
          Performance Intelligence
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 500,
            color: 'var(--color-charcoal-deep)'
          }}
        >
          Agency Performance & Yield
        </h2>
      </div>

      {/* Editorial Key Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-md)'
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: 4 }}>Conversion Rate</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--status-emerald)' }}>
            71.2%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
            Bespoke Enquiry → Confirmed Deposit
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: 4 }}>Average Booking Value</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-charcoal-deep)' }}>
            $7,850
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
            Curated Private Multi-Day Journeys
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: 4 }}>Private Member Retention</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-champagne-dark)' }}>
            48.5%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
            Repeat bookings within 18 months
          </div>
        </div>
      </div>

      {/* Destination Performance List */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: 'var(--space-xl)'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '1.45rem',
            fontWeight: 500,
            color: 'var(--color-charcoal-deep)',
            marginBottom: 'var(--space-md)'
          }}
        >
          Leading Curated Destinations
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {destinationPerformance.map((item, idx) => (
            <div key={idx} style={{ paddingBottom: '12px', borderBottom: idx !== destinationPerformance.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: 4 }}>
                <span style={{ fontWeight: 500, color: 'var(--color-charcoal-deep)' }}>{item.name}</span>
                <span style={{ fontWeight: 600 }}>{item.revenue}</span>
              </div>
              <div style={{ width: '100%', height: 4, backgroundColor: 'var(--color-ivory-warm)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: item.share,
                    backgroundColor: idx === 0 ? 'var(--color-champagne)' : 'var(--color-charcoal-deep)',
                    borderRadius: 'var(--radius-pill)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
