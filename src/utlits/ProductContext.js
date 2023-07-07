import React, { createContext, useEffect, useState } from "react";
import { server } from "../Server";

const ProductContext = ({ children }) => {
  const user_id = localStorage.getItem('user_id')
  // get user cart
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      fetch(`${server}cart/user/${localStorage.getItem("user_id")}/`)
        .then((e) => e.json())
        .then((e) => setCart(e));
      }
    }, [cart, user_id])
    
    // get user cart
    const [orders, setOrders] = useState([]);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    useEffect(() => {
      // ?date=&status=
      if (localStorage.getItem('user_id')) {
        fetch(`${server}users/${localStorage.getItem('user_id')}/orders/?date=${date}&status=${status}`)
        .then((e) => e.json())
        .then((e) => setOrders(e));
      }
    }, [date, status, user_id])
    
    // get all products
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  useEffect(() => {
    fetch(`${server}products/?q=${search}&category=${category}&min_sell_price=${minPrice}&max_sell_price=${maxPrice}`)
      .then((e) => e.json())
      .then((e) => setProducts(e));
  }, [search, category, minPrice, maxPrice]);


  const [states, setStates] = useState([])
  useEffect(() => {
    fetch(`${server}states/`)
      .then((e) => e.json())
      .then((e) => setStates(e));
  }, [states]);


  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch(`${server}categories/`)
      .then((e) => e.json())
      .then((e) => setCategories(e));
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
    status,
    setCategory,
    category,
    setCategories,
    categories,
    setMinPrice,
    setMaxPrice
  }
  return (
    <ProductContextProvider.Provider value={value}>
      {children}
    </ProductContextProvider.Provider>
  );
};

export default ProductContext;
export const ProductContextProvider = createContext();
