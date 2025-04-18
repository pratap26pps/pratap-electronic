'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/redux/slices/cartSlice";

const CartInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());  
  }, []);

  return null; 
};

export default CartInit;
