import { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist, setIsCartOpen, setIsAccountOpen, setAccountTab } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openAccount = (tab: 'login' | 'signup') => {
    setAccountTab(tab);
    setIsAccountOpen(true);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[rgba(244,241,234,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-lg tracking-wide text-gold hover:opacity-80 transition-opacity"
        >
          Longtharai
        </button>

        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => scrollToSection('catalog')}
            className="hidden md:block text-sm font-medium text-warm/80 hover:text-gold transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection('history')}
            className="hidden md:block text-sm font-medium text-warm/80 hover:text-gold transition-colors"
          >
            History
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block text-sm font-medium text-warm/80 hover:text-gold transition-colors"
          >
            Contact
          </button>

          {/* Wishlist */}
          <button
            onClick={() => scrollToSection('wishlist-section')}
            className="relative text-warm/80 hover:text-gold transition-colors"
            title="Wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C72C2C] rounded-full text-[10px] font-semibold text-white flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => openAccount('login')}
            className="text-warm/80 hover:text-gold transition-colors"
            title="Account"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-warm/80 hover:text-gold transition-colors"
            title="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C72C2C] rounded-full text-[10px] font-semibold text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
