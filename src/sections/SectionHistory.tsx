import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const stats = statsRef.current;
    const heading = headingRef.current;
    if (!section || !left || !right || !stats || !heading) return;

    const statEls = stats.querySelectorAll('.stat-item');
    const leftParagraphs = left.querySelectorAll('.story-p');

    const ctx = gsap.context(() => {
      // Heading reveal with stagger
      gsap.fromTo(
        heading.querySelectorAll('.history-line'),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Story paragraphs stagger
      leftParagraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });

      // Right image reveal
      gsap.fromTo(
        right,
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );

      // Stats counter animation
      statEls.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stats,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
            delay: i * 0.05,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history"
      className="relative w-full bg-charcoal py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#C72C2C]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Story */}
          <div ref={leftRef}>
            <div ref={headingRef}>
              <p className="history-line font-mono-accent text-gold mb-4">Our Story</p>
              <h2
                className="history-line font-display text-gold mb-6"
                style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
              >
                ROOTED IN TRIPURA
              </h2>
            </div>

            <div className="space-y-4 text-muted-warm text-sm leading-relaxed">
              <p className="story-p">
                <span className="text-gold font-display text-lg">Longtharai Gura Masala</span> began as a
                humble spice-grinding unit in the heart of Agartala, Tripura. Founded with a
                singular vision — to bring the purest, most authentic Indian flavours to every
                household — we started by sourcing the finest raw materials directly from local
                farmers and tribal communities across Northeast India.
              </p>
              <p className="story-p">
                What started as a small family operation has grown into one of the region's most
                trusted FMCG brands. Our name, <span className="text-warm">Longtharai</span>, draws
                inspiration from the majestic Longtharai hills that stand as sentinels over the
                fertile plains of Tripura — a symbol of strength, purity, and timeless connection
                to the land.
              </p>
              <p className="story-p">
                Today, our product range spans across <span className="text-warm">pure spices, cold-pressed oils,
                premium rice varieties, fresh dairy products, and refreshing beverages</span> — all
                manufactured under strict quality standards at our state-of-the-art facility in
                Khayerpur, Agartala.
              </p>
              <p className="story-p">
                Every product that carries the Longtharai name is a promise — of authenticity,
                purity, and the rich culinary heritage of India. No additives. No shortcuts.
                Just real food.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-4 gap-4 mt-10">
              <div className="stat-item bg-charcoal-lifted rounded-xl p-4 border border-[rgba(244,241,234,0.06)] text-center">
                <p className="font-display text-gold text-2xl">66+</p>
                <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Products</p>
              </div>
              <div className="stat-item bg-charcoal-lifted rounded-xl p-4 border border-[rgba(244,241,234,0.06)] text-center">
                <p className="font-display text-gold text-2xl">5</p>
                <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Categories</p>
              </div>
              <div className="stat-item bg-charcoal-lifted rounded-xl p-4 border border-[rgba(244,241,234,0.06)] text-center">
                <p className="font-display text-gold text-2xl">25+</p>
                <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Years</p>
              </div>
              <div className="stat-item bg-charcoal-lifted rounded-xl p-4 border border-[rgba(244,241,234,0.06)] text-center">
                <p className="font-display text-gold text-2xl">100%</p>
                <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Pure</p>
              </div>
            </div>
          </div>

          {/* Right - Image collage effect */}
          <div ref={rightRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/bg-spices.jpg"
                alt="Longtharai spices"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Overlay card - Factory */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl p-4 border border-[rgba(244,241,234,0.08)]">
                  <p className="font-mono-accent text-gold text-[10px] mb-1">
                    FACTORY LOCATION
                  </p>
                  <p className="text-warm text-sm font-medium">
                    R.K. Nagar, Opposite College of Veterinary Science & A.H.
                  </p>
                  <p className="text-muted-warm text-xs mt-1">
                    Khayerpur, Agartala, Tripura - 799008
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#141414] border border-gold/30 rounded-xl px-4 py-3 shadow-2xl">
              <p className="font-display text-gold text-xl">EST.</p>
              <p className="font-mono-accent text-muted-warm text-[10px]">1999</p>
            </div>

            {/* Second floating element */}
            <div className="absolute -bottom-3 -left-3 bg-charcoal-lifted border border-[rgba(244,241,234,0.08)] rounded-xl px-4 py-2 shadow-xl">
              <p className="font-mono-accent text-gold/60 text-[10px]">CONTACT</p>
              <p className="text-warm text-xs font-medium">+91 70850 41444</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
