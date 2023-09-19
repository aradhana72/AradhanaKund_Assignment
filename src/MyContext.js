import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "./api/product";
const MyContext = createContext();

export function MyProvider({ children }) {
  const [groceries, setGroceries] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const storedData = localStorage.getItem("wishlist");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cart, setCart] = useState(() => {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Update localStorage whenever 'cart' changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Update localStorage whenever 'wishlist' changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const updateCart = (newData) => {
    setCart(newData);
  };

  const updateWishlist = (newData) => {
    setWishlist(newData);
  };

  useEffect(() => {
    getProducts()
      .then((response) => {
        setGroceries(response);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching groceries:", error);
      });
  }, []);

  const [filteredItems, setFilteredItems] = useState(groceries);

  const updateFilteredItems = (newData) => {
    setFilteredItems(newData);
  };

  useEffect(() => {
    setFilteredItems(groceries);
  }, [groceries]);

  const [searchResults, setsearchResults] = useState(filteredItems);

  const updatesearchResults = (newData) => {
    setsearchResults(newData);
  };

  useEffect(() => {
    setsearchResults(filteredItems);
  }, [filteredItems]);
  return (
    <MyContext.Provider
      value={{
        cart,
        updateCart,
        wishlist,
        updateWishlist,
        searchResults,
        updatesearchResults,
        filteredItems,
        updateFilteredItems,
        groceries,
        setGroceries,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
