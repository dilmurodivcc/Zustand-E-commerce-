import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Home, User } from 'lucide-react';
import useStore from '../store/useStore';

const Header = () => {
  const cartItems = useStore((state) => state.cartItems);
  const likedProducts = useStore((state) => state.likedProducts);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage')); // ✅ Header komponentini avtomatik yangilash
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__container container">
        <NavLink to="/" className="header__logo">
          <Package size={32} />
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/">
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/likes">
            <Heart size={20} /> Favorite ({likedProducts.length})
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCart size={20} /> Cart ({cartItems.length})
          </NavLink>
          <NavLink to="/admin" style={{ display: isLoggedIn ? 'block' : 'none' }}>
            <Package size={20} /> Add Page
          </NavLink>
          <NavLink to="/profile" style={{ display: isLoggedIn ? 'block' : 'none' }}>
            <User size={20} /> Profile
          </NavLink>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
             Log Out
            </button>
          ) : (
            <NavLink to="/login">
              <User size={20} /> Log In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
