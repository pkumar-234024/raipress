import React from 'react';
import { Link } from 'react-router-dom';
import './ImageCard.css';

const ImageCard = ({ imageUrl, title, description, id }) => {
  return (
    <Link to={`/image/${id}`} className="image-card-link">
      <div className="image-card">
        <img src={imageUrl} alt={title} className="image-card-img" />
        <div className="image-card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
