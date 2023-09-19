import React from "react";
import Header from "../HomePage/Header/Header";
import "./WishlistPage.css";
import { useMyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, updateWishlist, groceries } = useMyContext();
  const navigate = useNavigate();
  const changeWishlistValue = (groceryIdx, action) => {
    if (action === "DELETE") {
      updateWishlist(wishlist.filter((_, i) => i !== groceryIdx));
    }
  };

  const getNumberFromPriceString = (price) => {
    const priceString = price.replace("£", "");
    return parseFloat(priceString).toFixed(2);
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div>
        <br></br>
        <h2>Wishlist</h2>
        {wishlist.map((item, idx) => {
          return (
            <div className="checkout-card" key={item.id}>
              <div className="item-details">
                <img className="thumbnail" src={item.img} />
                <div>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-id">Product code: {item.id}</p>
                </div>
              </div>
              <div className="item-price">
                £{getNumberFromPriceString(item.price)}
              </div>
              <div className="remove-item">
                <span
                  onClick={() => changeWishlistValue(idx, "DELETE")}
                  className="item-remove-wishlist"
                >
                  x
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WishlistPage;
