import React from 'react';

const StarIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Stars = ({ rating }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const Navbar = ({ currentPage, onNavigate, cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <span className="navbar-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          Harvest &amp; Hearth
        </span>
        <div className="navbar-nav">
          {['home', 'products'].map(page => (
            <a
              key={page}
              onClick={() => onNavigate(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page === 'home' ? 'Trang Chủ' : 'Sản Phẩm'}
            </a>
          ))}
          <a onClick={() => onNavigate('products', 'Trái Cây Sấy')}>Trái Cây Sấy</a>
          <a onClick={() => onNavigate('products', 'Hỗn Hợp Hạt')}>Hỗn Hợp Hạt</a>
          <a onClick={() => onNavigate('products', 'Hàng Mới')}>Hàng Mới</a>
        </div>
        <div className="navbar-actions">
          <button
            className="navbar-icon-btn"
            onClick={() => onNavigate('cart')}
            title="Giỏ hàng"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="navbar-icon-btn" title="Tài khoản">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">Harvest &amp; Hearth</div>
          <p className="footer-tagline">
            "Trồng với tình yêu, sấy với tâm huyết.<br />
            Kết nối bạn với tinh hoa mùa thu hoạch quanh năm."
          </p>
        </div>
        <div>
          <div className="footer-heading">Cửa Hàng</div>
          <div className="footer-links">
            <a href="#">Trái Cây Sấy</a>
            <a href="#">Hỗn Hợp Hạt</a>
            <a href="#">Quà Tặng &amp; Giỏ</a>
            <a href="#">Hàng Mới</a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Công Ty</div>
          <div className="footer-links">
            <a href="#">Về Chúng Tôi</a>
            <a href="#">Phát Triển Bền Vững</a>
            <a href="#">Liên Hệ</a>
            <a href="#">Blog</a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Nhận Tin Khuyến Mãi</div>
          <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
            Nhận ưu đãi 5% cho đơn hàng đầu tiên!
          </p>
          <div className="footer-newsletter-input">
            <input type="email" placeholder="Email của bạn" />
            <button>Đăng Ký</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-text">© 2024 Harvest &amp; Hearth. Trồng với tình yêu, sấy với tâm huyết.</span>
        <div className="footer-bottom-links">
          <a href="#">Chính Sách Bảo Mật</a>
          <a href="#">Điều Khoản Dịch Vụ</a>
        </div>
      </div>
    </div>
  </footer>
);

export const ProductCard = ({ product, onNavigate, onAddToCart }) => (
  <div className="product-card" onClick={() => onNavigate('product-detail', product)}>
    <div className="product-card-img-wrap">
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.badge && (
        <span className="product-badge" style={{ background: product.badgeColor || '#b45309' }}>
          {product.badge}
        </span>
      )}
    </div>
    <div className="product-card-body">
      <div className="product-card-name">{product.name}</div>
      <div className="product-card-desc">{product.shortDesc}</div>
      <div className="product-card-footer">
        <div>
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-original-price" style={{ marginLeft: 8 }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span style={{ marginLeft: 4 }}>({product.reviewCount})</span>
        </div>
      </div>
    </div>
  </div>
);
