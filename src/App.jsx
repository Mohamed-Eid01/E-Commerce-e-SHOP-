import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./comonents/Navbar";
import Footer from "./comonents/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { IoBagCheckOutline } from "react-icons/io5";
import Checkout from "./pages/Checkout";
import { useEffect, useState } from "react";
import Order from "./pages/Order";
import FilterData from "./pages/FilterData";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsCondition";
import CategoryPage from "./pages/CategoryPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/api/productApi";
function App() {
  const [order, setOrder] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
        <Route path="/order" element={<Order order={order} />} />
        <Route path="/filter-data" element={<FilterData />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
