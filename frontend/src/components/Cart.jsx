import React from 'react';
import { formatPrice } from './Shared';
import '../style/Cart.css';

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
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Giỏ Hàng Trống</h2>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <button className="btn-primary" onClick={() => onNavigate('products')}>
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Giỏ Hàng Của Bạn</h1>
          <p className="cart-sub">Xem lại các lựa chọn từ vườn cây gia đình chúng tôi.</p>
        </div>

        <div className="cart-layout">
          {/* ITEMS */}
          <div className="cart-items">
            {/* TABLE HEADER */}
            <div className="cart-table-head">
              <span>Sản Phẩm</span>
              <span>Số Lượng</span>
              <span>Đơn Giá</span>
              <span>Thành Tiền</span>
            </div>

            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-product">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">
                      {item.tags.map(t => (
                        <span key={t} className="cart-item-tag">{t}</span>
                      ))}
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-price">{formatPrice(item.price)}</div>
                <div className="cart-item-total" style={{fontWeight:700, color:'var(--text-primary)'}}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <button className="cart-continue" onClick={() => onNavigate('products')}>
                ← Tiếp Tục Mua Sắm
              </button>
              <button
                className="btn-outline"
                onClick={() => onUpdateCart([...cart])}
              >
                Cập Nhật Giỏ Hàng
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2 className="cart-summary-title">Tổng Đơn Hàng</h2>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Tạm tính ({cart.reduce((s,i) => s+i.quantity, 0)} sản phẩm)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Phí Vận Chuyển</span>
                <span style={{color: shipping === 0 ? '#3d6b2c' : undefined, fontWeight: 600}}>
                  {shipping === 0 ? 'Miễn Phí' : formatPrice(shipping)}
                </span>
              </div>
              <div className="cart-summary-row">
                <span>Thuế Ước Tính (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="cart-summary-total">
              <span>Tổng Cộng</span>
              <span className="cart-total-amount">{formatPrice(total)}</span>
            </div>

            <button
              className="btn-primary cart-checkout-btn"
              onClick={() => onNavigate('checkout')}
            >
              🔒 Tiến Hành Thanh Toán
            </button>

            {shipping > 0 && (
              <div className="cart-free-shipping-hint">
                💡 Mua thêm <strong>{formatPrice(500000 - subtotal)}</strong> để được miễn phí vận chuyển!
              </div>
            )}

            <div className="cart-eco-note">
              <span className="cart-eco-icon">🌱</span>
              <p>Đơn hàng của bạn hỗ trợ cam kết của chúng tôi về nông nghiệp tái tạo và vận chuyển trung hòa carbon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
