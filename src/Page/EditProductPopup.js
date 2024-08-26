import React, { useState, useEffect } from "react";
import "./EditProductPopup.css"; // เพิ่มไฟล์ CSS สำหรับ Popup

function EditProductPopup({ onClose, onUpdate, editProduct }) {
  const [product, setProduct] = useState(editProduct);

  useEffect(() => {
    setProduct(editProduct);
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(product);
    onClose();
  };

  return (
    <div className="popup-container">
      <button className="close-btn-add" onClick={onClose}>
        × {/* ใส่ไอคอนกากบาท */}
      </button>
      <div className="popup-edit-context">
        <h2>Edit Product</h2>
      <div className="popup-edit-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name :
            <input className="detail-edit-name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Type :
            <input className="detail-edit-type"
              type="text"
              name="type"
              value={product.type}
              onChange={handleChange}
            />
          </label>
          <label>
            Price :
            <input className="detail-edit-price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Image :
            <input className="detail-edit-image"
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
          </label>
          <button className="submit-edit">Save</button>
        </form>
      </div>
      
      </div>
      
    </div>
  );
}

export default EditProductPopup;
