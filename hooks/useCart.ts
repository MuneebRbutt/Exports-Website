import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === newItem.id);
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      },
    }),
    { name: 'meharstare-cart' }
  )
);
