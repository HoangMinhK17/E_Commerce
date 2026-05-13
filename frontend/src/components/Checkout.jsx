import React, { useState } from 'react';
import { formatPrice } from './Shared';
import '../style/Checkout.css';

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
      <div className="order-success page-enter">
        <div className="order-success-card">
          <div className="success-icon">✅</div>
          <h2 className="success-title">Đặt Hàng Thành Công!</h2>
          <p className="success-sub">
            Cảm ơn bạn đã tin tưởng Harvest &amp; Hearth.<br/>
            Đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ.
          </p>
          <div className="success-order-num">
            Mã đơn hàng: <strong>#HH{Math.floor(Math.random()*90000+10000)}</strong>
          </div>
          <button className="btn-primary" onClick={() => onNavigate('home')}>
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-enter">
      {/* CHECKOUT HEADER */}
      <div className="checkout-topbar">
        <span className="navbar-logo" onClick={() => onNavigate('home')} style={{cursor:'pointer'}}>
          Harvest &amp; Hearth
        </span>
        <div className="checkout-steps">
          <span className="checkout-step active">CHECKOUT</span>
          <span className="checkout-step-line">————</span>
          <span className="checkout-step">CONFIRMATION</span>
        </div>
        <div className="checkout-secure">
          🔒 <span>Secure Checkout</span>
        </div>
      </div>

      <div className="container">
        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* LEFT: FORM */}
          <div className="checkout-form-col">
            {/* SHIPPING */}
            <div className="checkout-section">
              <div className="checkout-section-num">1</div>
              <div className="checkout-section-content">
                <h2 className="checkout-section-title">Thông Tin Giao Hàng</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Tên</label>
                    <input
                      className="form-input"
                      name="firstName"
                      placeholder="vd: Nguyễn"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Họ</label>
                    <input
                      className="form-input"
                      name="lastName"
                      placeholder="vd: Văn A"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Địa Chỉ Email</label>
                  <input
                    className="form-input"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Địa Chỉ Giao Hàng</label>
                  <input
                    className="form-input"
                    name="address"
                    placeholder="Số nhà, tên đường, phường/xã"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Tỉnh / Thành Phố</label>
                    <input
                      className="form-input"
                      name="city"
                      placeholder="Hà Nội"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mã Bưu Chính</label>
                    <input
                      className="form-input"
                      name="postalCode"
                      placeholder="10000"
                      value={form.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="checkout-section">
              <div className="checkout-section-num">2</div>
              <div className="checkout-section-content">
                <h2 className="checkout-section-title">Phương Thức Thanh Toán</h2>
                <div className="payment-options">
                  <label className={`payment-option ${form.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-body">
                      <div className="payment-option-icon">💵</div>
                      <div>
                        <strong>Thanh Toán Khi Nhận Hàng (COD)</strong>
                        <p>Thanh toán bằng tiền mặt khi đơn hàng được giao đến tay bạn.</p>
                      </div>
                    </div>
                  </label>
                  <label className={`payment-option ${form.paymentMethod === 'bank' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={form.paymentMethod === 'bank'}
                      onChange={handleChange}
                    />
                    <div className="payment-option-body">
                      <div className="payment-option-icon">🏦</div>
                      <div>
                        <strong>Chuyển Khoản Ngân Hàng</strong>
                        <p>Chuyển khoản trực tiếp vào tài khoản công ty. Giao hàng sau khi xác minh.</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* TERMS */}
            <div className="checkout-terms">
              <span className="terms-icon">ℹ️</span>
              <p>
                Bằng cách hoàn tất đơn hàng, bạn đồng ý với{' '}
                <a href="#" style={{color:'var(--orange-primary)'}}>Điều Khoản Dịch Vụ</a>{' '}
                và xác nhận chính sách bảo mật của chúng tôi.
                Đơn hàng sẽ được xử lý trong vòng 24 giờ.
              </p>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="checkout-summary-col">
            <div className="checkout-summary">
              <h3 className="checkout-summary-title">Tóm Tắt Đơn Hàng</h3>
              <div className="checkout-items">
                {cart.map(item => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="checkout-item-info">
                      <div className="checkout-item-name">{item.name}</div>
                      <div className="checkout-item-meta">
                        Trọng lượng: {item.weight} | SL: {item.quantity}
                      </div>
                    </div>
                    <div className="checkout-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout-summary-rows">
                <div className="checkout-row">
                  <span>Tạm Tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="checkout-row">
                  <span>Vận Chuyển (Tiêu Chuẩn)</span>
                  <span style={{color: shipping === 0 ? '#3d6b2c' : undefined, fontWeight:600}}>
                    {shipping === 0 ? 'MIỄN PHÍ' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="checkout-row">
                  <span>Thuế Ước Tính</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="checkout-total-row">
                <span>Tổng Cộng</span>
                <span className="checkout-total-amount">{formatPrice(total)}</span>
              </div>
              <button type="submit" className="btn-primary checkout-place-btn">
                Đặt Hàng Ngay →
              </button>
              <div className="checkout-badges">
                <div className="checkout-badge-item">
                  <span>🌿</span>
                  <span>100% Hữu Cơ</span>
                </div>
                <div className="checkout-badge-item">
                  <span>♻️</span>
                  <span>Không Nhựa</span>
                </div>
                <div className="checkout-badge-item">
                  <span>🛡️</span>
                  <span>An Toàn</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
