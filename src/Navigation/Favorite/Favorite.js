import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorite.css';

function Favorite() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const storedLikedProducts = JSON.parse(localStorage.getItem("likedProducts"));
    if (storedLikedProducts) {
      setLikedProducts(storedLikedProducts);
    }
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/sneakers');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleLike = (productId) => {
    // อาจจะต้องทำการ toggle สถานะ liked ใน localStorage หรือทำการอัปเดตข้อมูลใน productData ตามต้องการ
  };

  const handleAddToCart = (productId) => {
    // Add logic to add product to cart
    console.log('Adding product to cart with ID:', productId);
  };

  const handleClearFavorite = (productId) => {
    const updatedLikedProducts = likedProducts.filter(id => id !== productId);
    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  return (
    <div className='container-fav'>
        <h2 className="fav-title">Favorite Products</h2>
        {likedProducts.length === 0 && <p className="fav-de">There are no favorite products.</p>}
      <section className="cards-fav">
        <div className="card-container">
          {productData.map(product => (
            likedProducts.includes(product.id) &&
            <div key={product.id} className="card">
              <div className="product">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title-fav">{product.name}</h3>
                  <p className="product-type">{product.type}</p>
                  <p className="product-price">Baht {product.price}</p>
                  <div className="btn-container">
                    <button onClick={() => handleClearFavorite(product.id)}>Clear Favorite</button>
                    {/* You can add more buttons or functionality here */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Favorite;
