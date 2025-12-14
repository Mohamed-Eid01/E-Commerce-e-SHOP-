import { Categories, mockData } from "../assets/mockData";
import heroImg from "../assets/Images/hero-page.png";
import InfoSection from "../comonents/INfoSection";
import CategorySection from "../comonents/CategorySection";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "../comonents/ProductCard";
import ProductCard from "../comonents/ProductCard";
import Shop from "./Shop";
import ArrowScroll from "../comonents/ArrowScroll";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, []);
  return (
    <div>
    <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
      <div className="container mx-auto py-4 flex flex-col md:flex-row gap-2.5 ">
        {/* Categories Section */}
        <div className="w-full md:w-3/12">
          <div className="bg-red-600 text-white text-xs font-bold px-2 py-2.5">
            Shop By Categories
          </div>
          <ul className="space-y-4 bg-gray-100 p-3 border-gray-100">
            {Categories.map((category, i) => (
              <li key={i} className="flex items-center text-sm font-medium">
                <p className="w-2 h-2 border border-red-500 rounded-full mr-2" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Section */}
        <div className="w-full md:w-9/12 mt-8 md:mt-0 h-96 relative">
          <img src={heroImg} alt="hero" className="h-full w-full" />
          <div className="absolute top-16 left-8">
            <p className="text-gray-600 mb-4">YOUR ONLINE SHOP</p>
            <h2 className="text-3xl font-bold">WELCOME TO E-SHOP</h2>
            <p className="text-xl mt-2.5 font-bold text-gray-800">
              MILLIONS+ PRODUCTS
            </p>
            <button className="bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <InfoSection />
      <CategorySection />

      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
          {products.products.map((product, index) => (
            <ProductCard product={product} key={index}/>
          ))}
        </div>
      </div>

    </div>
          <Shop />
          <ArrowScroll scrollAmount={100}/>
          </div>
  );
}

export default Home;
