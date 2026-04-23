import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../store/AppContext';
import { heroProducts } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Section00Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openProductDetail } = useApp();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const desc = descRef.current;
    const cta = ctaRef.current;
    const images = imagesRef.current;
    const scrollHint = scrollRef.current;
    if (!section || !title || !tagline || !desc || !cta || !images || !scrollHint) return;

    const titleChars = title.querySelectorAll('.hero-char');
    const imageEls = images.querySelectorAll('.hero-product-img');

    const ctx = gsap.context(() => {
      // Initial load animation timeline
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Title character stagger reveal
      loadTl.fromTo(
        titleChars,
        { y: 80, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.04,
        }
      );

      // Tagline fade in
      loadTl.fromTo(
        tagline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Description fade in
      loadTl.fromTo(
        desc,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // CTA buttons
      loadTl.fromTo(
        cta.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        '-=0.2'
      );

      // Product images fly in from different directions
      imageEls.forEach((img, i) => {
        const directions = [
          { x: -100, y: -50 },
          { x: 100, y: -30 },
          { x: -80, y: 60 },
          { x: 90, y: 50 },
          { x: 0, y: -80 },
        ];
        const dir = directions[i % directions.length];
        loadTl.fromTo(
          img,
          { x: dir.x, y: dir.y, opacity: 0, scale: 0.8 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
          0.5 + i * 0.1
        );
      });

      // Scroll hint
      loadTl.fromTo(
        scrollHint,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=80%',
          scrub: 0.5,
          pin: false,
        },
      });

      // Title scales up and fades
      scrollTl.fromTo(
        title,
        { y: 0, scale: 1, opacity: 1 },
        { y: -60, scale: 0.95, opacity: 0, ease: 'power2.in' },
        0
      );

      // Tagline and desc fade
      scrollTl.fromTo(
        [tagline, desc],
        { y: 0, opacity: 1 },
        { y: -40, opacity: 0, ease: 'power2.in' },
        0
      );

      // CTA fades
      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: -30, opacity: 0, ease: 'power2.in' },
        0.1
      );

      // Images scatter on scroll
      imageEls.forEach((img, i) => {
        const dirs = [
          { x: -150, y: -100 },
          { x: 150, y: -80 },
          { x: -120, y: 120 },
          { x: 130, y: 100 },
          { x: 0, y: -150 },
        ];
        scrollTl.fromTo(
          img,
          { x: 0, y: 0, opacity: 1, scale: 1 },
          { x: dirs[i].x, y: dirs[i].y, opacity: 0, scale: 0.7, ease: 'power2.in' },
          i * 0.02
        );
      });

      // Parallax for decorative elements
      scrollTl.fromTo(
        scrollHint,
        { opacity: 1 },
        { opacity: 0, ease: 'none' },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Split title into characters for animation
  const titleText = 'Longtharai';
  const titleChars = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      style={{ perspective: '1000px' }}
    >
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] bg-charcoal flex items-center justify-center overflow-hidden"
    >
      {/* Radial glow behind title */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,160,58,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating product images - background layer */}
      <div ref={imagesRef} className="absolute inset-0 pointer-events-none">
        {heroProducts.map((product, i) => {
          const positions = [
            { left: '5%', top: '15%', rotate: '-12deg', size: 140 },
            { right: '8%', top: '10%', rotate: '8deg', size: 120 },
            { left: '8%', bottom: '20%', rotate: '15deg', size: 130 },
            { right: '5%', bottom: '15%', rotate: '-8deg', size: 110 },
            { left: '45%', top: '8%', rotate: '5deg', size: 100 },
          ];
          const pos = positions[i];
          return (
            <button
              key={product.id}
              onClick={() => openProductDetail(product.id)}
              className="hero-product-img absolute pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{
                ...pos,
                width: pos.size,
                height: pos.size,
                transform: `rotate(${pos.rotate})`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </button>
          );
        })}
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Small label above */}
        <p className="font-mono-accent text-gold/60 mb-6 tracking-[0.25em]">
          PREMIUM INDIAN FMCG BRAND
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-gold mb-6"
          style={{
            fontSize: 'clamp(60px, 14vw, 180px)',
            lineHeight: 0.9,
            textShadow: '0 4px 60px rgba(212,160,58,0.15)',
          }}
        >
          {titleChars}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-xl md:text-2xl font-light text-warm tracking-[0.15em] mb-6 opacity-0"
        >
          Taste the East.
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-sm md:text-base text-muted-warm max-w-lg mx-auto mb-10 leading-relaxed opacity-0"
        >
          From the hills of Tripura to your kitchen — pure spices, cold-pressed oils,
          premium rice, fresh dairy, and refreshing beverages crafted with tradition
          and authenticity since 1999.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 opacity-0">
          <button
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ruby px-8 py-3.5 rounded-xl text-sm font-semibold"
          >
            Shop Now
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('history');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-warm border border-[rgba(244,241,234,0.15)] hover:border-gold/40 hover:text-gold transition-all"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[rgba(244,241,234,0.06)] bg-charcoal/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="font-display text-gold text-xl md:text-2xl">66+</p>
            <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Products</p>
          </div>
          <div className="w-px h-8 bg-[rgba(244,241,234,0.1)]" />
          <div className="text-center">
            <p className="font-display text-gold text-xl md:text-2xl">5</p>
            <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Categories</p>
          </div>
          <div className="w-px h-8 bg-[rgba(244,241,234,0.1)]" />
          <div className="text-center">
            <p className="font-display text-gold text-xl md:text-2xl">25+</p>
            <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Years</p>
          </div>
          <div className="w-px h-8 bg-[rgba(244,241,234,0.1)] hidden md:block" />
          <div className="text-center hidden md:block">
            <p className="font-display text-gold text-xl md:text-2xl">100%</p>
            <p className="font-mono-accent text-muted-warm text-[10px] mt-1">Pure</p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollRef}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 animation-pulse-down opacity-0"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-warm/40">
          <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
