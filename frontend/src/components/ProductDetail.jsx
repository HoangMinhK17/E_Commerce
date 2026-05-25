import React, { useState } from 'react';
import { getProducts } from '../utils/productApi';
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
  Radio,
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
  const [related, setRelated] = useState([]);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

  const currentType = (product.types && product.types.length > selectedTypeIndex) ? product.types[selectedTypeIndex] : null;
  const displayPrice = currentType ? currentType.salePrice : product.price;
  const displayOriginalPrice = currentType ? currentType.salePrice * 1.2: product.originalPrice;
  const stockQuantity = currentType ? currentType.quantity : 999;

  React.useEffect(() => {
    const fetchRelated = async () => {
      try {
        const prods = await getProducts();
        if (Array.isArray(prods)) {
          const mappedProds = prods.map(p => ({
            id: p._id || p.id,
            name: p.name,
            image: Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : (p.image || ''),
            images: Array.isArray(p.image) && p.image.length > 0 ? p.image : [p.image || ''],
            price: p.type && p.type.length > 0 ? p.type[0].salePrice : (p.price || 0),
            originalPrice: p.type && p.type.length > 0 ? p.type[0].salePrice * 1.2: null,
            rating: p.rating || 5,
            reviewCount: p.reviewCount || 10,
            category: p.category?.name || p.category || '',
            badge: p.badge || '',
            shortDesc: p.description ? p.description.substring(0, 50) + '...' : '',
            types: p.type || []
          }));
          setRelated(mappedProds.filter(p => p.id !== product.id).slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching related products", error);
      }
    };
    fetchRelated();
  }, [product.id]);

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      id: currentType ? `${product.id}-${currentType.size}` : product.id,
      selectedSize: currentType ? currentType.size : null,
      price: displayPrice,
      originalPrice: displayOriginalPrice,
    };
    onAddToCart(cartProduct, qty);
    message.success('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    const cartProduct = {
      ...product,
      id: currentType ? `${product.id}-${currentType.size}` : product.id,
      selectedSize: currentType ? currentType.size : null,
      price: displayPrice,
      originalPrice: displayOriginalPrice,
    };
    onAddToCart(cartProduct, qty);
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

      <div className="container detail-main">
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

        <div className="detail-info">
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

          <div className="detail-price-row">
            <span className="detail-price">{formatPrice(displayPrice)}</span>
            {displayOriginalPrice && (
              <Text delete type="secondary" style={{ fontSize: '1.1rem' }}>
                {formatPrice(displayOriginalPrice)}
              </Text>
            )}
          </div>

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
            {product.types && product.types.length > 0 && (
              <div className="detail-size-wrap">
                <Text strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Chọn Kích Cỡ / Phân Loại
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Radio.Group 
                    value={selectedTypeIndex} 
                    onChange={e => {
                      setSelectedTypeIndex(e.target.value);
                      setQty(1);
                    }}
                  >
                    <Space wrap>
                      {product.types.map((type, idx) => (
                        <Radio.Button 
                          key={idx} 
                          value={idx}
                          disabled={type.quantity <= 0}
                        >
                          {type.size}
                        </Radio.Button>
                      ))}
                    </Space>
                  </Radio.Group>
                  <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Còn lại: <Text strong>{stockQuantity}</Text> sản phẩm
                  </div>
                </div>
              </div>
            )}

            <div className="detail-qty-wrap">
              <Text strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Chọn Số Lượng
              </Text>
              <InputNumber
                min={1}
                max={stockQuantity > 0 ? stockQuantity : 1}
                value={qty}
                onChange={val => setQty(val || 1)}
                style={{ width: 100 }}
                size="middle"
                disabled={stockQuantity <= 0}
              />
            </div>

            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              block
              className="detail-add-btn"
              onClick={handleAddToCart}
              disabled={stockQuantity <= 0}
            >
              Thêm Vào Giỏ
            </Button>

            <Button
              icon={<ThunderboltOutlined />}
              size="large"
              block
              className="detail-buy-btn"
              onClick={handleBuyNow}
              disabled={stockQuantity <= 0}
            >
              Mua Ngay
            </Button>

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
