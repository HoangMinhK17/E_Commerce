import React, { useState } from 'react';
import { Button, Row, Col, Typography, Statistic, Space, Input, Card } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ProductCard } from './Shared';
import { getCategoryProducts } from '../utils/categoryProduct';
import { getProducts } from '../utils/productApi';
import '../style/Home.css';

const { Title, Paragraph, Text } = Typography;

const HomePage = ({ onNavigate, onAddToCart }) => {
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [featuredProds, setFeaturedProds] = useState([]);

  React.useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategoryProducts(),
          getProducts()
        ]);
        
        const mappedCats = Array.isArray(cats) ? cats : [];
        const mappedProds = Array.isArray(prods) ? prods.map(p => ({
          id: p._id || p.id,
          name: p.name,
          image: Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : (p.image || ''),
          images: Array.isArray(p.image) && p.image.length > 0 ? p.image : [p.image || ''],
          price: p.type && p.type.length > 0 ? p.type[0].salePrice : (p.price || 0),
          originalPrice: p.type && p.type.length > 0 ? p.type[0].salePrice * 1.2 : null,
          rating: p.rating || 5,
          reviewCount: p.reviewCount || 10,
          category: p.category?.name || p.category || '',
          badge: p.badge || '',
          tags: p.tags || [],
          description: p.description || '',
          shortDesc: p.description ? p.description.substring(0, 50) + '...' : '',
          features: p.features || ['Thơm ngon', 'Bổ dưỡng'],
          nutritionFacts: p.nutritionFacts || { calories: 100, dietaryFiber: '2g', potassium: '10mg', servingSize: '30g' },
          types: p.type || []
        })) : [];

        setCategories(mappedCats.slice(0, 3));
        setFeaturedProds(mappedProds.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="home-page page-enter">
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=1600&q=90"
            alt="Dried fruits and nuts hero"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-inner">
            <span className="hero-badge">🌿 Tự Nhiên & Lành Mạnh</span>
            <h1 className="hero-title">
              Hương Vị <span style={{ color: '#fbbf24' }}>Nắng Vàng,</span><br />
              Gửi Đến Tận Nhà Bạn!
            </h1>
            <p className="hero-desc">
              Chúng tôi tuyển chọn những trái cây sấy khô ngon nhất và hỗn hợp hạt thủ công,
              được tìm nguồn trực tiếp từ các vườn cây và lò rang quy mô nhỏ.
            </p>
            <Space size={16} wrap className="hero-actions">
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                className="hero-btn-main"
                onClick={() => onNavigate('products')}
              >
                Khám Phá Ngay
              </Button>
              <Button 
                size="large" 
                shape="round" 
                ghost 
                className="hero-btn-sub"
                onClick={() => onNavigate('products')}
              >
                Xem Yêu Thích
              </Button>
            </Space>
          </div>
        </div>
        <div className="hero-stats">
          <Card className="hero-stat-card glass-card" bordered={false}>
            <Statistic title="Đơn hàng hài lòng" value={500} suffix="+" valueStyle={{ color: '#fbbf24', fontWeight: 700, fontFamily: "'Playfair Display', serif" }} />
          </Card>
          <Card className="hero-stat-card glass-card" bordered={false}>
            <Statistic title="Hữu cơ tự nhiên" value={100} suffix="%" valueStyle={{ color: '#fbbf24', fontWeight: 700, fontFamily: "'Playfair Display', serif" }} />
          </Card>
          <Card className="hero-stat-card glass-card" bordered={false}>
            <Statistic title="Sản phẩm đặc sắc" value={50} suffix="+" valueStyle={{ color: '#fbbf24', fontWeight: 700, fontFamily: "'Playfair Display', serif" }} />
          </Card>
        </div>
        <div className="hero-scroll-hint">
          <span>Cuộn xuống</span>
          <ArrowDownOutlined style={{ fontSize: '20px' }} />
        </div>
      </section>

      <section className="section home-categories">
        <div className="container">
          <div className="section-header">
            <Title level={2} className="section-title" style={{ margin: 0 }}>Khám Phá Danh Mục</Title>
          </div>
          <Row gutter={[16, 16]}>
            {categories.map((cat, index) => {
              let mdVal = 8;
              let height = '100%';
              if (index === 0) mdVal = 16;
              else if (index === 1) mdVal = 8;
              else if (index >= 2) { mdVal = 24; height = 280; }
              return (
                <Col xs={24} md={mdVal} key={cat._id || index}>
                  <div className="cat-card" onClick={() => onNavigate('products', cat.name)} style={{ height: height }}>
                    <img src={index === 0 ? "https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600&q=80" : index === 1 ? "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80" : "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=1000&q=80"} alt={cat.name} />
                    <div className="cat-overlay">
                      <Title level={3} style={{ color: 'white', marginBottom: 4 }}>{cat.name}</Title>
                      <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 10 }}>Khám phá ngay</Paragraph>
                      <span className="cat-link">Xem ngay <ArrowRightOutlined /></span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>

      <section className="section home-featured">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
            <div>
              <Text strong style={{ color: 'var(--orange-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem' }}>Được Yêu Thích Nhất</Text>
              <Title level={2} style={{ margin: 0 }}>Sản Phẩm Nổi Bật</Title>
            </div>
            <Button type="link" onClick={() => onNavigate('products')} style={{ color: 'var(--text-secondary)' }}>
              Xem Tất Cả <ArrowRightOutlined />
            </Button>
          </div>
          <Row gutter={[20, 20]}>
            {featuredProds.map(p => (
              <Col xs={24} sm={12} md={6} key={p.id}>
                <ProductCard product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <Row gutter={[64, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} style={{ marginBottom: 12 }}>Minh Bạch Trong Từng Túi Hàng</Title>
              <Paragraph style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: 32 }}>
                Chúng tôi tin rằng bạn xứng đáng biết thực phẩm của mình đến từ đâu —
                nên chúng tôi chia sẻ toàn bộ hành trình từ trang trại đến bàn ăn của bạn.
              </Paragraph>
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <div className="trust-point">
                  <div className="trust-icon">🌱</div>
                  <div>
                    <Text strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Canh Tác Hữu Cơ</Text>
                    <Text type="secondary">Chỉ hợp tác với các trang trại sử dụng thực hành nông nghiệp hữu cơ và bền vững</Text>
                  </div>
                </div>
                <div className="trust-point">
                  <div className="trust-icon">🤝</div>
                  <div>
                    <Text strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Thương Mại Công Bằng</Text>
                    <Text type="secondary">Chúng tôi đảm bảo tính bền vững và công bằng cho người trồng trọt</Text>
                  </div>
                </div>
                <div className="trust-point">
                  <div className="trust-icon">🚚</div>
                  <div>
                    <Text strong style={{ fontSize: '1rem', display: 'block', marginBottom: 4 }}>Thương Mại Trực Tiếp</Text>
                    <Text type="secondary">Mua trực tiếp từ nhà sản xuất, giá tốt nhất đến tay bạn</Text>
                  </div>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <div className="trust-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500&q=80"
                  alt="Farmer holding produce"
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
