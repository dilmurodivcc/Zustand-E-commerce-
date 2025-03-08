import React from 'react';
import useStore from '../store/useStore';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

const HomePage = () => {
  const products = useStore((state) => state.products);

  if (products.length === 0) {
    return (
      <EmptyState
        title="Mahsulotlar mavjud emas"
        description="Hozircha hech qanday mahsulot qo'shilmagan"
      />
    );
  }

  return (
    <div className="container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;