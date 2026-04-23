import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section07Purity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    if (!section || !bg || !headline || !sub) return;

    const wordElements = headline.querySelectorAll('.purity-word');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bg,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      wordElements.forEach((word, i) => {
        scrollTl.fromTo(
          word,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          i * 0.035
        );
      });

      scrollTl.fromTo(
        sub,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        sub,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        bg,
        { scale: 1 },
        { scale: 1.08, ease: 'none' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="purity"
      className="scene-section"
      style={{ zIndex: 15 }}
    >
      <img
        ref={bgRef}
        src="/images/bg-purity.jpg"
        alt=""
        className="scene-bg"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="scene-content flex flex-col items-center justify-center">
        {/* Center Headline */}
        <div
          ref={headlineRef}
          className="text-center"
        >
          <div
            className="purity-word font-display text-gold"
            style={{
              fontSize: 'clamp(48px, 9vw, 140px)',
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            }}
          >
            ONLY PURE
          </div>
          <div
            className="purity-word font-display text-gold"
            style={{
              fontSize: 'clamp(48px, 9vw, 140px)',
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
            }}
          >
            INGREDIENTS
          </div>
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-8 text-base font-medium text-muted-warm tracking-[0.14em] text-center"
        >
          No additives. No shortcuts. Just real food.
        </p>
      </div>
    </section>
  );
}
