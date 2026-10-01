import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser, showToast } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    if (mode === 'login') {
      setUser({
        name: fullName || 'Elena Rostova',
        email: email || 'elena.rostova@vipvoyage.com',
        tier: 'Private Member (Aura Black)',
        memberSince: '2024'
      });
      showToast('Welcome back to AuraVoyage Private Circle.', 'success');
    } else {
      setUser({
        name: fullName || 'New Voyager',
        email: email,
        tier: 'Member',
        memberSince: '2026'
      });
      showToast('Account created. Welcome to AuraVoyage.', 'success');
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out successfully.', 'info');
    setIsAuthModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-[#101113]/65 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[840px] max-h-[92dvh] sm:max-h-[90vh] overflow-hidden border border-black/[0.07] shadow-float relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Editorial Photography Story */}
        <div className="md:w-5/12 bg-dark relative overflow-hidden flex flex-col justify-between p-4 xs:p-6 sm:p-8 text-white min-h-[100px] xs:min-h-[120px] md:min-h-[480px] flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
            alt="Private journey horizon"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11]/95 via-[#0d0e11]/35 to-transparent" />

          {/* Close button on mobile */}
          <button
            type="button"
            className="md:hidden absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-colors"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 pr-8 md:pr-0">
            <span className="text-[9px] xs:text-[10px] tracking-[0.2em] uppercase text-champagne-light font-semibold block mb-1">
              AuraVoyage Circle
            </span>
            <h2 className="font-display text-lg xs:text-2xl sm:text-3xl font-normal leading-tight text-white mb-1 sm:mb-2">
              Your next journey starts here.
            </h2>
            <p className="text-xs text-white/75 leading-relaxed hidden sm:block">
              Access bespoke confidential itineraries, dedicated concierge dispatches, and private villa suite upgrades.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 hidden md:block">
            <div className="flex items-center gap-2 text-xs text-champagne">
              <Shield size={14} />
              <span className="font-medium">Confidential Client Dossier</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form or Profile */}
        <div className="md:w-7/12 flex flex-col p-4 xs:p-6 sm:p-8 bg-white overflow-y-auto flex-1">
          {/* Header on desktop */}
          <div className="hidden md:flex items-center justify-between pb-4 border-b border-black/[0.07] mb-6">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-medium text-ink">
                AuraVoyage
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-champagne-dark font-semibold">
                Private Client
              </span>
            </div>

            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-black/[0.04] transition-colors cursor-pointer"
              onClick={() => setIsAuthModalOpen(false)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {user ? (
            /* Logged In Profile View */
            <div className="my-auto">
              <div className="flex items-center gap-3.5 mb-5 sm:mb-6 p-3.5 sm:p-4 bg-sand rounded-xl border border-black/[0.05]">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink text-white flex items-center justify-center font-display text-lg sm:text-xl font-medium flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-ink mb-0.5 truncate">
                    {user.name}
                  </h3>
                  <p className="text-xs text-ink-muted truncate">
                    {user.email}
                  </p>
                  <span className="inline-block mt-0.5 text-[10px] tracking-wide uppercase text-champagne-dark font-semibold">
                    {user.tier}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs text-ink-muted mb-6 sm:mb-8">
                <div className="flex justify-between py-2 border-b border-black/[0.07]">
                  <span>Dedicated Specialist</span>
                  <strong className="text-ink font-semibold">Julian Sterling (Geneva)</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-black/[0.07]">
                  <span>Direct Concierge Line</span>
                  <strong className="text-ink font-semibold">+1 (800) 492-AURA</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span>VIP Perks</span>
                  <span className="text-forest font-semibold">Complimentary Villa Upgrade</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center font-sans text-xs tracking-wide font-medium py-3 px-6 rounded-full min-h-[42px] bg-transparent hover:bg-sand border border-black/15 text-ink transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* Login / Register Form */
            <form onSubmit={handleSubmit} className="my-auto flex flex-col gap-3 sm:gap-4">
              <div className="mb-1 sm:mb-2">
                <span className="text-[10px] tracking-[0.18em] uppercase text-champagne-dark font-semibold block mb-1">
                  {mode === 'login' ? 'Private Membership' : 'Invitation Request'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-normal text-ink mb-1">
                  {mode === 'login' ? 'Sign in to Circle' : 'Join AuraVoyage'}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {mode === 'login'
                    ? 'Access confidential bespoke itineraries and vouchers.'
                    : 'Curated escapes, personal concierge and private flight coordination.'}
                </p>
              </div>

              {mode === 'register' && (
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted" htmlFor="auth-name">
                    Full Name
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
                    className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted" htmlFor="auth-email">
                  Email Address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="e.g. client@domain.com"
                  className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted" htmlFor="auth-password">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm text-ink bg-white border border-black/15 focus:border-ink rounded-lg py-2 sm:py-2.5 px-3 min-h-[40px] outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center font-sans text-xs tracking-wide font-medium py-2.5 sm:py-3 px-6 rounded-full min-h-[42px] sm:min-h-[44px] bg-ink hover:bg-ink-soft text-white transition-all cursor-pointer mt-1 sm:mt-2"
              >
                {mode === 'login' ? 'Sign In to Concierge' : 'Create Member Account'}
              </button>

              <div className="pt-3 border-t border-black/[0.07] flex justify-center text-xs text-ink-muted">
                {mode === 'login' ? (
                  <span>
                    New to AuraVoyage?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-ink font-semibold underline cursor-pointer"
                    >
                      Request Membership
                    </button>
                  </span>
                ) : (
                  <span>
                    Already a member?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-ink font-semibold underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
