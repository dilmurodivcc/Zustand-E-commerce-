import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Edit2, Trash2 } from 'lucide-react';

const AdminPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const { products, addProduct, removeProduct, updateProduct } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: editingProduct || crypto.randomUUID(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
    };

    if (editingProduct) {
      updateProduct(editingProduct, product);
      setEditingProduct(null);
    } else {
      addProduct(product);
    }

    setFormData({ name: '', price: '', image: '', description: '' });
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setEditingProduct(id);
      setFormData({
        name: product.name,
        price: String(product.price),
        image: product.image,
        description: product.description,
      });
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</h2>
        <div className="form__group">
          <label htmlFor="name">Nomi</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="price">Narxi</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="image">Rasm URL</label>
          <input
            type="url"
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="description">Tavsif</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="form__submit">
          {editingProduct ? "Saqlash" : "Qo'shish"}
        </button>
      </form>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-card__image" />
            <div className="product-card__content">
              <h3 className="product-card__title">{product.name}</h3>
              <p className="product-card__price">{product.price.toLocaleString()} so'm</p>
              <div className="product-card__actions">
                <button
                  className="secondary"
                  onClick={() => handleEdit(product.id)}
                >
                  <Edit2 size={20} />
                </button>
                <button
                  className="secondary"
                  onClick={() => removeProduct(product.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;