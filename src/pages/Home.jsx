import Categories from "../comonents/CategorySection"
import heroImg from "../assets/Images/hero-page.png";
import InfoSection from "../comonents/InfoSection";
import CategorySection from "../comonents/CategorySection";
import {  useDispatch, useSelector } from "react-redux";
import Product from "../comonents/ProductCard";
import ProductCard from "../comonents/ProductCard";
import Shop from "./Shop";
import ArrowScroll from "../comonents/ArrowScroll";
import { Link } from "react-router-dom";
import sidehero from "../assets/Images/sidehero.png";
import { useEffect } from "react";
import { fetchProducts } from "../redux/api/productApi";

function Home() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div>
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-col md:flex-row gap-2.5 ">
          {/* Categories Section */}
          <div className="w-full md:w-3/12 h-96">
            <div className="relative bg-gray-100 rounded-lg shadow-md h-full overflow-hidden flex items-center justify-center">
              <img
                src={sidehero}
                alt="Promotional Product"
                className="w-full h-full object-cover"
              />

              <div className=" absolute  bottom-0  bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 drop-shadow-lg">
                  Discover Your Unique Style
                </h2>
                <p className="text-white text-sm md:text-base lg:text-lg font-semibold mb-4 drop-shadow-md">
                  Premium quality products for every occasion
                </p>
                <p className="text-yellow-400 text-sm md:text-base font-bold drop-shadow-md">
                  Trendy. Affordable. Delivered Fast.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="w-full md:w-9/12 mt-6 md:mt-0 h-72 sm:h-80 md:h-96 relative rounded-lg overflow-hidden">
            <img
              src={heroImg}
              alt="hero"
              className="w-full h-full  rounded-lg"
            />
            <div className="absolute top-16 sm:top-18 md:top-24  left-4 sm:left-6  md:left-8 lg:left-12">
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2">
                YOUR ONLINE SHOP
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-1">
                WELCOME TO E-SHOP
              </h2>
              <p className="text-lg sm:text-xl md:text-xl font-bold text-gray-800 mt-1">
                MILLIONS+ PRODUCTS
              </p>
              <Link to="/shop">
                <button className=" cursor-pointer bg-red-600 px-6 sm:px-8 py-1.5 sm:py-2 mt-4 text-white rounded-lg hover:bg-red-700 transform transition-transform duration-300 hover:scale-105 text-sm sm:text-base md:text-lg">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
        <InfoSection />
        <CategorySection />

        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Shop />
      <ArrowScroll scrollAmount={100} />
    </div>
  );
}

export default Home;
