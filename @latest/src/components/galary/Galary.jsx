import React from 'react';
import ImageCard from '../imagecard/ImageCard';
import { galleryData } from '../../data/galleryData';
import './Galary.css';

const Galary = () => {
  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-grid">
          {galleryData.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              imageUrl={image.url}
              title={image.title}
              description={image.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galary;
