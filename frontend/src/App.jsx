import React, { useState } from 'react';
import { Navbar, Footer } from './components/Shared';
import HomePage from './components/Home';
import ProductsPage from './components/Products';
import ProductDetailPage from './components/ProductDetail';
import CartPage from './components/Cart';
import Checkout from './components/Checkout';
import { cartInitial } from './data/products';
import './index.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cart, setCart] = useState(cartInitial);

  const navigate = (page, data) => {
    if (page === 'product-detail') {
      setSelectedProduct(data);
    } else if (page === 'products') {
      setCategoryFilter(data || null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const showNavFooter = currentPage !== 'checkout';

  return (
    <div className="app">
      {showNavFooter && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigate}
          cartCount={cartCount}
        />
      )}

      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {currentPage === 'products' && (
          <ProductsPage
            onNavigate={navigate}
            onAddToCart={addToCart}
            initialCategory={categoryFilter}
          />
        )}
        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateCart={setCart}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout
            cart={cart}
            onNavigate={navigate}
          />
        )}
      </main>

      {showNavFooter && <Footer />}
    </div>
  );
}

export default App;
