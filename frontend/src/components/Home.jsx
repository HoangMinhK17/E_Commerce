import React, { useState } from 'react';
import { products, featuredProducts } from '../data/products';
import { ProductCard, formatPrice } from './Shared';
import '../style/Home.css';

const HomePage = ({ onNavigate, onAddToCart }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="home-page page-enter">
      {/* HERO – full-width image banner */}
      <section className="hero">
        {/* Background image */}
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=1600&q=90"
            alt="Dried fruits and nuts hero"
          />
        </div>

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Text content on top */}
        <div className="hero-content">
          <div className="hero-inner">
            <span className="hero-badge">🌿 Tự Nhiên &amp; Lành Mạnh</span>
            <h1 className="hero-title">
              Hương Vị <span>Nắng Vàng,</span><br />
              Gửi Đến Tận Nhà Bạn!
            </h1>
            <p className="hero-desc">
              Chúng tôi tuyển chọn những trái cây sấy khô ngon nhất và hỗn hợp hạt thủ công,
              được tìm nguồn trực tiếp từ các vườn cây và lò rang quy mô nhỏ.
            </p>
            <div className="hero-actions">
              <button className="btn-primary hero-btn-main" onClick={() => onNavigate('products')}>
                Khám Phá Ngay
              </button>
              <button className="btn-outline hero-btn-sub" onClick={() => onNavigate('products')}>
                Xem Yêu Thích
              </button>
            </div>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="hero-stat-num">500+</span>
            <span className="hero-stat-label">Đơn hàng hài lòng</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-num">100%</span>
            <span className="hero-stat-label">Hữu cơ tự nhiên</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-num">50+</span>
            <span className="hero-stat-label">Sản phẩm đặc sắc</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>Cuộn xuống</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section home-categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Khám Phá Danh Mục</h2>
          </div>
          <div className="cat-grid">
            <div className="cat-card cat-card-large" onClick={() => onNavigate('products', 'Trái Cây Sấy')}>
              <img src="https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600&q=80" alt="Trái Cây Sấy" />
              <div className="cat-overlay">
                <h3>Trái Cây Sấy</h3>
                <p>Tươi ngon, giữ trọn dưỡng chất</p>
                <span className="cat-link">Xem ngay →</span>
              </div>
            </div>
            <div className="cat-card" onClick={() => onNavigate('products', 'Hỗn Hợp Hạt')}>
              <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80" alt="Hỗn Hợp Hạt" />
              <div className="cat-overlay">
                <h3>Hỗn Hợp Hạt</h3>
                <p>Giàu dinh dưỡng, thơm ngon</p>
                <span className="cat-link">Xem ngay →</span>
              </div>
            </div>
            <div className="cat-card cat-card-dark" onClick={() => onNavigate('products', 'Hạt Rang')}>
              <img src="https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=400&q=80" alt="Hạt Rang" />
              <div className="cat-overlay">
                <h3>Hạt Rang Thủ Công</h3>
                <p>Rang mẻ nhỏ, hương vị đậm đà</p>
                <span className="cat-link">Xem ngay →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section home-featured">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Được Yêu Thích Nhất</span>
              <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
            </div>
            <button className="btn-ghost" onClick={() => onNavigate('products')}>
              Xem Tất Cả →
            </button>
          </div>
          <div className="products-grid">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-content">
              <h2 className="trust-title">Minh Bạch Trong Từng Túi Hàng</h2>
              <p className="trust-desc">
                Chúng tôi tin rằng bạn xứng đáng biết thực phẩm của mình đến từ đâu —
                nên chúng tôi chia sẻ toàn bộ hành trình từ trang trại đến bàn ăn của bạn.
              </p>
              <div className="trust-points">
                <div className="trust-point">
                  <span className="trust-icon">🌱</span>
                  <div>
                    <strong>Canh Tác Hữu Cơ</strong>
                    <p>Chỉ hợp tác với các trang trại sử dụng thực hành nông nghiệp hữu cơ và bền vững</p>
                  </div>
                </div>
                <div className="trust-point">
                  <span className="trust-icon">🤝</span>
                  <div>
                    <strong>Thương Mại Công Bằng</strong>
                    <p>Chúng tôi đảm bảo tính bền vững và công bằng cho người trồng trọc</p>
                  </div>
                </div>
                <div className="trust-point">
                  <span className="trust-icon">🚚</span>
                  <div>
                    <strong>Thương Mại Trực Tiếp</strong>
                    <p>Mua trực tiếp từ nhà sản xuất, giá tốt nhất đến tay bạn</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="trust-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500&q=80"
                alt="Farmer holding produce"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <h2 className="newsletter-title">Gia Nhập Cộng Đồng Harvest</h2>
            <p className="newsletter-sub">
              Nhận công thức theo mùa, cập nhật sản phẩm mới và ưu đãi 5% cho đơn hàng đầu tiên.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="btn-primary">Đăng Ký Ngay</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
