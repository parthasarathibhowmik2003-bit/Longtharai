import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, ProductVariant } from '../data/products';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isAccountOpen: boolean;
  isProductDetailOpen: boolean;
  selectedProductId: string | null;
  accountTab: 'login' | 'signup';
  addToCart: (product: Product, variant: ProductVariant) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  setIsProductDetailOpen: (open: boolean) => void;
  openProductDetail: (productId: string) => void;
  setAccountTab: (tab: 'login' | 'signup') => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [accountTab, setAccountTab] = useState<'login' | 'signup'>('login');

  const addToCart = useCallback((product: Product, variant: ProductVariant) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variant.weight === variant.weight
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variant.weight === variant.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, weight: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant.weight === weight)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const openProductDetail = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setIsProductDetailOpen(true);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isAccountOpen,
        isProductDetailOpen,
        selectedProductId,
        accountTab,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsAccountOpen,
        setIsProductDetailOpen,
        openProductDetail,
        setAccountTab,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
