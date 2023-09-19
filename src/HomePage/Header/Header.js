import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import heartIcon from "../Assets/heartIcon.png";
import cartIcon from "../Assets/cartIcon.png";
import avatar from "../Assets/avatar.png";
import { useMyContext } from "../../MyContext";

const Header = () => {
  const navigate = useNavigate();
  const {
    cart,
    wishlist,
    groceries,
    searchResults,
    updatesearchResults,
    filteredItems,
  } = useMyContext();

  const [searchQuery, setSearchQuery] = useState("");

  const goToCheckout = () => {
    navigate("/checkout");
  };

  const goToHomepage = () => {
    navigate("/");
  };

  const goToWishlist = () => {
    navigate("/wishlist");
  };

  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter groceries based on the search query
    const filteredSearchResults = filteredItems.filter((grocery) =>
      grocery.name.toLowerCase().includes(query)
    );

    updatesearchResults(filteredSearchResults);
  };

  return (
    <div className="header">
      <div className="company-name" onClick={goToHomepage}>
        GROCERIES
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className="icons">
        <img className="icon" src={heartIcon} onClick={goToWishlist} />
        {wishlist.length ? (
          <span className="wishlist-value">{wishlist.length}</span>
        ) : (
          ""
        )}
        <img className="icon-avatar" src={avatar} />
        <img className="icon" src={cartIcon} onClick={goToCheckout} />
        {cart.length ? <span className="cart-value">{cart.length}</span> : ""}
      </div>
    </div>
  );
};

export default Header;
