import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LikesPage from './pages/LikesPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;