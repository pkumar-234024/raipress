import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/productData";
import "./ProductListing.css";
import ImageCard from "../imagecard/ImageCard";

const ProductListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (categoryId) {
    }
  }, [categoryId]);

  const filterByCategoryId = (array, categoryId) => {
    return array.filter((item) => item.categoryId === parseInt(categoryId));
  };

  const products = filterByCategoryId(productData, categoryId);

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
      <h2 className="category-title">{categoryId} Collection</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ImageCard
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            title={product.name}
            description={product.description}
            price={product.price}
            dimensions={product.dimensions}
            color={product.color}
            type={product.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
