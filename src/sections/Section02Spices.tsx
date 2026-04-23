import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import { heroProducts } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Section02Spices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const product = heroProducts[0];

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const lines = linesRef.current;
    const card = cardRef.current;
    if (!section || !bg || !lines || !card) return;

    const lineElements = lines.querySelectorAll('.typo-line');

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

      lineElements.forEach((line, i) => {
        scrollTl.fromTo(
          line,
          { x: '-12vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          i * 0.02
        );
      });

      scrollTl.fromTo(
        card,
        { x: '55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0.05
      );

      // SETTLE (30% - 70%) - nothing happens, stable view

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        card,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      lineElements.forEach((line) => {
        scrollTl.fromTo(
          line,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.70
        );
      });

      scrollTl.fromTo(
        bg,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-3vh', ease: 'none' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section"
      style={{ zIndex: 10 }}
    >
      {/* Background */}
      <img
        ref={bgRef}
        src={product.bgImage}
        alt=""
        className="scene-bg"
        loading="eager"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="scene-content flex items-center">
        {/* Left Typography */}
        <div
          ref={linesRef}
          className="absolute left-[7vw] top-[18vh] w-[44vw]"
        >
          {product.lines.map((line, i) => (
            <div
              key={i}
              className="typo-line font-display text-gold"
              style={{
                fontSize: 'clamp(42px, 7vw, 110px)',
                textShadow: '0 2px 30px rgba(0,0,0,0.5)',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Right Product Card */}
        <div
          ref={cardRef}
          className="absolute right-[6vw] top-[16vh]"
        >
          <ProductCard product={product} />
        </div>
      </div>
    </section>
  );
}
