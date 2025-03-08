import React from 'react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

const LikesPage = () => {
  const likedProducts = useStore((state) => state.likedProducts);

  if (likedProducts.length === 0) {
    return (
      <EmptyState
        title="Sevimli mahsulotlar yo'q"
        description="Siz hali hech qanday mahsulotni sevimlilar ro'yxatiga qo'shmagansiz"
      />
    );
  }

  return (
    <div className="container">
      <div className="product-grid">
        {likedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LikesPage;