// Cart.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";
import Calculator from "../components/Calculator";

function Cart() {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCartProducts = localStorage.getItem("cartProducts");
    return storedCartProducts ? JSON.parse(storedCartProducts) : [];
  });
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productCounts, setProductCounts] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7137/api/sneakers");
      if (response.data) {
        setProductData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [cartProducts, productData]);

  useEffect(() => {
    countProductsInCart();
  }, [cartProducts]);

  const countProductsInCart = () => {
    const counts = {};
    cartProducts.forEach((productId) => {
      counts[productId] = counts[productId] ? counts[productId] + 1 : 1;
    });
    setProductCounts(counts);
  };

  const handleRemoveFromCart = (productId) => {
    setCartProducts((prevCartProducts) =>
      prevCartProducts.filter((id) => id !== productId)
    );
  };

  const cartProductDetails = getCartProductDetails();

  function getCartProductDetails() {
    return productData.filter((product) => cartProducts.includes(product.id));
  }

  function calculateTotalPrice() {
    return cartProductDetails.reduce(
      (total, product) => total + product.price,
      0
    );
  }

  return (
    <section className="container-cart">
      <h2 className="cart-title">In Your Cart</h2>
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <div>
          {cartProductDetails.length === 0 ? (
            <p className="cart-de">There are no products in your cart.</p>
          ) : (
            <div className="cart-items">
              {cartProductDetails.map((product) => (
                <div key={product.id} className="cart-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image-cart"
                  />
                  <div className="product-details-cart">
                    <h3 className="product-title-cart">{product.name}</h3>
                    <p className="product-type-cart">{product.type}</p>
                    <p className="product-price-cart">
                      Price : {product.price.toFixed(2)} Baht
                    </p>
                    <p className="product-count-cart">
                      Amount : {productCounts[product.id]}
                    </p>
                    <div className="btn-container">
                      <button
                        className="remove-from-cart-btn"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
    
          <Calculator totalPrice={totalPrice} />{" "}
      
        </div>
      )}
    </section>
  );
}

export default Cart;






