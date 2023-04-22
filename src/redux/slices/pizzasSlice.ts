import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

type FetchPizzasArgs = {
  category:string;
  search:string;
  currentPage:number;
  sort:Sort;
}
type PizzaItem = {
  id:string;
title:string;
price:number;
imageUrl:string;
types:number[];
sizes:number[];
rating: number;
}

interface PizzaSliceState {
items:PizzaItem[] ;
status: 'loading' | 'success' | 'error';
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async ({ category, search, currentPage, sort }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://63d81502afbba6b7c94a4d2b.mockapi.io/items?page=${currentPage}${search}&limit=4&${
        category > '0' ? `category=${category}` : ''
      }&sortBy=${sort.sortProperty}&order=desc`,
    );
    return data;
  },
);

const initialState:PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizza = (state:RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
