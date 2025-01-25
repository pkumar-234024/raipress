import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import {
  categoryData,
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../../data/categoryData";
import {
  productData,
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../../data/productData";
import { galleryData } from "../../data/galleryData";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    setCategories(getAllCategories());
    setProducts(getAllProducts());
  }, []);

  // Category handlers
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryForm.name || !categoryForm.image) {
      alert("Category name and image are required!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const categoryData = {
        id: editingCategory ? editingCategory.id : Date.now(),
        name: categoryForm.name,
        image: typeof categoryForm.image === 'string' ? categoryForm.image : reader.result,
        description: categoryForm.description,
      };

      if (editingCategory) {
        updateCategory(editingCategory.id, categoryData);
      } else {
        addCategory(categoryData);
      }

      setCategories(getAllCategories());
      setShowCategoryForm(false);
      setEditingCategory(null);
      setCategoryForm({ name: "", description: "", image: null });
    };

    if (categoryForm.image instanceof File) {
      reader.readAsDataURL(categoryForm.image);
    } else {
      reader.onloadend();
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowCategoryForm(true);
  };

  // Product handlers
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.price) {
      alert("Product name, category, and price are required!");
      return;
    }

    const processImages = async () => {
      const imagePromises = productForm.images.map(image => {
        if (image instanceof File) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(image);
          });
        }
        return Promise.resolve(image);
      });

      const processedImages = await Promise.all(imagePromises);

      const productData = {
        id: editingProduct ? editingProduct.id : Date.now(),
        name: productForm.name,
        description: productForm.description,
        price: productForm.price,
        category: productForm.category,
        images: processedImages,
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
      } else {
        addProduct(productData);
      }

      setProducts(getAllProducts());
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    };

    processImages();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: product.images,
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(getAllProducts());
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const isDeleted = deleteCategory(id);
      if (isDeleted) {
        // Refresh the categories list
        setCategories(getAllCategories());
        // Force a page refresh
        window.location.reload();
      }
    }
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryForm({ ...categoryForm, image: file });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductForm({ ...productForm, images: files });
  };

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === "category" ? "active" : ""}`}
          onClick={() => setActiveTab("category")}
        >
          Categories
        </button>
        <button
          className={`tab ${activeTab === "product" ? "active" : ""}`}
          onClick={() => setActiveTab("product")}
        >
          Products
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "category" && (
          <div className="category-management">
            <div className="category-header">
              <h2>Categories</h2>
              <button 
                className="add-btn"
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryForm({ name: "", description: "", image: null });
                  setShowCategoryForm(true);
                }}
              >
                + Add Category
              </button>
            </div>

            <div className="items-list">
              {categories.map((category) => (
                <div key={category.id} className="item-card">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="item-thumbnail"
                  />
                  <div className="item-info">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showCategoryForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <form onSubmit={handleCategorySubmit} className="admin-form">
                    <div className="modal-header">
                      <h2>{editingCategory ? 'Edit Category' : 'Create Category'}</h2>
                      <button 
                        type="button" 
                        className="close-btn"
                        onClick={() => setShowCategoryForm(false)}
                      >
                        ×
                      </button>
                    </div>
                    
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
                            src={categoryForm.image instanceof File ? URL.createObjectURL(categoryForm.image) : categoryForm.image}
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

                    <div className="form-actions">
                      <button type="submit">
                        {editingCategory ? 'Update Category' : 'Create Category'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowCategoryForm(false)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "product" && (
          <div className="product-management">
            <div className="product-header">
              <h2>Products</h2>
              <button 
                className="add-btn"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    images: [],
                  });
                  setShowProductForm(true);
                }}
              >
                + Add Product
              </button>
            </div>

            <div className="items-list">
              {products.map((product) => (
                <div key={product.id} className="item-card">
                  <div className="item-images">
                    {product.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${product.name} ${index + 1}`} 
                        className="item-thumbnail"
                      />
                    ))}
                  </div>
                  <div className="item-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                    <p className="category">Category: {product.category}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showProductForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <form onSubmit={handleProductSubmit} className="admin-form">
                    <div className="modal-header">
                      <h2>{editingProduct ? 'Edit Product' : 'Create Product'}</h2>
                      <button 
                        type="button" 
                        className="close-btn"
                        onClick={() => setShowProductForm(false)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="productName">Product Name *</label>
                      <input
                        id="productName"
                        type="text"
                        placeholder="Product Name"
                        value={productForm.name}
                        required
                        onChange={(e) =>
                          setProductForm({ ...productForm, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="productDescription">Description</label>
                      <textarea
                        id="productDescription"
                        placeholder="Product Description"
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({ ...productForm, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="productPrice">Price *</label>
                      <input
                        id="productPrice"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={productForm.price}
                        required
                        onChange={(e) =>
                          setProductForm({ ...productForm, price: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="productCategory">Category *</label>
                      <select
                        id="productCategory"
                        value={productForm.category}
                        required
                        onChange={(e) =>
                          setProductForm({ ...productForm, category: e.target.value })
                        }
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="productImages">Product Images</label>
                      <input
                        id="productImages"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setProductForm({ ...productForm, images: files });
                        }}
                      />
                      <div className="image-preview">
                        {productForm.images.map((image, index) => (
                          <div key={index} className="preview-item">
                            <img
                              src={image instanceof File ? URL.createObjectURL(image) : image}
                              alt={`Preview ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit">
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowProductForm(false)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
