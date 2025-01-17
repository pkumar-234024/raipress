import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/productData";
import "./ProductListing.css";

const ProductListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const products = productData.map((data) => (data.categoryId = category));
  {
    console.log(category);
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found for this category</h2>
        <button onClick={() => navigate("/")}>Go Back to Categories</button>
      </div>
    );
  }

  return (
    <div className="product-listing">
      <h2 className="category-title">{category} Collection</h2>
      <div className="products-grid">
        {/* {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <div className="product-details">
                <p>
                  <strong>Dimensions:</strong> {product.dimensions}
                </p>
                <p>
                  <strong>Colors:</strong> {product.color}
                </p>
                <p>
                  <strong>Type:</strong> {product.type}
                </p>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ProductListing;
