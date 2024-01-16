import { createContext, useContext, useEffect, useState } from "react";

const ShoppingContext = createContext({});

const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

const ShoppingContextProvide = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const jsonCartData = localStorage.getItem("shopping_cart");
    return jsonCartData ? JSON.parse(jsonCartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  const increaseQty = (ID) => {
    console.log("increaseQty=> ", ID);
    const currentCartItem = cartItems.find((item) => item.ID === ID);
    if (currentCartItem) {
      const newItems = cartItems.map((item) => {
        if (item.ID === ID) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      setCartItems(newItems);
    }
  };

  const decreaseQty = (ID) => {
    console.log("decreaseQty=> ", ID);
    const currentCartItem = cartItems.find((item) => item.ID === ID);
    if (currentCartItem) {
      if (currentCartItem.qty === 1) {
        removeCartItem(ID);
      } else {
        const newItems = cartItems.map((item) => {
          if (item.ID === ID) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      }
    }
  };

  const addCartItem = (product) => {
    console.log(">> check product: ", product);

    if (product) {
      const currentCartItem = cartItems.find((item) => item.ID === product.ID);
      if (currentCartItem) {
        const newItems = cartItems.map((item) => {
          if (item.ID === product.ID) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      } else {
        const newItem = { ...product, qty: 1 };

        const newCartItems = [...cartItems, newItem];
        console.log(">> newCartItems: ", newCartItems);
        setCartItems(newCartItems);
      }
    }
  };

  const removeCartItem = (ID) => {
    const newItems = cartItems.filter((item) => item.ID !== ID);
    setCartItems(newItems);
  };

  const clearCart = () => {
    console.log("clear cart");
    setCartItems([]);
    localStorage.removeItem("shopping_cart");
  };
  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        cartQty,
        totalPrice,
        increaseQty,
        decreaseQty,
        addCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export { ShoppingContext, ShoppingContextProvide, useShoppingContext };
