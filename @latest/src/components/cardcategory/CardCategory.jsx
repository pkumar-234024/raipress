import React from 'react';
import { categoryData } from '../../data/categoryData';
import './CardCategory.css';

const CardCategory = () => {
  return (
    <div className="card-category-container">
      <h2 className="category-title">Our Print Categories</h2>
      <div className="categories-grid">
        {categoryData.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-left">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="basic-info">
                <h3>{category.name}</h3>
                <p className="description">{category.description}</p>
                <p className="price-range">{category.priceRange}</p>
                <button className="order-button">For more click here</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCategory;
