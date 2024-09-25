import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("cartItems");
    if (itemsFromStorage) {
      setCartItems(JSON.parse(itemsFromStorage)); 
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  function addItemToCart(item) {
    const itemIndex = cartItems.findIndex((data) => data.id === item.id);
    let updatedCartItems = [...cartItems];
    if (itemIndex === -1) {
      updatedCartItems.push({ ...item, quantity: 1 });
    } else {
      updatedCartItems[itemIndex].quantity++;
    }
    setCartItems(updatedCartItems);
  }

  function lessQuanityFromCart(id) {
    const itemIndex = cartItems.findIndex((data) => data.id === id);
    let updatedCartItems = [...cartItems];
    if (updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity--;
    }
    setCartItems(updatedCartItems);
  }

  function updateToCart(id, type) {
    const itemIndex = cartItems.findIndex((data) => data.id === id);
    let updatedCartItems = [...cartItems];
    if (type === "plus") {
      updatedCartItems[itemIndex].quantity++;
    } else if (type === "minus" && updatedCartItems[itemIndex].quantity > 1) {
      updatedCartItems[itemIndex].quantity--;
    }
    setCartItems(updatedCartItems);
  }

  function removeItemFromCart(id) {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  }

  function isItemAdded(id) {
    return cartItems.find((item) => item.id === id) || null;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        lessQuanityFromCart,
        updateToCart,
        removeItemFromCart,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
