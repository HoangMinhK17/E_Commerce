import React from 'react';
import { formatPrice } from './Shared';
import { Button, Card, InputNumber, Table, Tag, Typography, Divider, Alert, Space, Result } from 'antd';
import { DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined, LockOutlined } from '@ant-design/icons';
import '../style/Cart.css';

const { Title, Text } = Typography;

const CartPage = ({ cart, onUpdateCart, onNavigate }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 35000;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    onUpdateCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id) => {
    onUpdateCart(cart.filter(item => item.id !== id));
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-wrap page-enter">
        <Result
          icon={<span style={{ fontSize: '4rem' }}>🛒</span>}
          title={<span style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Giỏ Hàng Trống</span>}
          subTitle="Bạn chưa có sản phẩm nào trong giỏ hàng."
          extra={
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => onNavigate('products')}
              className="cart-btn-primary"
            >
              Tiếp Tục Mua Sắm
            </Button>
          }
        />
      </div>
    );
  }

  const columns = [
    {
      title: 'Sản Phẩm',
      dataIndex: 'name',
      key: 'product',
      render: (_, item) => (
        <div className="cart-item-product">
          <div className="cart-item-img">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-tags">
              {item.tags && item.tags.map(t => (
                <Tag key={t} color="green" style={{ borderRadius: 12, fontSize: '0.72rem' }}>{t}</Tag>
              ))}
            </div>
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => removeItem(item.id)}
              className="cart-item-remove-btn"
            >
              Xóa
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 130,
      align: 'center',
      render: (qty, item) => (
        <InputNumber
          min={1}
          value={qty}
          onChange={(val) => updateQty(item.id, val)}
          size="middle"
          className="cart-qty-input"
        />
      ),
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
      key: 'price',
      width: 140,
      align: 'right',
      render: (price) => (
        <Text className="cart-unit-price">{formatPrice(price)}</Text>
      ),
    },
    {
      title: 'Thành Tiền',
      key: 'lineTotal',
      width: 160,
      align: 'right',
      render: (_, item) => (
        <Text strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
          {formatPrice(item.price * item.quantity)}
        </Text>
      ),
    },
  ];

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <div className="cart-header">
          <Title level={2} style={{ marginBottom: 4, color: 'var(--text-primary)' }}>
            Giỏ Hàng Của Bạn
          </Title>
          <Text type="secondary">Xem lại các lựa chọn từ vườn cây gia đình chúng tôi.</Text>
        </div>

        <div className="cart-layout">
          {/* CART ITEMS */}
          <div className="cart-items-section">
            <Table
              dataSource={cart}
              columns={columns}
              rowKey="id"
              pagination={false}
              className="cart-table"
              size="middle"
            />

            <div className="cart-actions">
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => onNavigate('products')}
                className="cart-continue-btn"
              >
                Tiếp Tục Mua Sắm
              </Button>
              <Button
                onClick={() => onUpdateCart([...cart])}
                className="cart-update-btn"
              >
                Cập Nhật Giỏ Hàng
              </Button>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="cart-summary-wrap">
            <Card className="cart-summary-card" title={
              <span className="cart-summary-title">Tổng Đơn Hàng</span>
            }>
              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <Text type="secondary">
                    Tạm tính ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
                  </Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </div>
                <div className="cart-summary-row">
                  <Text type="secondary">Phí Vận Chuyển</Text>
                  {shipping === 0 ? (
                    <Tag color="success" style={{ margin: 0, fontWeight: 600 }}>Miễn Phí</Tag>
                  ) : (
                    <Text>{formatPrice(shipping)}</Text>
                  )}
                </div>
                <div className="cart-summary-row">
                  <Text type="secondary">Thuế Ước Tính (8%)</Text>
                  <Text>{formatPrice(tax)}</Text>
                </div>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <div className="cart-summary-total-row">
                <Text strong style={{ fontSize: '1rem' }}>Tổng Cộng</Text>
                <span className="cart-total-amount">{formatPrice(total)}</span>
              </div>

              <Button
                type="primary"
                size="large"
                block
                icon={<LockOutlined />}
                onClick={() => onNavigate('checkout')}
                className="cart-checkout-btn"
              >
                Tiến Hành Thanh Toán
              </Button>

              {shipping > 0 && (
                <Alert
                  type="warning"
                  showIcon
                  style={{ marginBottom: 12 }}
                  message={
                    <span>
                      Mua thêm <strong>{formatPrice(500000 - subtotal)}</strong> để được miễn phí vận chuyển!
                    </span>
                  }
                />
              )}

              <Alert
                type="success"
                showIcon
                message={
                  <span style={{ fontSize: '0.82rem' }}>
                    🌱 Đơn hàng của bạn hỗ trợ cam kết của chúng tôi về nông nghiệp tái tạo và vận chuyển trung hòa carbon.
                  </span>
                }
                className="cart-eco-alert"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
