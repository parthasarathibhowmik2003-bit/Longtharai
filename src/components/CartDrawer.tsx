import { useApp } from '../store/AppContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#141414] border-l border-[rgba(244,241,234,0.08)] z-[201] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(244,241,234,0.08)]">
          <h2 className="text-lg font-semibold text-warm">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-muted-warm hover:text-warm transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-warm mb-4">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-muted-warm text-sm">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-gold text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.weight}`}
                  className="flex gap-4 bg-[#0B0B0C] rounded-xl p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-[#141414]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-warm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-warm mt-0.5">
                      {item.variant.weight}
                    </p>
                    <p className="text-sm font-semibold text-gold mt-1">
                      ₹{item.variant.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.variant.weight)
                      }
                      className="text-muted-warm hover:text-[#C72C2C] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.variant.weight,
                            item.quantity - 1
                          )
                        }
                        className="w-6 h-6 rounded-md bg-[#141414] text-warm text-xs flex items-center justify-center hover:bg-[#1a1a1a]"
                      >
                        -
                      </button>
                      <span className="text-sm text-warm w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.variant.weight,
                            item.quantity + 1
                          )
                        }
                        className="w-6 h-6 rounded-md bg-[#141414] text-warm text-xs flex items-center justify-center hover:bg-[#1a1a1a]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[rgba(244,241,234,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-warm text-sm">Subtotal</span>
              <span className="text-lg font-semibold text-warm">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <button className="w-full btn-ruby py-3 rounded-xl text-sm font-semibold">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
