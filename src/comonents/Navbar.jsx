import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { setSearchTerm } from "../redux/productSlice";

function Navbar() {
  const cartProducts = useSelector((state) => state.cart.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔐 Auth check (بدون Redux)
  const isLoggedIn = !!localStorage.getItem("token");

  // --------------------
  // Auth handlers
  // --------------------
  const openLogin = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const openSignUp = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // --------------------
  // Search
  // --------------------
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    dispatch(setSearchTerm(search));
    navigate("/filter-data");
    setSearch("");
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      {/* Top Navbar */}
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold hover:text-red-600 transition"
        >
          e-SHOP
        </Link>

        {/* Search */}
        <div className="relative flex-1 mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Product"
              className="w-full rounded-md border-2 border-gray-300 focus:border-red-600 focus:outline-none shadow-md py-2 px-4"
            />
            <button type="submit">
              <FaSearch className="absolute top-3 right-3 hover:text-red-600 cursor-pointer" />
            </button>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart" className="relative hover:text-red-600 transition">
            <FaShoppingCart className="text-lg" />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs w-4 h-4 bg-red-600 rounded-full flex justify-center items-center text-white">
                {cartProducts.length}
              </span>
            )}
          </Link>

          {/* Desktop Auth */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block text-red-600 font-bold hover:text-red-800 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="hidden md:block hover:text-red-600 transition"
            >
              Login
            </button>
          )}

          {/* Mobile Auth */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block md:hidden text-red-600 hover:text-red-800 transition"
            >
              <FaUser />
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="block md:hidden hover:text-red-600 transition"
            >
              <FaUser />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:text-red-600">
          Home
        </Link>
        <Link to="/shop" className="hover:text-red-600">
          Shop
        </Link>
        <Link to="/contact" className="hover:text-red-600">
          Contact
        </Link>
        <Link to="/about" className="hover:text-red-600">
          About
        </Link>
      </div>

      {/* Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Modal>
    </nav>
  );
}

export default Navbar;
