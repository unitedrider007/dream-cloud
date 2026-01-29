import { create } from 'zustand';
import { Product, MOCK_PRODUCTS, Review } from './firebase';

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
  setAdmin: (status: boolean) => void;
  currentUser: string | null;
  setUser: (user: string | null) => void;
  firstOrderDiscount: boolean;
  setFirstOrderDiscount: (status: boolean) => void;
  addReview: (productId: string, review: Review) => void;
  replyToReview: (productId: string, reviewId: string, response: string) => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  products: MOCK_PRODUCTS,
  darkMode: false,
  
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    cart: state.cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    })
  })),

  clearCart: () => set({ cart: [] }),

  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { darkMode: newMode };
  }),

  isAdmin: false,
  setAdmin: (status) => set({ isAdmin: status }),

  currentUser: null,
  setUser: (user) => set({ currentUser: user }),

  firstOrderDiscount: false,
  setFirstOrderDiscount: (status) => set({ firstOrderDiscount: status }),

  addReview: (productId, review) => set((state) => ({
    products: state.products.map(p => 
      p.id === productId 
        ? { ...p, reviews: [review, ...p.reviews] }
        : p
    )
  })),

  replyToReview: (productId, reviewId, response) => set((state) => ({
    products: state.products.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            reviews: p.reviews.map(r => 
              r.id === reviewId ? { ...r, adminResponse: response } : r
            ) 
          }
        : p
    )
  }))
}));