import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/productData";
import { galleryData } from "../../data/galleryData";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = productData.find((p) => p.id === parseInt(productId));
  const galleryImages = galleryData.filter(
    (img) => img.productId === parseInt(productId)
  );
  console.log(galleryImages);
  if (!product) {
    return (
      <div className="no-product">
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-left">
        <div className="main-image">
          <img
            src={galleryImages[selectedImage]?.imageUrl || product.image}
            alt={product.name}
          />
        </div>
        <div className="thumbnail-container">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${product.name} view ${index + 1}`}
              className={selectedImage === index ? "selected" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="product-specs">
          <div className="spec-item">
            <span>Dimensions:</span>
            <span>{product.dimensions}</span>
          </div>
          <div className="spec-item">
            <span>Color:</span>
            <span>{product.color}</span>
          </div>
          <div className="spec-item">
            <span>Type:</span>
            <span>{product.type}</span>
          </div>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
