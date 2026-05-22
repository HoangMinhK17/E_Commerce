import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard, formatPrice } from './Shared';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Image,
  InputNumber,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
  Divider,
} from 'antd';
import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  CarOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import '../style/ProductDetail.css';

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage = ({ product, onNavigate, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    onAddToCart(product, qty);
    message.success('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    onAddToCart(product, qty);
    onNavigate('checkout');
  };

  const nutritionItems = [
    { label: 'Calories', value: product.nutritionFacts.calories },
    { label: 'Chất Xơ', value: product.nutritionFacts.dietaryFiber },
    { label: 'Kali', value: product.nutritionFacts.potassium },
    { label: 'Khẩu Phần', value: product.nutritionFacts.servingSize },
  ];

  return (
    <div className="product-detail-page page-enter">
      {/* BREADCRUMB */}
      <div className="detail-breadcrumb">
        <div className="container">
          <Breadcrumb
            items={[
              {
                title: (
                  <span className="breadcrumb-link" onClick={() => onNavigate('home')}>
                    <HomeOutlined style={{ marginRight: 4 }} />
                    Trang Chủ
                  </span>
                ),
              },
              {
                title: (
                  <span
                    className="breadcrumb-link"
                    onClick={() => onNavigate('products', product.category)}
                  >
                    {product.category}
                  </span>
                ),
              },
              {
                title: <span className="breadcrumb-current">{product.name}</span>,
              },
            ]}
          />
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="container detail-main">
        {/* LEFT: IMAGE GALLERY */}
        <div className="detail-images">
          <Image.PreviewGroup items={product.images}>
            <div className="detail-img-main">
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                preview={{ mask: 'Xem ảnh lớn' }}
              />
            </div>
          </Image.PreviewGroup>

          <div className="detail-img-thumbs">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`detail-img-thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="detail-info">
          {/* Badges */}
          <Space size={8} wrap>
            {product.badge && (
              <Tag
                color={product.badgeColor || '#b45309'}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: 'none',
                  padding: '4px 12px',
                }}
              >
                {product.badge}
              </Tag>
            )}
            {product.tags.map(tag => (
              <Tag
                key={tag}
                style={{
                  background: 'transparent',
                  border: '1.5px solid var(--border-mid)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '3px 10px',
                }}
              >
                {tag}
              </Tag>
            ))}
          </Space>

          {/* Title */}
          <Title
            level={2}
            style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </Title>

          {/* Price */}
          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <Text delete type="secondary" style={{ fontSize: '1.1rem' }}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </div>

          {/* Rating */}
          <Space size={10} align="center">
            <Rate
              disabled
              allowHalf
              defaultValue={product.rating}
              style={{ fontSize: 16, color: '#f59e0b' }}
            />
            <Text type="secondary" style={{ fontSize: '0.85rem' }}>
              ({product.reviewCount} đánh giá)
            </Text>
          </Space>

          {/* Description */}
          <Paragraph
            style={{
              fontSize: '0.93rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {product.description}
          </Paragraph>

          {/* Features */}
          <ul className="detail-features">
            {product.features.map((f, i) => (
              <li key={i} className="detail-feature">
                <CheckCircleOutlined
                  style={{ color: 'var(--green-accent)', fontSize: 16 }}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Purchase Card */}
          <Card
            className="detail-purchase-card"
            styles={{
              body: {
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              },
            }}
          >
            {/* Quantity */}
            <div className="detail-qty-wrap">
              <Text strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Chọn Số Lượng
              </Text>
              <InputNumber
                min={1}
                value={qty}
                onChange={val => setQty(val || 1)}
                style={{ width: 100 }}
                size="middle"
              />
            </div>

            {/* Action Buttons */}
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              block
              className="detail-add-btn"
              onClick={handleAddToCart}
            >
              Thêm Vào Giỏ
            </Button>

            <Button
              icon={<ThunderboltOutlined />}
              size="large"
              block
              className="detail-buy-btn"
              onClick={handleBuyNow}
            >
              Mua Ngay
            </Button>

            {/* Trust Items */}
            <Divider style={{ margin: '4px 0' }} />
            <div className="detail-trust-row">
              <Space size={4}>
                <CarOutlined style={{ color: 'var(--text-muted)' }} />
                <Text type="secondary" style={{ fontSize: '0.78rem' }}>
                  Miễn phí vận chuyển &gt;500k
                </Text>
              </Space>
              <Space size={4}>
                <SafetyOutlined style={{ color: 'var(--text-muted)' }} />
                <Text type="secondary" style={{ fontSize: '0.78rem' }}>
                  Thanh Toán An Toàn
                </Text>
              </Space>
            </div>
          </Card>

          {/* Nutrition Accordion */}
          <Collapse
            className="detail-nutrition-collapse"
            defaultActiveKey={['nutrition']}
            expandIconPosition="end"
            items={[
              {
                key: 'nutrition',
                label: (
                  <Text strong style={{ fontSize: '0.95rem' }}>
                    Thông Tin Dinh Dưỡng
                  </Text>
                ),
                children: (
                  <div className="nutrition-grid">
                    {nutritionItems.map(item => (
                      <div key={item.label} className="nutrition-item">
                        <Text
                          type="secondary"
                          style={{
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 600,
                          }}
                        >
                          {item.label}
                        </Text>
                        <Text strong style={{ fontSize: '0.95rem' }}>
                          {item.value}
                        </Text>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section className="detail-related">
        <div className="container">
          <div className="related-header">
            <Title
              level={3}
              style={{
                fontFamily: "'Playfair Display', serif",
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Bạn Có Thể Thích
            </Title>
            <Button type="link" onClick={() => onNavigate('products')} className="related-view-all">
              Xem Tất Cả →
            </Button>
          </div>
          <Row gutter={[20, 20]}>
            {related.map(p => (
              <Col key={p.id} xs={24} sm={12} md={6}>
                <ProductCard product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
