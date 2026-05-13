import React, { useState } from 'react';
import { products } from '../data/products';
import { Stars, ProductCard, formatPrice } from './Shared';
import '../style/ProductDetail.css';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d6b2c" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" fill="#f0fdf4" stroke="#3d6b2c" strokeWidth="1.5"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ProductDetailPage = ({ product, onNavigate, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [nutritionOpen, setNutritionOpen] = useState(true);
  const [addedMsg, setAddedMsg] = useState(false);

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    onAddToCart(product, qty);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  return (
    <div className="product-detail-page page-enter">
      {/* BREADCRUMB */}
      <div className="detail-breadcrumb">
        <div className="container">
          <span onClick={() => onNavigate('home')} className="breadcrumb-link">Trang Chủ</span>
          <span className="breadcrumb-sep">›</span>
          <span onClick={() => onNavigate('products', product.category)} className="breadcrumb-link">
            {product.category}
          </span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="container detail-main">
        {/* IMAGES */}
        <div className="detail-images">
          <div className="detail-img-main">
            <img src={product.images[activeImg]} alt={product.name} />
          </div>
          <div className="detail-img-thumbs">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`detail-img-thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} ${i+1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="detail-info">
          <div className="detail-badges">
            {product.badge && (
              <span className="detail-badge" style={{background: product.badgeColor || '#b45309'}}>
                {product.badge}
              </span>
            )}
            {product.tags.map(tag => (
              <span key={tag} className="detail-badge detail-badge-outline">{tag}</span>
            ))}
          </div>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="detail-orig-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="detail-rating-row">
            <Stars rating={product.rating} />
            <span className="detail-rating-count">({product.reviewCount} đánh giá)</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <ul className="detail-features">
            {product.features.map((f, i) => (
              <li key={i} className="detail-feature">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* QTY + ADD TO CART */}
          <div className="detail-purchase">
            <div className="detail-qty-wrap">
              <label className="detail-qty-label">Chọn Số Lượng</label>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty-1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(qty+1)}>+</button>
              </div>
            </div>
            <div className="detail-actions">
              <button
                className="btn-primary detail-add-btn"
                onClick={handleAddToCart}
                style={{background: addedMsg ? '#3d6b2c' : undefined}}
              >
                {addedMsg ? '✓ Đã Thêm!' : 'Thêm Vào Giỏ'}
              </button>
              <button className="btn-outline detail-buy-btn" onClick={() => { onAddToCart(product, qty); onNavigate('checkout'); }}>
                Mua Ngay
              </button>
            </div>
            <div className="detail-trust-row">
              <span className="detail-trust-item">🚚 Miễn phí vận chuyển &gt;500k</span>
              <span className="detail-trust-item">🔒 Thanh Toán An Toàn</span>
            </div>
          </div>

          {/* NUTRITIONAL FACTS */}
          <div className="detail-accordion">
            <button
              className="accordion-header"
              onClick={() => setNutritionOpen(!nutritionOpen)}
            >
              <span>Thông Tin Dinh Dưỡng</span>
              <span className="accordion-icon">{nutritionOpen ? '▴' : '▾'}</span>
            </button>
            {nutritionOpen && (
              <div className="accordion-body">
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories</span>
                    <span className="nutrition-value">{product.nutritionFacts.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Chất Xơ</span>
                    <span className="nutrition-value">{product.nutritionFacts.dietaryFiber}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Kali</span>
                    <span className="nutrition-value">{product.nutritionFacts.potassium}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Khẩu Phần</span>
                    <span className="nutrition-value">{product.nutritionFacts.servingSize}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <section className="detail-related">
        <div className="container">
          <div className="related-header">
            <h2 className="section-title">Bạn Có Thể Thích</h2>
            <button className="btn-ghost" onClick={() => onNavigate('products')}>Xem Tất Cả →</button>
          </div>
          <div className="related-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
