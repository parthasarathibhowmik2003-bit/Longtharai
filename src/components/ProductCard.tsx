import { useState } from 'react';
import { useApp } from '../store/AppContext';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail } = useApp();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [added, setAdded] = useState(false);

  const handleBuy = () => {
    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card w-[300px] md:w-[340px] p-5">
      {/* Breadcrumb */}
      <p className="font-mono-accent text-gold/70 mb-1">{product.category}</p>

      {/* Title + Wishlist */}
      <div className="flex items-start justify-between">
        <button 
          onClick={() => openProductDetail(product.id)}
          className="text-xl font-semibold text-warm mb-1 text-left hover:text-gold transition-colors"
        >
          {product.name}
        </button>
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`mt-1 transition-colors ${
            inWishlist ? 'text-[#C72C2C]' : 'text-muted-warm hover:text-[#C72C2C]'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Spec */}
      <p className="font-mono-accent text-muted-warm mb-4">{product.spec}</p>

      {/* Hero Product Image - clickable */}
      <button 
        onClick={() => openProductDetail(product.id)}
        className="flex justify-center mb-4 w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-[180px] h-[180px] object-contain animation-float drop-shadow-2xl hover:scale-105 transition-transform"
        />
      </button>

      {/* Weight Variant Selector */}
      {product.variants.length > 1 && (
        <div className="mb-4">
          <p className="font-mono-accent text-muted-warm mb-2">Select Size</p>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((variant) => (
              <button
                key={variant.weight}
                onClick={() => setSelectedVariant(variant)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedVariant.weight === variant.weight
                    ? 'bg-gold/20 text-gold border border-gold/40'
                    : 'bg-[#0B0B0C] text-muted-warm border border-[rgba(244,241,234,0.06)] hover:text-warm'
                }`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price + CTA */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => openProductDetail(product.id)}
          className="text-lg font-semibold text-warm hover:text-gold transition-colors"
        >
          ₹{selectedVariant.price.toLocaleString('en-IN')}
        </button>
        <button
          onClick={handleBuy}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            added ? 'bg-green-600 text-white' : 'btn-ruby'
          }`}
        >
          {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
