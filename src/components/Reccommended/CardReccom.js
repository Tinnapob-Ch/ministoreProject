import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CardReccom.css'

function CardReccom() {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/sneakers');
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  // Filter products by specific names
  const specificProducts = productData.filter(product =>
    ['Air Jordan 1 Low SE','Nike Air Max 1 SE','Nike Air Force 1 LV8 5'].includes(product.name)
  );

  return (
    <section className="card-rec">
      <div className="card-container-rec">
        {specificProducts.map(product => (
          <div key={product.id} className="product-rec">
            <img src={product.image} alt={product.name} className="product-image-rec" />
            <div className="product-details-rec">
              <h3 className="product-title-rec">{product.name}</h3>
              {/* <p className="product-type">{product.type}</p>
              <p className="product-price">${product.price}</p> */}
              {/* <p className="product-category">Category: {product.category}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardReccom;
