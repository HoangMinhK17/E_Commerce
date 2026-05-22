import React, { useState, useMemo } from 'react';
import {
  Card, Radio, Slider, Rate, Tag, Select, Pagination,
  Empty, Button, Row, Col, Typography, Divider, Space,
} from 'antd';
import { FilterOutlined, DeleteOutlined } from '@ant-design/icons';
import { products } from '../data/products';
import { ProductCard, formatPrice } from './Shared';
import '../style/Products.css';

const { Title, Paragraph, Text } = Typography;
const { CheckableTag } = Tag;

const CATEGORIES = ['Tất Cả Sản Phẩm', 'Trái Cây Sấy', 'Hỗn Hợp Hạt', 'Hạt Rang'];
const DIET_TAGS = ['Hữu Cơ', 'Thuần Chay', 'Không Đường'];
const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Nổi Bật' },
  { value: 'price-asc', label: 'Giá Thấp → Cao' },
  { value: 'price-desc', label: 'Giá Cao → Thấp' },
  { value: 'rating', label: 'Đánh Giá Cao' },
];

const ProductsPage = ({ onNavigate, onAddToCart, initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Tất Cả Sản Phẩm');
  const [priceMax, setPriceMax] = useState(300000);
  const [minRating, setMinRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleTag = (tag, checked) => {
    setSelectedTags(prev =>
      checked ? [...prev, tag] : prev.filter(t => t !== tag)
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('Tất Cả Sản Phẩm');
    setPriceMax(300000);
    setMinRating(0);
    setSelectedTags([]);
    setSortBy('featured');
    setCurrentPage(1);
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
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCategory, priceMax, minRating, selectedTags, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div className="products-page page-enter">
      {/* ========== HERO BANNER ========== */}
      <section className="products-hero">
        <div className="container">
          <Title
            level={1}
            className="products-hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}
          >
            Bộ Sưu Tập Của Chúng Tôi
          </Title>
          <Paragraph
            className="products-hero-sub"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: 580,
              margin: '0 auto',
              lineHeight: 1.8,
              fontSize: '1rem',
            }}
          >
            Khám phá tuyển chọn tinh tế những trái cây sấy và hỗn hợp hạt thủ công,
            tìm nguồn trực tiếp từ các vườn cây truyền thống và lò rang quy mô nhỏ.
          </Paragraph>
        </div>
      </section>

      {/* ========== LAYOUT ========== */}
      <div className="container products-layout">
        {/* ---- SIDEBAR ---- */}
        <aside className="products-sidebar">
          <Card
            className="sidebar-card"
            styles={{ body: { padding: 24 } }}
          >
            {/* Category Filter */}
            <div className="sidebar-section">
              <Text className="sidebar-label" strong>
                <FilterOutlined style={{ marginRight: 6 }} />
                Danh Mục
              </Text>
              <Radio.Group
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="sidebar-radio-group"
              >
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  {CATEGORIES.map(cat => (
                    <Radio key={cat} value={cat} className="sidebar-radio-item">
                      {cat}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <Divider className="sidebar-divider" />

            {/* Price Filter */}
            <div className="sidebar-section">
              <Text className="sidebar-label" strong>Khoảng Giá</Text>
              <Slider
                min={50000}
                max={300000}
                step={10000}
                value={priceMax}
                onChange={val => {
                  setPriceMax(val);
                  setCurrentPage(1);
                }}
                tooltip={{ formatter: val => formatPrice(val) }}
                className="price-slider"
              />
              <div className="price-range-labels">
                <Text type="secondary" style={{ fontSize: '0.8rem' }}>
                  {formatPrice(50000)}
                </Text>
                <Text strong style={{ fontSize: '0.85rem', color: 'var(--orange-primary)' }}>
                  {formatPrice(priceMax)}
                </Text>
              </div>
            </div>

            <Divider className="sidebar-divider" />

            {/* Rating Filter */}
            <div className="sidebar-section">
              <Text className="sidebar-label" strong>Đánh Giá</Text>
              <Radio.Group
                value={minRating}
                onChange={e => {
                  setMinRating(e.target.value === minRating ? 0 : e.target.value);
                  setCurrentPage(1);
                }}
                className="sidebar-radio-group"
              >
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  {[4, 3].map(r => (
                    <Radio
                      key={r}
                      value={r}
                      className="sidebar-radio-item"
                      onClick={() => { if (minRating === r) setMinRating(0); }}
                    >
                      <span className="sidebar-rating-option">
                        <Rate disabled defaultValue={r} style={{ fontSize: 14 }} />
                        <Text type="secondary" style={{ fontSize: '0.78rem', marginLeft: 4 }}>
                          &amp; lên
                        </Text>
                      </span>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <Divider className="sidebar-divider" />

            {/* Diet Tags Filter */}
            <div className="sidebar-section sidebar-section-last">
              <Text className="sidebar-label" strong>Chế Độ Ăn</Text>
              <div className="tag-filters">
                {DIET_TAGS.map(tag => (
                  <CheckableTag
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={checked => toggleTag(tag, checked)}
                    className="diet-tag"
                  >
                    {tag}
                  </CheckableTag>
                ))}
              </div>
            </div>
          </Card>
        </aside>

        {/* ---- MAIN CONTENT ---- */}
        <main className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <Text className="products-count" style={{ color: 'var(--text-secondary)' }}>
              Hiển thị <Text strong style={{ color: 'var(--orange-primary)' }}>{filtered.length}</Text> sản phẩm tinh tuyển
            </Text>
            <Select
              value={sortBy}
              onChange={val => setSortBy(val)}
              options={SORT_OPTIONS}
              className="sort-select"
              style={{ width: 180 }}
              variant="outlined"
            />
          </div>

          {/* Product Grid or Empty State */}
          {filtered.length === 0 ? (
            <div className="products-empty-wrap">
              <Empty
                description={
                  <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                    Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
                  </span>
                }
              >
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={resetFilters}
                  className="reset-filters-btn"
                  size="large"
                >
                  Xóa Bộ Lọc
                </Button>
              </Empty>
            </div>
          ) : (
            <>
              <Row gutter={[20, 20]}>
                {paginatedProducts.map(p => (
                  <Col key={p.id} xs={24} sm={12} lg={8}>
                    <ProductCard
                      product={p}
                      onNavigate={onNavigate}
                      onAddToCart={onAddToCart}
                    />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {filtered.length > PAGE_SIZE && (
                <div className="products-pagination">
                  <Pagination
                    current={currentPage}
                    total={filtered.length}
                    pageSize={PAGE_SIZE}
                    onChange={page => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
