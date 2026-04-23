import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allProducts } from '../data/products';
import { useApp } from '../store/AppContext';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Spices', 'Dairy', 'Oils', 'Rice', 'Drinks'];

export default function Section08Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail } = useApp();

  const filteredProducts = activeCategory === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const handleVariantSelect = (productId: string, variantIndex: number) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantIndex }));
  };

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
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
      id="catalog"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-8 md:mb-12">
          <h2
            className="font-display text-gold mb-3"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Shop All
          </h2>
          <p className="text-muted-warm text-base tracking-wide">
            From our kitchen to yours. Authentic Indian flavours, delivered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'bg-charcoal-lifted text-muted-warm border border-[rgba(244,241,234,0.06)] hover:text-warm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedIdx = selectedVariants[product.id] ?? 0;
            const variant = product.variants[selectedIdx];
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="catalog-card group bg-charcoal-lifted rounded-2xl p-4 border border-[rgba(244,241,234,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Image + Wishlist */}
                <button 
                  onClick={() => openProductDetail(product.id)}
                  className="relative overflow-hidden rounded-xl bg-[#0B0B0C] mb-3 w-full block"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      inWishlist
                        ? 'bg-[#C72C2C]/90 text-white'
                        : 'bg-black/50 text-warm/70 hover:text-[#C72C2C]'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </span>
                </button>

                {/* Info - clickable title */}
                <button 
                  onClick={() => openProductDetail(product.id)}
                  className="block text-left w-full mb-3"
                >
                  <p className="font-mono-accent text-gold/60 mb-0.5">
                    {product.category}
                  </p>
                  <h3 className="text-base font-semibold text-warm mb-0.5 hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-mono-accent text-muted-warm text-[10px]">
                    {product.spec}
                  </p>
                </button>

                {/* Weight Variants */}
                {product.variants.length > 1 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.weight}
                        onClick={() => handleVariantSelect(product.id, i)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                          selectedIdx === i
                            ? 'bg-gold/20 text-gold border border-gold/40'
                            : 'bg-[#0B0B0C] text-muted-warm border border-[rgba(244,241,234,0.06)]'
                        }`}
                      >
                        {v.weight}
                      </button>
                    ))}
                  </div>
                )}

                {/* Price + Add */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => openProductDetail(product.id)}
                    className="text-base font-semibold text-warm hover:text-gold transition-colors"
                  >
                    ₹{variant.price.toLocaleString('en-IN')}
                  </button>
                  <button
                    onClick={() => addToCart(product, variant)}
                    className="btn-ruby px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
