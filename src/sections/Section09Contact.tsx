import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section09Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        right,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftRef} className="md:col-span-2">
            <h2
              className="font-display text-gold mb-8"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Factory */}
              <div>
                <p className="font-mono-accent text-gold text-[10px] mb-2">FACTORY / WHOLESALE</p>
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold mt-0.5 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-warm/80 text-sm leading-relaxed">
                    R.K. Nagar, Opposite College of Veterinary Science & A.H.,<br />
                    Khayerpur, Agartala, Tripura - 799008
                  </p>
                </div>
              </div>

              {/* Office */}
              <div>
                <p className="font-mono-accent text-gold text-[10px] mb-2">HEAD OFFICE</p>
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold mt-0.5 flex-shrink-0">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-warm/80 text-sm leading-relaxed">
                    Central Road, Near Shiv Bari,<br />
                    Agartala, Tripura - 799001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-warm/80 text-sm">+91 70850 41444</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-warm/80 text-sm">hello@longtharai.in</span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold flex-shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-warm/80 text-sm">www.longtharai.in</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-accent text-muted-warm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-charcoal-lifted border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono-accent text-muted-warm mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-charcoal-lifted border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-accent text-muted-warm mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-charcoal-lifted border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-mono-accent text-muted-warm mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-charcoal-lifted border border-[rgba(244,241,234,0.1)] rounded-xl px-4 py-3 text-warm text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  submitted ? 'bg-green-600 text-white' : 'btn-ruby'
                }`}
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[rgba(244,241,234,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-gold text-sm">Longtharai</span>
            <span className="text-muted-warm text-xs">
              © {new Date().getFullYear()} Longtharai Gura Masala. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-warm text-xs hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="text-muted-warm text-xs hover:text-gold transition-colors">Terms</a>
            <a href="#" className="text-muted-warm text-xs hover:text-gold transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}
