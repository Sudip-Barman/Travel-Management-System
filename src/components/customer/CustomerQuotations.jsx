import React from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../common/EmptyState';

export const CustomerQuotations = () => {
  const { quotations, acceptQuotation, setIsChatOpen, setIsEnquiryModalOpen } = useApp();

  return (
    <section className="pt-10 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-32 bg-canvas">
      <div className="w-full max-w-[1320px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px] mb-8 sm:mb-12">
          <span className="text-[11px] tracking-[0.2em] uppercase text-champagne-dark font-semibold block mb-1.5">
            Client Travel Dossier
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-normal leading-tight text-ink mb-2">
            Official Agency Quotations
          </h2>
          <p className="text-xs sm:text-base text-ink-muted leading-relaxed">
            Transparent itemized proposals prepared by your dedicated destination specialist.
          </p>
        </div>

        {quotations.length === 0 ? (
          <EmptyState
            icon={FileSpreadsheet}
            title="No active quotations"
            description="You don't have any pending quotations right now. Request a bespoke itinerary or submit a travel brief."
            actionLabel="Request Custom Journey"
            onAction={() => setIsEnquiryModalOpen(true)}
          />
        ) : (
          <div className="flex flex-col gap-6 sm:gap-10">
            {quotations.map((quote) => {
              const isAccepted = quote.status === 'Accepted';
              return (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl border border-black/[0.08] p-4 xs:p-6 sm:p-8 md:p-10 shadow-subtle"
                >
                  {/* Quote Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-black/[0.07]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-ink-faint tracking-wide font-mono">
                          REF: {quote.id}
                        </span>
                        <span
                          className={`text-[10.5px] py-0.5 px-2 rounded-full font-semibold ${
                            isAccepted
                              ? 'bg-status-emerald-bg text-status-emerald'
                              : 'bg-sand text-champagne-dark'
                          }`}
                        >
                          {quote.status}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-1">
                        {quote.destination}
                      </h3>
                      <p className="text-xs text-ink-muted">
                        Client: <strong className="text-ink font-semibold">{quote.clientName}</strong> • Valid until: {quote.validUntil}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-ink-faint block">Net Quotation</span>
                      <span className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                        {quote.amountFormatted || `$${quote.amount.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  {/* Itemized Services Breakdown */}
                  <div className="my-5 sm:my-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-champagne-dark mb-2">
                      Itemized Services Breakdown
                    </div>

                    <div className="bg-sand rounded-xl border border-black/[0.07] overflow-hidden">
                      {quote.items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between py-2.5 px-3.5 text-xs text-ink ${
                            idx !== quote.items.length - 1 ? 'border-b border-black/[0.05]' : ''
                          }`}
                        >
                          <span className="pr-2">{item.name}</span>
                          <span className="font-semibold flex-shrink-0">
                            {quote.currency || '$'}{item.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Designer Notes & Actions */}
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-4 border-t border-black/[0.07]">
                    <div className="text-xs text-ink-muted truncate">
                      Advisor: <strong className="text-ink font-semibold">{quote.agentName}</strong> ({quote.agentRole})
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
                      <button
                        type="button"
                        onClick={() => setIsChatOpen(true)}
                        className="inline-flex items-center justify-center gap-1.5 font-sans text-xs font-medium py-2 px-3.5 rounded-full min-h-[38px] bg-transparent hover:bg-sand border border-black/15 text-ink transition-colors cursor-pointer text-center"
                      >
                        <MessageSquare size={14} />
                        <span>Message Specialist</span>
                      </button>

                      {!isAccepted ? (
                        <button
                          type="button"
                          onClick={() => acceptQuotation(quote.id)}
                          className="inline-flex items-center justify-center gap-1.5 font-sans text-xs font-medium py-2 px-4 rounded-full min-h-[38px] bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer text-center"
                        >
                          <CheckCircle2 size={14} />
                          <span>Accept Quotation</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-status-emerald font-semibold py-2">
                          ✓ Confirmed & Transferred to Operations
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
