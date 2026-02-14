import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/homepage';
import AllProducts from './Pages/AllProducts';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Wishlist from './Pages/Wishlist';
import Profile from './Pages/Profile';
import Orders from './Pages/Orders';
import Address from './Pages/Address';
import Admin from './Pages/Admin';
import Register from './Pages/Register';
import EditProfile from './Pages/EditProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/address" element={<Address />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
