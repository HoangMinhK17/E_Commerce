import React, { useState } from 'react';
import { Badge, Button, Card, Rate, Tag, Drawer, Menu, Space } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
  GiftOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  SendOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';

export const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const Navbar = ({ currentPage, onNavigate, cartCount }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { key: 'home', label: 'Trang Chủ', icon: <HomeOutlined /> },
    { key: 'products', label: 'Sản Phẩm', icon: <AppstoreOutlined /> },
    { key: 'dried-fruit', label: 'Trái Cây Sấy', icon: <GiftOutlined /> },
    { key: 'nut-mix', label: 'Hỗn Hợp Hạt', icon: <ExperimentOutlined /> },
    { key: 'new', label: 'Hàng Mới', icon: <ThunderboltOutlined /> },
  ];

  const handleMenuClick = (e) => {
    if (e.key === 'home') onNavigate('home');
    else if (e.key === 'products') onNavigate('products');
    else if (e.key === 'dried-fruit') onNavigate('products', 'Trái Cây Sấy');
    else if (e.key === 'nut-mix') onNavigate('products', 'Hỗn Hợp Hạt');
    else if (e.key === 'new') onNavigate('products', 'Hàng Mới');
    setDrawerOpen(false);
  };

  const getSelectedKey = () => {
    if (currentPage === 'home') return 'home';
    if (currentPage === 'products') return 'products';
    return '';
  };

  return (
    <nav className="site-navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <span className="navbar-logo-icon">🌿</span>
          Harvest & Hearth
        </div>

        <div className="navbar-center">
          <Menu
            className="navbar-menu"
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            onClick={handleMenuClick}
            items={menuItems.map(item => ({
              key: item.key,
              label: item.label,
            }))}
            style={{ minWidth: 420 }}
          />
        </div>

        <Space size={8} className="navbar-actions">
          <Badge count={cartCount} size="small" offset={[-2, 4]}
            style={{ backgroundColor: '#c2530a' }}>
            <Button
              type="text"
              shape="circle"
              icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}
              onClick={() => onNavigate('cart')}
              style={{
                width: 40, height: 40,
                border: '1px solid #e0d5c8',
                color: '#6b4c3b',
              }}
            />
          </Badge>
          <Button
            type="text"
            shape="circle"
            icon={<UserOutlined style={{ fontSize: 18 }} />}
            style={{
              width: 40, height: 40,
              border: '1px solid #e0d5c8',
              color: '#6b4c3b',
            }}
          />
          <Button
            type="text"
            className="mobile-menu-btn"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
        </Space>

        <Drawer
          title={
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#c2530a', fontWeight: 700 }}>
              🌿 Harvest & Hearth
            </span>
          }
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={280}
        >
          <Menu
            mode="vertical"
            selectedKeys={[getSelectedKey()]}
            onClick={handleMenuClick}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
            }))}
            style={{ border: 'none' }}
          />
        </Drawer>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-grid-layout" style={{ marginBottom: 0 }}>
        <div>
          <div className="footer-logo">
            <span className="footer-logo-icon">🌿</span>
            Harvest & Hearth
          </div>
          <p className="footer-tagline">
            "Trồng với tình yêu, sấy với tâm huyết.<br />
            Kết nối bạn với tinh hoa mùa thu hoạch quanh năm."
          </p>
          <Space style={{ marginTop: 20 }} size={12}>
            {['📘', '📸', '🐦'].map((icon, i) => (
              <span key={i} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', cursor: 'pointer',
                transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.12)',
              }}>{icon}</span>
            ))}
          </Space>
        </div>
        <div>
          <div className="footer-heading">Cửa Hàng</div>
          <div className="footer-links">
            <a href="#">Trái Cây Sấy</a>
            <a href="#">Hỗn Hợp Hạt</a>
            <a href="#">Quà Tặng & Giỏ</a>
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
          <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', marginBottom: 6, lineHeight: 1.7 }}>
            Nhận ưu đãi 5% cho đơn hàng đầu tiên!
          </p>
          <div className="footer-newsletter-wrap">
            <Space.Compact style={{ width: '100%' }}>
              <input
                type="email"
                placeholder="Email của bạn"
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: '8px 0 0 8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.08)', color: 'white',
                  fontSize: '0.85rem', outline: 'none',
                }}
              />
              <button style={{
                padding: '10px 18px', background: '#c2530a', color: 'white',
                border: 'none', borderRadius: '0 8px 8px 0', fontWeight: 600,
                fontSize: '0.85rem', cursor: 'pointer',
              }}>
                <SendOutlined /> Đăng Ký
              </button>
            </Space.Compact>
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <PhoneOutlined /> 0123 456 789
            </span>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <MailOutlined /> hello@harvesthearth.vn
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-text">© 2024 Harvest & Hearth. Trồng với tình yêu, sấy với tâm huyết.</span>
        <div className="footer-bottom-links">
          <a href="#">Chính Sách Bảo Mật</a>
          <a href="#">Điều Khoản Dịch Vụ</a>
        </div>
      </div>
    </div>
  </footer>
);

export const ProductCard = ({ product, onNavigate, onAddToCart }) => (
  <Card
    className="product-card"
    hoverable
    onClick={() => onNavigate('product-detail', product)}
    cover={
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#ede7d9' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {product.badge && (
          <div className="product-badge-wrap">
            <Tag color={product.badgeColor || '#b45309'}
              style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', border: 'none', margin: 0 }}>
              {product.badge}
            </Tag>
          </div>
        )}
      </div>
    }
    styles={{ body: { padding: 16 } }}
  >
    <div className="product-card-name">{product.name}</div>
    <div className="product-card-desc">{product.shortDesc}</div>
    <div className="product-card-footer">
      <div>
        <span className="product-price">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
        )}
      </div>
      <div className="product-rating-wrap">
        <Rate disabled defaultValue={product.rating} allowHalf style={{ fontSize: 12 }} />
        <span className="product-rating-count">({product.reviewCount})</span>
      </div>
    </div>
  </Card>
);
