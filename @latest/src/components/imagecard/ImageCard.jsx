import React from "react";
import { Link } from "react-router-dom";
import "./ImageCard.css";

const ImageCard = ({ imageUrl, title, description, id, price, color }) => {
  return (
    <Link to={`/image/${id}`} className="image-card-link">
      <div className="image-card">
        <img src={imageUrl} alt={title} className="image-card-img" />
        <div className="image-card-content">
          <h3 className="image-card-title">{title}</h3>
          <p className="image-card-description">{description}</p>
          <div className="image-card-details">
            <p className="image-card-price">${price}</p>
            <p className="image-card-color">
              <span className="color-label">Color:</span> {color}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
