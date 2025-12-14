import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice += newItem.price * (newItem.quantity || 1);
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
          image: newItem.image,
        });
      }

      // إعادة حساب totalQuantity و totalPrice دائمًا من المنتجات
      state.totalQuantity = state.products.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.products.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    removeFromCart(state, action) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      state.totalQuantity = state.products.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.products.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    increaseQuantity(state, action) {
      const item = state.products.find((i) => i.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity = state.products.reduce(
          (sum, i) => sum + i.quantity,
          0
        );
        state.totalPrice = state.products.reduce(
          (sum, i) => sum + i.totalPrice,
          0
        );
      }
    },

    decreaseQuantity(state, action) {
      const item = state.products.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity = state.products.reduce(
          (sum, i) => sum + i.quantity,
          0
        );
        state.totalPrice = state.products.reduce(
          (sum, i) => sum + i.totalPrice,
          0
        );
      } else {
        alert(
          "Quantity cannot be less than 1, To remove the item, please use the delete option."
        );
      }
    },
  },
});

export const { removeFromCart, addToCart, decreaseQuantity, increaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
