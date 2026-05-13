import React, { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import { ProductCard, Stars, formatPrice } from './Shared';
import '../style/Products.css';

const ProductsPage = ({ onNavigate, onAddToCart, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Tất Cả Sản Phẩm');
  const [priceMax, setPriceMax] = useState(300000);
  const [minRating, setMinRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const allTags = ['Hữu Cơ', 'Thuần Chay', 'Không Đường'];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'Tất Cả Sản Phẩm') {
      list = list.filter(p => p.category === selectedCategory);
    }
    list = list.filter(p => p.price <= priceMax);
    if (minRating > 0) list = list.filter(p => p.rating >= minRating);
    if (selectedTags.length > 0) {
      list = list.filter(p => selectedTags.some(t => p.tags.includes(t)));
    }
    if (sortBy === 'price-asc') list.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a,b) => b.rating - a.rating);
    return list;
  }, [selectedCategory, priceMax, minRating, selectedTags, sortBy]);

  const CATS_UI = ['Tất Cả Sản Phẩm', 'Trái Cây Sấy', 'Hỗn Hợp Hạt', 'Hạt Rang'];

  return (
    <div className="products-page page-enter">
      <div className="products-hero">
        <div className="container">
          <h1 className="products-hero-title">Bộ Sưu Tập Của Chúng Tôi</h1>
          <p className="products-hero-sub">
            Khám phá tuyển chọn tinh tế những trái cây sấy và hỗn hợp hạt thủ công,
            tìm nguồn trực tiếp từ các vườn cây truyền thống và lò rang quy mô nhỏ.
          </p>
        </div>
      </div>

      <div className="container products-layout">
        {/* SIDEBAR */}
        <aside className="products-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Danh Mục</div>
            {CATS_UI.map(cat => (
              <label key={cat} className="sidebar-check">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Khoảng Giá</div>
            <input
              type="range"
              min={50000}
              max={300000}
              step={10000}
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-range-labels">
              <span>50.000đ</span>
              <span style={{color:'var(--orange-primary)', fontWeight:600}}>
                {formatPrice(priceMax)}
              </span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Đánh Giá</div>
            {[4, 3].map(r => (
              <label key={r} className="sidebar-check">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(minRating === r ? 0 : r)}
                />
                <div className="sidebar-stars">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{color: i <= r ? '#f59e0b' : '#ddd', fontSize:'0.9rem'}}>★</span>
                  ))}
                  <span style={{fontSize:'0.8rem', color:'var(--text-muted)', marginLeft:4}}>
                    &amp; lên
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Chế Độ Ăn</div>
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="products-main">
          <div className="products-toolbar">
            <span className="products-count">
              Hiển thị <strong>{filtered.length}</strong> sản phẩm tinh tuyển
            </span>
            <div className="sort-wrap">
              <label>Sắp xếp:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
                <option value="featured">Nổi Bật Trước</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
                <option value="rating">Đánh Giá Cao Nhất</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-products">
              <span>🍃</span>
              <p>Không tìm thấy sản phẩm phù hợp.</p>
              <button className="btn-outline" onClick={() => {
                setSelectedCategory('Tất Cả Sản Phẩm');
                setPriceMax(300000);
                setMinRating(0);
                setSelectedTags([]);
              }}>Xóa Bộ Lọc</button>
            </div>
          ) : (
            <div className="products-grid-3col">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="pagination">
            <button className="page-btn">‹</button>
            {[1,2,3].map(p => (
              <button
                key={p}
                className={`page-btn ${currentPage === p ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <span className="page-ellipsis">...</span>
            <button className="page-btn">12</button>
            <button className="page-btn">›</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
