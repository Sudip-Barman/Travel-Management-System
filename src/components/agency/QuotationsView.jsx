import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const QuotationsView = () => {
  const { quotations, showToast } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Header */}
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
            Proposal Desk
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
              fontWeight: 500,
              color: 'var(--color-charcoal-deep)'
            }}
          >
            Quotations & Proposals
          </h2>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => showToast('New tailored quotation draft initialized.', 'info')}
        >
          Draft New Quotation
        </Button>
      </div>

      {/* Quotation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {quotations.map((q) => (
          <div
            key={q.id}
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
                  {q.id}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: q.status === 'Accepted' ? 'var(--status-emerald-bg)' : 'var(--color-ivory-warm)',
                    color: q.status === 'Accepted' ? 'var(--status-emerald)' : 'var(--color-champagne-dark)',
                    fontWeight: 600
                  }}
                >
                  {q.status}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Valid until {q.validUntil}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: 'var(--color-charcoal-deep)',
                marginBottom: '2px'
              }}
            >
              {q.destination}
            </h3>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
              Client: <strong>{q.clientName}</strong> • Specialist: <strong>{q.agentName}</strong>
            </div>

            {/* Total Net and Items Preview */}
            <div
              style={{
                backgroundColor: 'var(--color-ivory-warm)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                marginBottom: 'var(--space-md)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Total Net Quotation</span>
                <span
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal-deep)'
                  }}
                >
                  {q.amountFormatted || `$${q.amount.toLocaleString()}`}
                </span>
              </div>

              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                {q.items ? `${q.items.length} itemized luxury services` : 'All-inclusive package'}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-sm)'
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {q.notes}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => showToast(`Quotation ${q.id} PDF downloaded.`, 'success')}
                >
                  Export PDF
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Send}
                  onClick={() => showToast(`Quotation reminder dispatched to ${q.clientName}.`, 'info')}
                >
                  Resend Link
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
