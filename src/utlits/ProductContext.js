import React, { createContext, useEffect, useState } from "react";
import { server } from "../Server";

const ProductContext = ({ children }) => {
  const [search, setSearch] = useState('');

  // get user cart
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`${server}cart/user/${localStorage.getItem("user_id")}/`)
      .then((e) => e.json())
      .then((e) => setCart(e));
  }, [cart])

  // get user cart
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState('');
  useEffect(() => {
    // ?date=&status=
    fetch(`${server}users/${localStorage.getItem('user_id')}/orders/?date=${date}&status=${status}`)
      .then((e) => e.json())
      .then((e) => setOrders(e));
  }, [orders, date, status])

  // get all products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${server}products/?q=${search}`)
      .then((e) => e.json())
      .then((e) => setProducts(e));
  }, [products]);


  const [states, setStates] = useState([])
  useEffect(() => {
    fetch(`${server}states/`)
      .then((e) => e.json())
      .then((e) => setStates(e));
  }, [states]);

  const value = {
    products,
    setProducts,
    setSearch,
    cart,
    states,
    orders,
    setDate,
    setStatus,
    date,
    status
  }
  return (
    <ProductContextProvider.Provider value={value}>
      {children}
    </ProductContextProvider.Provider>
  );
};

export default ProductContext;
export const ProductContextProvider = createContext();
