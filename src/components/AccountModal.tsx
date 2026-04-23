import { useState } from 'react';
import { useApp } from '../store/AppContext';

export default function AccountModal() {
  const { isAccountOpen, setIsAccountOpen, accountTab, setAccountTab } = useApp();
  const [submitted, setSubmitted] = useState(false);

  if (!isAccountOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAccountOpen(false);
    }, 1500);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
        onClick={() => setIsAccountOpen(false)}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] rounded-2xl border border-[rgba(244,241,234,0.08)] z-[201] p-6 md:p-8">
        {/* Close */}
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-4 right-4 text-muted-warm hover:text-warm transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Tabs */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={() => setAccountTab('login')}
            className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
              accountTab === 'login'
                ? 'text-gold border-gold'
                : 'text-muted-warm border-transparent'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAccountTab('signup')}
            className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
              accountTab === 'signup'
                ? 'text-gold border-gold'
                : 'text-muted-warm border-transparent'
            }`}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-warm font-medium">
              {accountTab === 'login' ? 'Welcome back!' : 'Account created!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {accountTab === 'signup' && (
              <div>
                <label className="block font-mono-accent text-muted-warm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#0B0B0C] border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your full name"
                />
              </div>
            )}
            <div>
              <label className="block font-mono-accent text-muted-warm mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-[#0B0B0C] border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-mono-accent text-muted-warm mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-[#0B0B0C] border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                placeholder="Min 6 characters"
              />
            </div>
            {accountTab === 'signup' && (
              <div>
                <label className="block font-mono-accent text-muted-warm mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-[#0B0B0C] border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="+91 9876543210"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full btn-ruby py-3 rounded-xl text-sm font-semibold mt-2"
            >
              {accountTab === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
