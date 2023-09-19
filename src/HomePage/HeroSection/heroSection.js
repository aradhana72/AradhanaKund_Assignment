import React, { useState } from "react";
import Header from "../Header/Header";
import "./HeroSection.css";
import buyButton from "../Assets/buyButton.png";
import cartIcon from "../Assets/cartIcon.png";
import wishlistButton from "../Assets/wishlistButton.png";
import wishlisted from "../Assets/heartIcon.png";
import { useMyContext } from "../../MyContext";

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState("all");

  const {
    cart,
    updateCart,
    groceries,
    searchResults,
    filteredItems,
    updateFilteredItems,
  } = useMyContext();
  const addToCart = (groceryId) => {
    const checkCart = cart.find((obj) => obj.id === groceryId);

    if (checkCart) {
      updateCart(cart.filter((item) => item.id !== groceryId));
    } else {
      const grocery = groceries.find((obj) => obj.id === groceryId);
      const { id, name, available, img, price } = grocery;
      const groceryToAdd = {
        id,
        name,
        available,
        img,
        price,
        inCart: 1,
        free: 0,
      };
      updateCart([...cart, groceryToAdd]);
    }
  };

  const { wishlist, updateWishlist } = useMyContext();
  const addTowishlist = (groceryId) => {
    const checkwishlist = wishlist.find((obj) => obj.id === groceryId);

    if (checkwishlist) {
      updateWishlist(wishlist.filter((item) => item.id !== groceryId));
    } else {
      const grocery = groceries.find((obj) => obj.id === groceryId);
      const { id, name, available, img, price } = grocery;
      const groceryToAdd = {
        id,
        name,
        available,
        img,
        price,
        inwishlist: 1,
        free: 0,
      };
      updateWishlist([...wishlist, groceryToAdd]);
    }
  };

  const filterItems = (type) => {
    if (type === "all") {
      updateFilteredItems(groceries);
      setIsClicked("all");
    } else {
      updateFilteredItems(groceries.filter((obj) => obj.type === type));
      setIsClicked(type);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="categories-section">
          <button
            onClick={() => filterItems("all")}
            className="categories-button"
            style={
              isClicked === "all"
                ? { backgroundColor: "#474747", color: "#fff" }
                : {}
            }
          >
            All Items
          </button>
          <button
            onClick={() => filterItems("drinks")}
            className="categories-button"
            style={
              isClicked === "drinks"
                ? { backgroundColor: "#474747", color: "#fff" }
                : {}
            }
          >
            Drinks
          </button>
          <button
            onClick={() => filterItems("fruit")}
            className="categories-button"
            style={
              isClicked === "fruit"
                ? { backgroundColor: "#474747", color: "#fff" }
                : {}
            }
          >
            Fruits
          </button>
          <button
            onClick={() => filterItems("bakery")}
            className="categories-button"
            style={
              isClicked === "bakery"
                ? { backgroundColor: "#474747", color: "#fff" }
                : {}
            }
          >
            Bakery
          </button>
        </div>

        <div className="card-section">
          <h2>Trending Items</h2>
          <div className="cards-row">
            {searchResults.map((grocery) => {
              return (
                <div className="item-card" key={grocery.id}>
                  <div className="card">
                    <div className="cover-image-div">
                      <img src={grocery.img} className="card-image" />
                    </div>
                    <div className="item-description">
                      <h3>{grocery.name}</h3>
                      <p className="long-text">{grocery.description}</p>
                      {grocery.available < 10 ? (
                        <div className="item-left">
                          Only {grocery.available} left
                        </div>
                      ) : (
                        <div className="item-available">Available</div>
                      )}

                      <div className="card-footer">
                        <div className="item-price">{grocery.price}</div>
                        <div className="flex-icons">
                          <img
                            onClick={() => addToCart(grocery.id)}
                            className="card-icon"
                            src={
                              cart.find((obj) => obj.id === grocery.id)
                                ? cartIcon
                                : buyButton
                            }
                          />

                          <img
                            className="card-icon"
                            onClick={() => addTowishlist(grocery.id)}
                            src={
                              wishlist.find((obj) => obj.id === grocery.id)
                                ? wishlisted
                                : wishlistButton
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
