import React from 'react';
import useStore from '../store/useStore';
import EmptyState from '../components/EmptyState';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const cartItems = useStore((state) => state.cartItems);
  const updateCartItemQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Savatcha bo'sh"
        description="Siz hali hech qanday mahsulot qo'shmagansiz"
      />
    );
  }

  return (
    <div className="container">
      <div className="cart">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item__image" />
            <div className="cart-item__content">
              <h3 className="cart-item__title">{item.name}</h3>
              <p className="cart-item__price">
                {item.price.toLocaleString()} so'm
              </p>
              <div className="cart-item__quantity">
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  <Minus size={20} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity + 1)
                  }
                >
                  <Plus size={20} />
                </button>
                <button
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart__summary">
          <div className="cart__summary-total">
            Jami: {total.toLocaleString()} so'm
          </div>
          <button className="cart__summary-button">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;