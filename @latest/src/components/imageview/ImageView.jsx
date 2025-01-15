import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { galleryData } from '../../data/galleryData';
import './ImageView.css';

const ImageView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImageLoaded(false);
    const foundImage = galleryData.find(img => img.id === parseInt(id));
    
    if (!foundImage) {
      navigate('/');
      return;
    }

    setCurrentImage(foundImage);
    
    // Get related images (excluding current image)
    const related = galleryData
      .filter(img => img.id !== parseInt(id))
      .slice(0, 4);
    
    setRelatedImages(related);
    setLoading(false);
  }, [id, navigate]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <div className="image-view-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!currentImage) return null;

  return (
    <div className="image-view-container">
      <Link to="/" className="back-button">
        ← Back to Gallery
      </Link>
      
      <div className="main-image-container">
        {!imageLoaded && <div className="loading">Loading image...</div>}
        <img 
          src={currentImage.url} 
          alt={currentImage.title} 
          className="full-size-image"
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <h2>{currentImage.title}</h2>
        <p>{currentImage.description}</p>
      </div>
      
      {relatedImages.length > 0 && (
        <div className="related-images">
          <h3>Related Images</h3>
          <div className="carousel">
            {relatedImages.map(image => (
              <Link to={`/image/${image.id}`} key={image.id}>
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="carousel-image"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageView; 