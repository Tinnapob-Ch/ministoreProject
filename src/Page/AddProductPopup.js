import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddProductPopup.css";

function AddSneakerPopup({ onClose }) {
  const [sneakerData, setSneakerData] = useState({
    ID: "",
    Name: "",
    Price: "",
    Category: "",
    Type: "",
    Image: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://localhost:7137/api/sneakers");
        console.log("Initial sneaker data:", response.data);
      } catch (error) {
        console.error("Error fetching initial sneaker data:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSneakerData({ ...sneakerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7137/api/sneakers", sneakerData);
      console.log("Sneaker data sent:", sneakerData);
      setSneakerData({
        ID: "",
        Name: "",
        Price: "",
        Category: "",
        Type: "",
        Image: ""
      });
      onClose(); // ปิด Popup เมื่อสำเร็จ
    } catch (error) {
      console.error("Error adding sneaker:", error);
    }
  };

  return (
    <div className="popup-add">
      <button className="close-btn-add" onClick={onClose}>
        × {/* ใส่ไอคอนกากบาท */}
      </button>
      <div className="popup-add-context">
        <h2>Add New Product</h2>
        <div className="container-add">
          <div className="popup-add-form">
            <form onSubmit={handleSubmit}>
              <label>
                ID :
                <input
                  className="detail-add-id"
                  type="text"
                  name="ID"
                  value={sneakerData.ID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Name :
                <input
                  className="detail-add-name"
                  type="text"
                  name="Name"
                  value={sneakerData.Name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Price :
                <input
                  className="detail-add-price"
                  type="text"
                  name="Price"
                  value={sneakerData.Price}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category :
                <input
                  className="detail-add-category"
                  type="text"
                  name="Category"
                  value={sneakerData.Category}
                  onChange={handleChange}
                />
              </label>
              <label>
                Type :
                <input
                  className="detail-add-type"
                  type="text"
                  name="Type"
                  value={sneakerData.Type}
                  onChange={handleChange}
                />
              </label>
              <label className="detail-image">
                Image URL :
                <input
                  className="detail-add-image"
                  type="text"
                  name="Image"
                  value={sneakerData.Image}
                  onChange={handleChange}
                />
              </label>
              <button type="submit" className="submit-add">
                Add
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSneakerPopup;
