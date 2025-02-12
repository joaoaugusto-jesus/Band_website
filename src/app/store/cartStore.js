import { create } from 'zustand';

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (item) =>
        set((state) => {
            const existingItem = state.cart.find((i) => i.id === item.id && i.size === item.size);
            if (existingItem) {
                return {
                    cart: state.cart.map((i) =>
                        i.id === item.id && i.size === item.size
                            ? { ...i, quantity: i.quantity + item.quantity }
                            : i
                    ),
                };
            } else {
                return { cart: [...state.cart, { ...item, quantity: item.quantity }] };
            }
        }),
    removeFromCart: (id, size) =>
        set((state) => ({
            cart: state.cart.filter((item) => !(item.id === id && item.size === size)),
        })),
    clearCart: () => set({ cart: [] }),
}));
