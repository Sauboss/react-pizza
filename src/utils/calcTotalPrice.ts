import React from 'react'
import { CartItemsProps } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items:CartItemsProps[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
}
