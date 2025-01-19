import React, { useState } from "react";
import "./AdminPanel.css";
import {
  categoryData,
  addCategory,
  getAllCategories,
} from "../../data/categoryData";
import { productData as products } from "../../data/productData";
import { galleryData } from "../../data/galleryData";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("category");

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryForm.name || !categoryForm.image) {
      alert("Category name and image are required!");
      return;
    }
    const newCategory = {
      id: categoryData.length + 1,
      name: categoryForm.name,
      image: categoryForm.image,
      description: categoryForm.description,
    };

    addCategory(newCategory);
    console.log("Category Data:", getAllCategories());

    // Reset form after submission
    setCategoryForm({
      name: "",
      description: "",
      image: null,
    });
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryForm({ ...categoryForm, image: file });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement product creation logic
    console.log("Product Data:", productData);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });
  };

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === "category" ? "active" : ""}`}
          onClick={() => setActiveTab("category")}
        >
          Create Category
        </button>
        <button
          className={`tab ${activeTab === "product" ? "active" : ""}`}
          onClick={() => setActiveTab("product")}
        >
          Create Product
        </button>
        <button
          className={`tab ${activeTab === "images" ? "active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Upload Images
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "category" && (
          <form onSubmit={handleCategorySubmit} className="admin-form">
            <h2>Create Category</h2>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name *</label>
              <input
                id="categoryName"
                type="text"
                placeholder="Category Name"
                value={categoryForm.name}
                required
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryImage">Category Image *</label>
              <input
                id="categoryImage"
                type="file"
                accept="image/*"
                required
                onChange={handleCategoryImageUpload}
              />
              {categoryForm.image && (
                <div className="image-preview single-preview">
                  <img
                    src={URL.createObjectURL(categoryForm.image)}
                    alt="Category preview"
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="categoryDescription">Category Description</label>
              <textarea
                id="categoryDescription"
                placeholder="Category Description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button type="submit">Create Category</button>
          </form>
        )}

        {activeTab === "product" && (
          <form onSubmit={handleProductSubmit} className="admin-form">
            <h2>Create Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Product Description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
            <select
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {/* Add categories dynamically */}
            </select>
            <button type="submit">Create Product</button>
          </form>
        )}

        {activeTab === "images" && (
          <form className="admin-form">
            <h2>Upload Images</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="image-preview">
              {productData.images.map((image, index) => (
                <div key={index} className="preview-item">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                  />
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
