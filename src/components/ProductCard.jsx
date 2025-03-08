import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import useStore from '../store/useStore';

const ProductCard = ({ product, showActions = true }) => {
  const toggleLike = useStore((state) => state.toggleLike);
  const addToCart = useStore((state) => state.addToCart);
  const likedProducts = useStore((state) => state.likedProducts);

  const isLiked = likedProducts.some((p) => p.id === product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">{product.price.toLocaleString()} so'm</p>
        {showActions && (
          <div className="product-card__actions">
            <button
              className="secondary"
              onClick={() => toggleLike(product)}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              className="primary"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;