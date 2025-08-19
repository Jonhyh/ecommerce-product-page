import '../App.css';
import React, { useState } from 'react';

// Product data (This will eventually come from an API)
const product = {
  id: 'book-101',
  imageUrl: 'https://placehold.co/400x500/E0F2F7/2C3E50?text=Book+Cover',
  title: 'The Great Software Workflow Guide',
  description:
    'A comprehensive guide to mastering efficient software development workflows, including version control, GitHub, build images, and RESTful API design. Learn best practices for modern software engineering.',
  price: 29.90,            // original price shown with strike-through
  salePrice: 19.90,        // sale price to display
  currency: '$',
  stock: 10,
  onSale: true,
};

// Component for displaying the product image
function ProductImage({ imageUrl, title }) {
  return (
    <img
      src={imageUrl}
      alt={title}
      className="product-image"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          'https://placehold.co/400x500/CCCCCC/333333?text=Image+Not+Found';
      }}
    />
  );
}

// Component for displaying product title, description, and price with toggle
function ProductInfo({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = product.description.substring(0, 150) + '...';
  const needsToggle = product.description.length > 150;

  return (
    <div>
      <h1 className="product-title">{product.title}</h1>

      <p className="product-description">
        {isExpanded || !needsToggle ? product.description : shortDescription}
        {needsToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-toggle-button"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>

      {/* Price & Status */}
      <div className="price-stock-container">
        <div className="price-group">
          {product.onSale ? (
            <>
              <span className="sale-label" aria-label="On Sale">
                SALE!
              </span>

              <span className="original-price" aria-label="Original price">
                {product.currency}
                {product.price.toFixed(2)}
              </span>

              <span className="sale-price" aria-label="Sale price">
                {product.currency}
                {product.salePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="product-price">
              {product.currency}
              {product.price.toFixed(2)}
            </span>
          )}
        </div>

        {product.stock > 0 ? (
          <span className="stock-indicator in-stock">In Stock</span>
        ) : (
          <span className="stock-indicator out-of-stock">Out of Stock</span>
        )}
      </div>
    </div>
  );
}

// Main ProductPage component
function ProductPage() {
  return (
    <div className="product-page-container">
      {/* Product Image Section */}
      <div className="image-section">
        <ProductImage imageUrl={product.imageUrl} title={product.title} />
      </div>

      {/* Product Info Section */}
      <div className="info-section">
        <ProductInfo product={product} />

        {/* Placeholder for future features */}
        <div className="quantity-placeholder-section">
          <p className="quantity-placeholder-text">
            Quantity: [Placeholder for Quantity Selector]
          </p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
