import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
  createCategory,
  categoryData,
} from "../../data/categoryData";
import {
  productData,
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  addProductImages,
  deleteProductImage,
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

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
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to initial data if API fails
        setCategories(categoryData());
      }
    };
    
    fetchData();
  }, []);

  // Category handlers
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryForm.name || !categoryForm.image) {
      alert("Category name and image are required!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const categoryData = {
        name: categoryForm.name,
        description: categoryForm.description,
        image: reader.result, // This will be converted to byte array in the service
      };

      try {
        if (editingCategory) {
          await updateCategory(editingCategory.id, categoryData);
        } else {
          await createCategory(categoryData);
        }
        
        // Refresh categories list
        const updatedCategories = await getAllCategories();
        setCategories(updatedCategories);
        
        setShowCategoryForm(false);
        setEditingCategory(null);
        setCategoryForm({ name: "", description: "", image: null });
      } catch (error) {
        console.error('Error submitting category:', error);
        alert('Failed to save category. Please try again.');
      }
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
        categoryId: parseInt(productForm.category),
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
      category: product.categoryId.toString(),
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

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
        try {
            await deleteCategory(id);
            // After successful deletion, refresh the categories list
            const updatedCategories = await getAllCategories();
            setCategories(updatedCategories);
            alert('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category. Please try again.');
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

  const handleAdditionalImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (!selectedProduct || files.length === 0) {
      alert("Please select a product and images first!");
      return;
    }

    try {
      const imagePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const processedImages = await Promise.all(imagePromises);
      
      // Add new images to the selected product
      const success = addProductImages(selectedProduct.id, processedImages);
      
      if (success) {
        // Update the products list and selected product
        const updatedProducts = getAllProducts();
        setProducts(updatedProducts);
        setSelectedProduct(updatedProducts.find(p => p.id === selectedProduct.id));
        
        // Clear the file input
        e.target.value = '';
        alert('Images added successfully!');
      } else {
        alert('Failed to add images. Please try again.');
      }
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    }
  };

  const handleDeleteProductImage = (productId, imageIndex) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteProductImage(productId, imageIndex);
      setProducts(getAllProducts());
    }
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
        <button
          className={`tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Product Gallery
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
                <div key={`category-${category.id}`} className="item-card">
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
                <div key={`product-${product.id}`} className="item-card">
                  <div className="item-images">
                    {product.images.map((image, index) => (
                      <img 
                        key={`${product.id}-${index}`}
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
                    <p className="category">
                      Category: {categories.find(cat => cat.id === product.categoryId)?.name || 'Unknown'}
                    </p>
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
                          <option key={`category-${category.id}`} value={category.id}>
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
                          <div key={`${productForm.id}-${index}`} className="preview-item">
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

        {activeTab === "gallery" && (
          <div className="gallery-management">
            <h2>Product Gallery Management</h2>
            
            <div className="product-selector">
              <label htmlFor="productSelect">Select Product:</label>
              <select
                id="productSelect"
                value={selectedProduct?.id || ""}
                onChange={(e) => {
                  const product = products.find(p => p.id === parseInt(e.target.value));
                  setSelectedProduct(product);
                }}
              >
                <option value="">Choose a product</option>
                {products.map((product) => (
                  <option key={`product-${product.id}`} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="gallery-content">
                <div className="upload-section">
                  <h3>Add More Images</h3>
                  <div className="upload-container">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleAdditionalImagesUpload}
                      className="file-input"
                    />
                    <p className="upload-hint">Select multiple images to add to {selectedProduct.name}</p>
                  </div>
                </div>

                <div className="gallery-grid">
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    selectedProduct.images.map((image, index) => (
                      <div key={`${selectedProduct.id}-${index}`} className="gallery-item">
                        <img src={image} alt={`Product ${index + 1}`} />
                        <div className="gallery-item-actions">
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteProductImage(selectedProduct.id, index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-images">No images available for this product</p>
                  )}
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
