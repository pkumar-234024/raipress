import React from "react";
import { useNavigate } from "react-router-dom";
import { categoryData } from "../../data/categoryData";
import CardCategory from "../cardcategory/CardCategory";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div>
      <h2 className="category-title">Our Print Categories</h2>
      <div className="categories-grid">
        {categoryData.map((category) => (
          <CardCategory
            key={category.id}
            categoryImageUrl={category.image}
            categoryName={category.name}
            categoryDescription={category.description}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
