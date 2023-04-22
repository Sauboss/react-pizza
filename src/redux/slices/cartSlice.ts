import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItemsProps = {
  id:string;
  title:string;
  price:number;
  imageUrl:string;
  type:string;
  size:number;
  count:number;
}



interface CartSliceState {
  totalPrice: number;
  items: CartItemsProps[]
}

const {items, totalPrice} = getCartFromLS()

const initialState:CartSliceState = {
  items,
  totalPrice
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItemsProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id);
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
