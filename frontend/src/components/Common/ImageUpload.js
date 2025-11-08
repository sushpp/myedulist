import React, { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ 
  onImagesChange, 
  onFileUpload,
  existingLogo = '', 
  existingBanner = '', 
  existingGallery = [],
  uploading = false 
}) => {
  const [logo, setLogo] = useState(existingLogo);
  const [banner, setBanner] = useState(existingBanner);
  const [gallery, setGallery] = useState(existingGallery);
  
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newLogo = e.target.result;
        setLogo(newLogo);
        if (onImagesChange) {
          onImagesChange({ logo: newLogo });
        }
        if (onFileUpload) {
          onFileUpload({ logoFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBanner = e.target.result;
        setBanner(newBanner);
        if (onImagesChange) {
          onImagesChange({ banner: newBanner });
        }
        if (onFileUpload) {
          onFileUpload({ bannerFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newGalleryImages = [];
      const galleryFiles = [];

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newGalleryImages.push(e.target.result);
          galleryFiles.push(file);

          // When all files are processed
          if (newGalleryImages.length === files.length) {
            const updatedGallery = [...gallery, ...newGalleryImages];
            setGallery(updatedGallery);
            
            if (onImagesChange) {
              onImagesChange({ images: updatedGallery });
            }
            if (onFileUpload) {
              onFileUpload({ galleryFiles });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    if (onImagesChange) {
      onImagesChange({ images: updatedGallery });
    }
  };

  const triggerLogoInput = () => logoInputRef.current?.click();
  const triggerBannerInput = () => bannerInputRef.current?.click();
  const triggerGalleryInput = () => galleryInputRef.current?.click();

  return (
    <div className="image-upload">
      {uploading && (
        <div className="upload-overlay">
          <div className="upload-spinner"></div>
          <p>Uploading images...</p>
        </div>
      )}

      <div className="upload-section">
        <h4>Institute Logo</h4>
        <div className="logo-upload">
          <div className="logo-preview" onClick={triggerLogoInput}>
            {logo ? (
              <img src={logo} alt="Institute Logo" />
            ) : (
              <div className="upload-placeholder">
                <span>+</span>
                <p>Upload Logo</p>
              </div>
            )}
          </div>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
          <p className="upload-help">Recommended: 200x200px, PNG or JPG</p>
        </div>
      </div>

      <div className="upload-section">
        <h4>Banner Image</h4>
        <div className="banner-upload">
          <div className="banner-preview" onClick={triggerBannerInput}>
            {banner ? (
              <img src={banner} alt="Institute Banner" />
            ) : (
              <div className="upload-placeholder">
                <span>+</span>
                <p>Upload Banner</p>
              </div>
            )}
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            style={{ display: 'none' }}
          />
          <p className="upload-help">Recommended: 1200x400px, PNG or JPG</p>
        </div>
      </div>

      <div className="upload-section">
        <h4>Gallery Images</h4>
        <div className="gallery-upload">
          <div className="gallery-preview">
            {gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Gallery ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image"
                  onClick={() => removeGalleryImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <div className="gallery-add" onClick={triggerGalleryInput}>
              <span>+</span>
              <p>Add Images</p>
            </div>
          </div>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            style={{ display: 'none' }}
          />
          <p className="upload-help">You can upload multiple images. Recommended: 800x600px</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;