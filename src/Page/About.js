import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProductPopup from "./AddProductPopup";
import EditProductPopup from "./EditProductPopup";
import "./About.css";

function About() {
  const [productData, setProductData] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7137/api/sneakers");
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAddProduct = () => {
    setIsAddProductOpen(!isAddProductOpen);
  };

  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  const openDeleteConfirmation = (productId) => {
    setProductIdToDelete(productId);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleUpdateTable = () => {
    fetchData();
    setEditProduct(null);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://localhost:7137/api/sneakers/${productId}`);
      console.log("Product deleted with ID:", productId);
      handleUpdateTable();
      closeDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleEdit = async (productId) => {
    try {
      const response = await axios.get(
        `https://localhost:7137/api/sneakers/${productId}`
      );
      const productToEdit = response.data;
      setEditProduct(productToEdit);
      toggleEditPopup(); // เปิด Popup
    } catch (error) {
      console.error("Product not found for editing.");
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(
        `https://localhost:7137/api/sneakers/${updatedProduct.id}`,
        updatedProduct
      );
      console.log("Product updated:", updatedProduct);
      handleUpdateTable();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-force">
      <h1 className="title-manage">Product Management</h1>
      <div className="add-product-btn-container">
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add product
        </button>
      </div>
      <div className="popup">
      <div className="move-add">
          {isAddProductOpen && (
            <AddProductPopup
              onClose={() => setIsAddProductOpen(false)}
              onAdd={handleUpdateTable}
            />
          )}
       </div>
      </div>
      {isEditPopupOpen && (
        <div className="popup">
          <div className="popup-edit">
            <EditProductPopup
              onClose={toggleEditPopup}
              onUpdate={handleUpdateProduct}
              editProduct={editProduct}
            />
          </div>
        </div>
      )}
      {isDeleteConfirmationOpen && (
        <div className="popup-delete">
          <button
            className="button-close-delete"
            onClick={closeDeleteConfirmation}
          >
            &#10006;{" "}
          </button>
          <div className="popup-text">
            Are you sure you want to delete this product?
          </div>
          <button
            className="button-confirm-delete"
            onClick={() => handleDelete(productIdToDelete)}
          >
            Yes
          </button>
          <button
            className="button-cancel-delete"
            onClick={closeDeleteConfirmation}
          >
            Cancel
          </button>
        </div>
      )}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>Baht {product.price}</td>
              <td>{product.image}</td>
              <td>
                <button
                  className="button-update"
                  onClick={() => handleEdit(product.id)}
                >
                  Update
                </button>
                <button
                  className="button-delete"
                  onClick={() => openDeleteConfirmation(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default About;
