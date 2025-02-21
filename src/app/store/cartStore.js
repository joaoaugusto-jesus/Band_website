import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (item, userId) =>
    set((state) => {
      console.log("Adding item to cart:", item); // Debugging log
      const existingItem = state.cart.find(
        (i) => i.id === item.id && i.size === item.size && i.userId === userId
      );

      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id && i.size === item.size && i.userId === userId
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity, // Update quantity
                  totalPrice: (i.quantity + item.quantity) * i.price, // Update totalPrice
                }
              : i
          ),
        };
      } else {
        return {
          cart: [
            ...state.cart,
            {
              ...item,
              userId,
              type: item.type || "product",
              totalPrice: item.quantity * item.price,
              alt: item.alt,
              src: item.src,
              name: item.name,
            },
          ],
        };
      }
    }),

  removeFromCart: (id, size,  userId) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) => {
          if (item.id === id && item.size === size && item.userId === userId) {
            const newQuantity = item.quantity - 1;

            if (newQuantity > 0) {
              return {
                ...item,
                quantity: newQuantity,
                totalPrice: newQuantity * item.price,
              };
            } else {
              return null; // Mark item for removal
            }
          }
          return item;
        })
        .filter(Boolean); // Remove null values

      return { cart: updatedCart };
    }),

  clearCart: () => set({ cart: [] }),

  totalCartPrice: () => {
    return get().cart.reduce((total, item) => total + item.totalPrice, 0);
  },
}));