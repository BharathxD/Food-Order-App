import React, { useState } from "react";
import { Header } from "./components/Layout/Header";
import "./App.css";
import { Meals } from "./components/Meals/Meals";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from "./Store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const showCartHandler: () => void = () => {
    setCartIsShown(true);
  };
  const hideCartHandler: () => void = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
