import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {setSearchTerm}from '../redux/productSlice'

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [isLogin,setIsLogin]=useState(true);
  const [search,setSearch]=useState('');
  const dispatch= useDispatch();
  const navigate=useNavigate()

  function openSignUp (){
    setIsLogin(false);
    setIsModalOpen(true);

  }
  function openLogin (){
    setIsLogin(true);
    setIsModalOpen(true);
  }
  function handelSearch(e){
e.preventDefault()

  if (!search || search.trim() === "") {
    return;
  }
dispatch(setSearchTerm(search));
    navigate("/filter-data");
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">e-SHOP</Link>
        </div>
        <div className="relative flex-1 mx-4 ">
          <form onSubmit={handelSearch}>
            <input
            onChange={(e)=>setSearch(e.target.value)}
              type="text"
              placeholder="Search Product"
              className="w-full rounded-md border-gray-500 shadow-md py-2 px-4"
            />
            <FaSearch className="absolute top-3 right-3 text-red-500"></FaSearch>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg" />
            <span className="absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white">
              {products.length > 0 && products.length}
            </span>
          </Link>
          <button
            className="hidden md:block"
            onClick={() => setIsModalOpen(true)}
          >
            Login | Regitser
          </button>
          <button
            className="block md:hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <FaUser />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </div>
      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        {isLogin ? <Login openSignUp={openSignUp} /> : <Register openLogin={openLogin} />}
      </Modal>
    </nav>
  );
}

export default Navbar;
