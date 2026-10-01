import React, { useState } from 'react';
import {
  FileSpreadsheet,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const EnquiriesView = () => {
  const { enquiries, updateEnquiryStatus, setAgencyTab } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === 'All') return true;
    return e.status === statusFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return (
          <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--status-amber-bg)', color: 'var(--status-amber)', fontWeight: 600 }}>
            New Enquiry
          </span>
        );
      case 'Contacted':
        return (
          <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-ivory-warm)', color: 'var(--color-charcoal-deep)', fontWeight: 600 }}>
            Contacted
          </span>
        );
      case 'Quoted':
        return (
          <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-champagne-light)', color: 'var(--color-champagne-dark)', fontWeight: 600 }}>
            Quoted
          </span>
        );
      case 'Won':
        return (
          <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--status-emerald-bg)', color: 'var(--status-emerald)', fontWeight: 600 }}>
            Confirmed Won
          </span>
        );
      default:
        return (
          <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-stone-light)', color: 'var(--text-secondary)' }}>
            {status}
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* View Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
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
            Client Pipelines
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
              fontWeight: 500,
              color: 'var(--color-charcoal-deep)'
            }}
          >
            Client Enquiries
          </h2>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['All', 'New', 'Contacted', 'Quoted', 'Won'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                cursor: 'pointer',
                backgroundColor: statusFilter === st ? 'var(--color-charcoal-deep)' : '#ffffff',
                color: statusFilter === st ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: statusFilter === st ? 'var(--color-charcoal-deep)' : 'var(--border-light)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiry Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {filteredEnquiries.map((enq) => (
          <div
            key={enq.id}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-champagne-dark)' }}>
                  {enq.id}
                </span>
                {getStatusBadge(enq.status)}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Received {enq.createdAt}
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
              {enq.customerName}
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
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="var(--color-champagne-dark)" /> {enq.destination}
              </span>
              <span>•</span>
              <span>{enq.travelers}</span>
              <span>•</span>
              <span>Dates: {enq.travelDates}</span>
              <span>•</span>
              <span>Budget: <strong>{enq.budget}</strong></span>
            </div>

            <p
              style={{
                fontSize: 'var(--text-xs)',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--color-ivory-warm)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-md)'
              }}
            >
              "{enq.specialNotes}"
            </p>

            {/* Quick Actions */}
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
              <div style={{ display: 'flex', gap: '6px' }}>
                {enq.status !== 'Contacted' && (
                  <button
                    type="button"
                    onClick={() => updateEnquiryStatus(enq.id, 'Contacted')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '11px',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-charcoal-deep)',
                      cursor: 'pointer'
                    }}
                  >
                    Mark Contacted
                  </button>
                )}
                {enq.status !== 'Won' && (
                  <button
                    type="button"
                    onClick={() => updateEnquiryStatus(enq.id, 'Won')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '11px',
                      border: '1px solid var(--status-emerald)',
                      backgroundColor: 'transparent',
                      color: 'var(--status-emerald)',
                      cursor: 'pointer'
                    }}
                  >
                    Mark Won
                  </button>
                )}
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={FileSpreadsheet}
                onClick={() => setAgencyTab('quotations')}
              >
                Draft Quotation
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
