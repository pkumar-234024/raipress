import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../data/productData";
import { getAllCategories } from "../../data/categoryData";
import "./ProductListing.css";
import ImageCard from "../imagecard/ImageCard";

const ProductListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getAllProducts();
      const allCategories = getAllCategories();
      
      // console.log('Category ID:', categoryId);
      // console.log('All Categories:', allCategories);
      // console.log('All Products:', allProducts);

      // Find the category by ID
      const category = allCategories.find(cat => String(cat.id) === String(categoryId));
      
      if (category) {
        //console.log('Found category:', category);
        setCategoryName(category.name);
        
        // Filter products that belong to this category
        const filteredProducts = allProducts.filter(product => {
          //console.log('Comparing:', product.categoryId, category.id);
          return (String(product.categoryId) === String(category.id));
        });
        
        console.log('Filtered Products:', filteredProducts);
        setProducts(filteredProducts);
      } else {
        console.log('Category not found');
        setProducts([]);
      }
    };

    if (categoryId) {
      loadProducts();
    }
  }, [categoryId]);

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
      <h2 className="category-title">{categoryName} Collection</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ImageCard
            key={product.id}
            id={product.id}
            imageUrl={product.images && product.images.length > 0 ? product.images[0] : product.image}
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
