import { create } from "zustand";

const useStore = create((set) => ({
  products: [],
  likedProducts: [],
  cartItems: [],

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      likedProducts: state.likedProducts.filter((p) => p.id !== id),
      cartItems: state.cartItems.filter((p) => p.id !== id),
    })),

  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      ),
    })),

  toggleLike: (product) =>
    set((state) => {
      const isLiked = state.likedProducts.some((p) => p.id === product.id);
      return {
        likedProducts: isLiked
          ? state.likedProducts.filter((p) => p.id !== product.id)
          : [...state.likedProducts, product],
      };
    }),

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateCartItemQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));

export default useStore;
