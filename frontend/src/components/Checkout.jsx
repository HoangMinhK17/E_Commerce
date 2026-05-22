import React, { useState } from 'react';
import { formatPrice } from './Shared';
import { Button, Card, Form, Input, Radio, Row, Col, Steps, Typography, Divider, Alert, Result, Space } from 'antd';
import { LockOutlined, HomeOutlined, CheckCircleOutlined, SafetyOutlined } from '@ant-design/icons';
import '../style/Checkout.css';

const { Title, Text } = Typography;

const Checkout = ({ cart, onNavigate }) => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', postalCode: '',
    paymentMethod: 'cod',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 35000;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success page-enter">
        <Card className="checkout-success-card">
          <Result
            status="success"
            title="Đặt Hàng Thành Công!"
            subTitle="Cảm ơn bạn đã tin tưởng Harvest & Hearth. Đơn hàng sẽ được xử lý trong vòng 24 giờ."
            extra={[
              <div key="order-num" className="checkout-order-number">
                Mã đơn hàng: <strong>#HH{Math.floor(Math.random() * 90000 + 10000)}</strong>
              </div>,
              <Button
                key="home"
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                onClick={() => onNavigate('home')}
                className="checkout-home-btn"
              >
                Về Trang Chủ
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="checkout-page page-enter">
      {/* CHECKOUT TOP BAR */}
      <div className="checkout-topbar">
        <div className="checkout-topbar-logo" onClick={() => onNavigate('home')}>
          <span className="checkout-topbar-logo-icon">🌿</span>
          Harvest &amp; Hearth
        </div>
        <div className="checkout-topbar-steps">
          <Steps
            current={0}
            size="small"
            items={[
              { title: 'CHECKOUT' },
              { title: 'CONFIRMATION' },
            ]}
          />
        </div>
        <div className="checkout-topbar-secure">
          <LockOutlined /> <span>Secure Checkout</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* LEFT COLUMN: FORM */}
          <div className="checkout-form-col">
            {/* Section 1: Shipping Info */}
            <div className="checkout-section">
              <div className="checkout-section-num">1</div>
              <div className="checkout-section-content">
                <Title level={4} className="checkout-section-title">
                  Thông Tin Giao Hàng
                </Title>
                <Form layout="vertical" component="div">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Tên">
                        <Input
                          name="firstName"
                          placeholder="vd: Nguyễn"
                          value={form.firstName}
                          onChange={handleChange}
                          size="large"
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Họ">
                        <Input
                          name="lastName"
                          placeholder="vd: Văn A"
                          value={form.lastName}
                          onChange={handleChange}
                          size="large"
                          required
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Địa Chỉ Email">
                    <Input
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={handleChange}
                      size="large"
                      required
                    />
                  </Form.Item>
                  <Form.Item label="Địa Chỉ Giao Hàng">
                    <Input
                      name="address"
                      placeholder="Số nhà, tên đường, phường/xã"
                      value={form.address}
                      onChange={handleChange}
                      size="large"
                      required
                    />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Tỉnh / Thành Phố">
                        <Input
                          name="city"
                          placeholder="Hà Nội"
                          value={form.city}
                          onChange={handleChange}
                          size="large"
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Mã Bưu Chính">
                        <Input
                          name="postalCode"
                          placeholder="10000"
                          value={form.postalCode}
                          onChange={handleChange}
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="checkout-section">
              <div className="checkout-section-num">2</div>
              <div className="checkout-section-content">
                <Title level={4} className="checkout-section-title">
                  Phương Thức Thanh Toán
                </Title>
                <Radio.Group
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="checkout-payment-group"
                >
                  <label className={`checkout-payment-card ${form.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <Radio value="cod" />
                    <div className="checkout-payment-card-icon">💵</div>
                    <div className="checkout-payment-card-info">
                      <Text strong>Thanh Toán Khi Nhận Hàng (COD)</Text>
                      <Text type="secondary" className="checkout-payment-card-desc">
                        Thanh toán bằng tiền mặt khi đơn hàng được giao đến tay bạn.
                      </Text>
                    </div>
                  </label>
                  <label className={`checkout-payment-card ${form.paymentMethod === 'bank' ? 'selected' : ''}`}>
                    <Radio value="bank" />
                    <div className="checkout-payment-card-icon">🏦</div>
                    <div className="checkout-payment-card-info">
                      <Text strong>Chuyển Khoản Ngân Hàng</Text>
                      <Text type="secondary" className="checkout-payment-card-desc">
                        Chuyển khoản trực tiếp vào tài khoản công ty. Giao hàng sau khi xác minh.
                      </Text>
                    </div>
                  </label>
                </Radio.Group>
              </div>
            </div>

            {/* Terms Notice */}
            <Alert
              type="warning"
              showIcon
              message={
                <span>
                  Bằng cách hoàn tất đơn hàng, bạn đồng ý với{' '}
                  <a href="#" style={{ color: 'var(--orange-primary)', fontWeight: 600 }}>
                    Điều Khoản Dịch Vụ
                  </a>{' '}
                  và xác nhận chính sách bảo mật của chúng tôi.
                  Đơn hàng sẽ được xử lý trong vòng 24 giờ.
                </span>
              }
              className="checkout-terms-alert"
            />
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="checkout-summary-col">
            <Card className="checkout-summary-card">
              <Title level={4} className="checkout-summary-title">
                Tóm Tắt Đơn Hàng
              </Title>
              <Divider style={{ margin: '0 0 20px 0' }} />

              {/* Cart Items */}
              <div className="checkout-items-list">
                {cart.map(item => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="checkout-item-info">
                      <Text strong className="checkout-item-name">{item.name}</Text>
                      <Text type="secondary" className="checkout-item-meta">
                        Trọng lượng: {item.weight} | SL: {item.quantity}
                      </Text>
                    </div>
                    <Text strong className="checkout-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Price Rows */}
              <div className="checkout-price-rows">
                <div className="checkout-price-row">
                  <Text type="secondary">Tạm Tính</Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </div>
                <div className="checkout-price-row">
                  <Text type="secondary">Vận Chuyển (Tiêu Chuẩn)</Text>
                  <Text style={shipping === 0 ? { color: 'var(--green-accent)', fontWeight: 700 } : { fontWeight: 600 }}>
                    {shipping === 0 ? 'MIỄN PHÍ' : formatPrice(shipping)}
                  </Text>
                </div>
                <div className="checkout-price-row">
                  <Text type="secondary">Thuế Ước Tính</Text>
                  <Text>{formatPrice(tax)}</Text>
                </div>
              </div>

              <Divider />

              {/* Total */}
              <div className="checkout-total-row">
                <Text strong style={{ fontSize: '1rem' }}>Tổng Cộng</Text>
                <span className="checkout-total-amount">{formatPrice(total)}</span>
              </div>

              {/* Submit Button */}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="checkout-submit-btn"
              >
                Đặt Hàng Ngay →
              </Button>

              {/* Trust Badges */}
              <Divider style={{ margin: '16px 0' }} />
              <div className="checkout-trust-badges">
                <div className="checkout-trust-badge">
                  <span className="checkout-trust-badge-icon">🌿</span>
                  <span>100% Hữu Cơ</span>
                </div>
                <div className="checkout-trust-badge">
                  <span className="checkout-trust-badge-icon">♻️</span>
                  <span>Không Nhựa</span>
                </div>
                <div className="checkout-trust-badge">
                  <span className="checkout-trust-badge-icon">🛡️</span>
                  <span>An Toàn</span>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
