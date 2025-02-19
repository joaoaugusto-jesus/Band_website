import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cart: [],
    
    addToCart: (item) =>
        set((state) => {
          console.log("Adding item to cart:", item); // Debugging log
          const existingItem = state.cart.find(
            (i) => i.id === item.id && i.size === item.size 
          );
      
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size 
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,  // Update quantity
                      totalPrice: (i.quantity + item.quantity) * i.price,
                       // Update totalPrice
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
                  totalPrice: item.quantity * item.price, 
                  alt: item.alt,
                  src: item.src // Set totalPrice correctly
                },
              ],
            };
          }
        }),
      

    removeFromCart: (id, size) =>
        set((state) => ({
            cart: state.cart.filter((item) => !(item.id === id && item.size === size)),
        })),

    clearCart: () => set({ cart: [] }),

    totalCartPrice: () => {
        return get().cart.reduce((total, item) => total + item.totalPrice, 0); // Correctly sum up totalPrice
    },
}));
