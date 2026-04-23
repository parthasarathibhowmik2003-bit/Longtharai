import { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { getProductById, getRelatedProducts } from '../data/products';

export default function ProductDetail() {
  const {
    isProductDetailOpen,
    setIsProductDetailOpen,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail,
  } = useApp();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const product = selectedProductId ? getProductById(selectedProductId) : null;
  const related = product ? getRelatedProducts(product, 4) : [];

  useEffect(() => {
    if (isProductDetailOpen) {
      setSelectedVariantIdx(0);
      setAdded(false);
    }
  }, [isProductDetailOpen, selectedProductId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProductDetailOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsProductDetailOpen]);

  if (!isProductDetailOpen || !product) return null;

  const variant = product.variants[selectedVariantIdx];
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleRelatedClick = (relatedId: string) => {
    openProductDetail(relatedId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm"
        onClick={() => setIsProductDetailOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[92vh] bg-[#141414] rounded-2xl border border-[rgba(244,241,234,0.08)] z-[201] overflow-y-auto">
        {/* Close */}
        <button
          onClick={() => setIsProductDetailOpen(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0B0B0C]/80 flex items-center justify-center text-muted-warm hover:text-warm transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Image */}
          <div className="relative bg-[#0B0B0C] flex items-center justify-center p-8 md:p-12">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-[280px] object-contain drop-shadow-2xl"
            />
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="font-mono-accent text-gold text-[10px] bg-gold/10 px-3 py-1.5 rounded-lg border border-gold/20">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right - Details */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-warm mb-1">
              {product.name}
            </h2>
            <p className="font-mono-accent text-muted-warm mb-4">{product.spec}</p>

            {/* Price */}
            <p className="text-3xl font-semibold text-gold mb-6">
              ₹{variant.price.toLocaleString('en-IN')}
              <span className="text-sm text-muted-warm font-normal ml-2">
                for {variant.weight}
              </span>
            </p>

            {/* Weight Selector */}
            <div className="mb-6">
              <p className="font-mono-accent text-muted-warm mb-3">SELECT SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariantIdx(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedVariantIdx === i
                        ? 'bg-gold/20 text-gold border border-gold/40'
                        : 'bg-[#0B0B0C] text-muted-warm border border-[rgba(244,241,234,0.06)] hover:text-warm'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  added ? 'bg-green-600 text-white' : 'btn-ruby'
                }`}
              >
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                  inWishlist
                    ? 'bg-[#C72C2C]/20 border-[#C72C2C]/40 text-[#C72C2C]'
                    : 'bg-[#0B0B0C] border-[rgba(244,241,234,0.06)] text-muted-warm hover:text-[#C72C2C]'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-[rgba(244,241,234,0.06)] pt-6">
              <p className="font-mono-accent text-gold text-[10px] mb-3">PRODUCT DETAILS</p>
              <ul className="space-y-2 text-sm text-muted-warm">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  100% pure and authentic Indian {product.category.toLowerCase()}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Sourced directly from local farmers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Manufactured at Longtharai facility, Agartala
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  No artificial colours or preservatives
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  Hygienically packed for maximum freshness
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="border-t border-[rgba(244,241,234,0.06)] p-6 md:p-8">
            <p className="font-mono-accent text-gold text-[10px] mb-4">YOU MAY ALSO LIKE</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => handleRelatedClick(rp.id)}
                  className="bg-[#0B0B0C] rounded-xl p-4 text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full aspect-square object-contain mb-3"
                  />
                  <p className="text-xs text-gold/60 mb-0.5">{rp.category}</p>
                  <p className="text-sm font-medium text-warm truncate">{rp.name}</p>
                  <p className="text-sm text-gold mt-1">
                    ₹{rp.variants[0].price.toLocaleString('en-IN')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
