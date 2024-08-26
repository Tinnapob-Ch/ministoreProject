import React, { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Nav.css";
import Search from "../components/Search";

function Nav() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const handleFavoriteClick = () => {
    const productId = "product_id"; // ตัวอย่างเท่านั้น คุณต้องแทนที่ด้วย ID ของสินค้าที่คลิก
    const isFavorite = favorites.includes(productId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((id) => id !== productId);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, productId];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <nav>
      <div className="nav-container">
        <img src="https://shorturl.at/DR019" alt="logo" />
        <div className="nav-search">
          <Search />
        </div>
      </div>
      <div className="profile-container">
        <Link to="/" className="home-link">
          Home
        </Link>

        <div className="dropdown">
          <Link to="/store" className="store-link">
            Store
          </Link>
          <div className="dropdown-content">
            <Link to="/AirJordan" className="store-link">
              Nike Air Jordan
            </Link>
            <Link to="/AirMax" className="store-link">
              Nike Air Max
            </Link>
            <Link to="/AirForce" className="store-link">
              Nike Air Force
            </Link>
          </div>
        </div>
        <Link to="/about" className="about-link">
          About
        </Link>

        <Link to="/favorite" onClick={handleFavoriteClick}>
          <FiHeart className="nav-icons" />
        </Link>
        <Link to="/cart">
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>
        <Link to="/Member">
          <AiOutlineUserAdd className="nav-icons" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
