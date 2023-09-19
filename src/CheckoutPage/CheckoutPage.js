import React, { useState, useEffect } from "react";
import Header from "../HomePage/Header/Header";
import "./CheckoutPage.css";
import { useMyContext } from "../MyContext";

const CheckoutPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [inCartFreeCoffee, setinCartFreeCoffee] = useState(0);
  const [isFreeCoke, setFreeCoke] = useState(false);
  const { cart, updateCart, groceries } = useMyContext();

  const groceryItem = (groceryId, inCartFreeCoffee) => {
    const grocery = groceries.find((obj) => obj.id === groceryId);
    const { id, name, available, img, price } = grocery;
    const groceryToAdd = {
      id,
      name,
      available,
      img,
      price,
      inCart: 0,
      free: 1,
    };
    return groceryToAdd;
  };

  useEffect(() => {
    // update subtotal
    let subTotalPrice = 0;
    let totalPrice = 0;
    let totalDiscount = 0;
    for (const obj of cart) {
      const priceString = obj.price.replace("£", "");
      subTotalPrice =
        totalPrice + parseFloat(priceString) * (obj.inCart + obj.free);
      totalDiscount = totalDiscount + parseFloat(priceString) * obj.free;
      totalPrice = totalPrice + parseFloat(priceString) * obj.inCart;

      if (obj.id === 532 && obj.name === "Croissants")
        setinCartFreeCoffee(parseInt(obj.inCart / 3));

      if (obj.id === 642 && obj.name === "Coca-Cola" && obj.inCart >= 6)
        setFreeCoke(true);
      else if (obj.id === 642 && obj.name === "Coca-Cola" && obj.inCart < 6)
        setFreeCoke(false);
    }

    setSubTotal(subTotalPrice.toFixed(2));
    setDiscount(totalDiscount.toFixed(2));
    setTotal(totalPrice.toFixed(2));
  }, [JSON.stringify(cart)]);

  // conditions for Coffee offer on Croissants
  useEffect(() => {
    const checkCoffeeId = findIndexByGroceryId(cart, 641); // Coffee

    if (checkCoffeeId != -1) {
      const newCart = cart.slice();
      newCart[checkCoffeeId]["free"] = inCartFreeCoffee;

      // check if no free and in cart is available for coffee now
      if (
        newCart[checkCoffeeId]["free"] === 0 &&
        newCart[checkCoffeeId]["inCart"] === 0
      ) {
        updateCart(cart.filter((_, i) => i !== checkCoffeeId));
      } else {
        const { free, inCart, available } = newCart[checkCoffeeId];
        if (free + inCart > available) {
          const extraInCart = inCart + free - available;
          newCart[checkCoffeeId]["inCart"] -= extraInCart;
        }
        updateCart(newCart);
      }
    } else if (inCartFreeCoffee > 0 && groceries.length > 0) {
      const coffeePayload = groceryItem(641, inCartFreeCoffee);
      updateCart([...cart, coffeePayload]);
    }
  }, [inCartFreeCoffee, groceries]);

  // condition for Coca-Cola offer
  useEffect(() => {
    const checkColaId = findIndexByGroceryId(cart, 642); // Coca-Cola

    if (checkColaId != -1) {
      const newCart = cart.slice();
      if (isFreeCoke) {
        newCart[checkColaId]["free"] = 1;
        const { free, inCart, available } = newCart[checkColaId];
        if (free + inCart > available) {
          const extraInCart = inCart + free - available;
          newCart[checkColaId]["inCart"] -= extraInCart;
        }
      } else {
        newCart[checkColaId]["free"] = 0;
      }

      updateCart(newCart);
    }
  }, [isFreeCoke]);

  function findIndexByGroceryId(arrayOfObjects, idToFind) {
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].id === idToFind) {
        return i;
      }
    }
    return -1; // Return -1 if no match is found
  }

  const changeCartValue = (groceryIdx, action) => {
    const newCart = cart.slice();

    if (
      action === "ADD" &&
      cart[groceryIdx]["available"] >
        cart[groceryIdx]["inCart"] + cart[groceryIdx]["free"]
    ) {
      newCart[groceryIdx]["inCart"] += 1;
      updateCart(newCart);
    }
    if (action === "REMOVE" && cart[groceryIdx]["inCart"] > 0) {
      newCart[groceryIdx]["inCart"] -= 1;
      updateCart(newCart);
    }

    if (action === "DELETE") {
      if (cart[groceryIdx]["id"] === 532) {
        setinCartFreeCoffee(0);
      }
      updateCart(cart.filter((_, i) => i !== groceryIdx));
    }
  };

  const getNumberFromPriceString = (price) => {
    const priceString = price.replace("£", "");
    return parseFloat(priceString).toFixed(2);
  };

  return (
    <>
      <Header />
      <div>
        <br></br>
        <h2>Checkout</h2>
        {cart.map((item, idx) => {
          return (
            <div className="checkout-card" key={item.id}>
              <div className="item-details">
                <img className="thumbnail" src={item.img} />
                <div>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-id">Product code: {item.id}</p>
                </div>
              </div>
              <div className="item-quantity">
                <div className="item-number">
                  <span
                    onClick={() => changeCartValue(idx, "REMOVE")}
                    className="item-dec"
                  >
                    −
                  </span>
                  <span>{item.inCart + item.free}</span>
                  <span
                    onClick={() => changeCartValue(idx, "ADD")}
                    className="item-inc"
                  >
                    +
                  </span>
                </div>
                {item.available - item.inCart - item.free < 10 ? (
                  <div className="item-left-cart">
                    Only {item.available - item.inCart - item.free} left
                  </div>
                ) : (
                  ""
                )}
                <>
                  {item.id === 532 && inCartFreeCoffee > 0 ? (
                    <div className="offer-text">Free Coffee !</div>
                  ) : (
                    ""
                  )}
                  {item.id === 642 && isFreeCoke > 0 ? (
                    <div className="offer-text">Free Coca Cola !</div>
                  ) : (
                    ""
                  )}
                </>
              </div>
              <div className="item-price">
                £
                {(getNumberFromPriceString(item.price) * item.inCart).toFixed(
                  2
                )}
              </div>
              <div className="remove-item">
                <span
                  onClick={() => changeCartValue(idx, "DELETE")}
                  className="item-inc"
                >
                  x
                </span>
              </div>
            </div>
          );
        })}

        {cart.length > 0 && (
          <div className="total-price">
            <hr className="horizontal-rule"></hr>
            <div className="item-center">
              <h4 className="text-dark">Subtotal</h4>
              <h4 className="text-light">£ {subTotal}</h4>
            </div>
            <hr className="horizontal-rule"></hr>
            <div className="item-center">
              <h4 className="text-dark">Discount</h4>
              <h4 className="text-light">£ {discount}</h4>
            </div>
            <hr className="horizontal-rule"></hr>
            <div className="item-center">
              <h4 className="text-dark" style={{ marginLeft: "28px" }}>
                Total
              </h4>
              <h4 className="text-light">£ {total}</h4>
              <button className="checkout-button">Checkout</button>
            </div>
            <hr className="horizontal-rule"></hr>
            <div className="item-center">
              <button className="checkout-button-mobile">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
