import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AirJodan() {
  const [productData, setProductData] = useState(null);
  const [likedProducts, setLikedProducts] = useState(() => {
    const storedLikedProducts = localStorage.getItem('likedProducts');
    return storedLikedProducts ? JSON.parse(storedLikedProducts) : [];
  });
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCartProducts = localStorage.getItem('cartProducts');
    return storedCartProducts ? JSON.parse(storedCartProducts) : [];
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7137/api/sneakers');
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleAddToCart = (productId) => {
    if (!cartProducts.includes(productId)) {
      setCartProducts(prevCartProducts => [...prevCartProducts, productId]);
    }
  };

  const handleLike = (productId) => {
    setLikedProducts(prevLikedProducts => {
      if (prevLikedProducts.includes(productId)) {
        return prevLikedProducts.filter(id => id !== productId);
      } else {
        return [...prevLikedProducts, productId];
      }
    });
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-force'>
    <section className="cards">
    <h2 className="title-store">Air Jordan</h2>
      <div className="card-container">
      {/* <h2 className="title-store">Products</h2> */}
        {productData
          .filter(product => product.name.toLowerCase().includes('jordan')) // กรองข้อมูลเฉพาะที่มีคำว่า "Jordan"
          .map(product => (
            <div key={product.id} className="card">
              <div className="product">
                <button className={`btn like-btn ${likedProducts.includes(product.id) ? 'active' : ''}`} onClick={() => handleLike(product.id)}>❤</button>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-type">{product.type}</p>
                  <p className="product-price">Baht {product.price}</p>
                  <div className="btn-container">
                    <button className="btn add-to-cart-btn" onClick={() => handleAddToCart(product.id)}>
                      {cartProducts.includes(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
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

export default AirJodan;
