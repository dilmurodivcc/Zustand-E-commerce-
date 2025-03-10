import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin, Alert, BackTop } from "antd";
import useStore from "../store/useStore";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import API from "../API";
import { Heart, ShoppingCart } from "lucide-react";

const fetchProducts = async ({ queryKey }) => {
  const [_key, page, pageSize] = queryKey;
  const res = await API.get(`/products`, {
    params: { limit: pageSize, skip: (page - 1) * pageSize },
  });
  return res.data;
};

const HomePage = () => {
  const toggleLike = useStore((state) => state.toggleLike);
  const addToCart = useStore((state) => state.addToCart);
  const customProducts = useStore((state) => state.products);
  const likedProducts = useStore((state) => state.likedProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, pageSize],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, pageSize]);
  if (isLoading)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  if (isError)
    return <Alert message="Error loading products!" type="error" showIcon />;
  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  return (
    <div className="container">
      {products.length === 0 ? (
        <EmptyState
          title="Mahsulotlar mavjud emas"
          description="Hozircha hech qanday mahsulot qo'shilmagan"
        />
      ) : (
        <>
          <h1>Recent Products</h1>
          <div className="product-grid">
            {customProducts.length === 0 ? <h3>No recent products😓</h3> : customProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            )) }
          </div>
          <h1>All Products</h1>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="product-card__image"
                />
                <div className="product-card__content">
                  <h3 className="product-card__title">{product.name}</h3>
                  <p className="product-card__price">
                    {product.price.toLocaleString()} so'm
                  </p>
                  <div className="btns">
                    <button
                      className="secondary"
                      onClick={() => toggleLike(product)}
                    >
                      <Heart
                        size={20}
                        fill={
                          likedProducts.some((p) => p.id === product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                    <button
                      className="primary"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            showSizeChanger
            onShowSizeChange={(_, size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onChange={(page) => setCurrentPage(page)}
            className="pagination"
          />
          <BackTop>
            <div className="back-to-top">↑</div>
          </BackTop>
        </>
      )}
    </div>
  );
};
export default HomePage;
