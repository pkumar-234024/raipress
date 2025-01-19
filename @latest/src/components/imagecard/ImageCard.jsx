import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ImageCard.css";

const ImageCard = ({
  id,
  imageUrl,
  title,
  description,
  price,
  dimensions,
  color,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="image-card" onClick={handleClick}>
      <img src={imageUrl} alt={title} className="image-card-img" />
      <div className="image-card-content">
        <h3 className="image-card-title">{title}</h3>
        <p className="image-card-description">{description}</p>
        <div className="image-card-details">
          <p className="image-card-price">₹{price}</p>
          <p className="image-card-color">
            <span className="color-label">Color:</span> {color[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
