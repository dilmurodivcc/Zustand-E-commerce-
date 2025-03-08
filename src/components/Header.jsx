import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Home } from 'lucide-react';
import useStore from '../store/useStore';

const Header = () => {
  const cartItems = useStore((state) => state.cartItems);
  const likedProducts = useStore((state) => state.likedProducts);

  return (
    <header className="header">
      <div className="header__container container">
        <NavLink to="/" className="header__logo">
          <Package size={32} />
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/">
            <Home size={20} /> Bosh sahifa
          </NavLink>
          <NavLink to="/likes">
            <Heart size={20} /> Sevimlilar ({likedProducts.length})
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCart size={20} /> Savatcha ({cartItems.length})
          </NavLink>
          <NavLink to="/admin">
            <Package size={20} /> Mahsulotlar
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;