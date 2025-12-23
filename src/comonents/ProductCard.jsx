import { FaStar } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success("Product added to cart");
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image */}
        <div className="w-full h-52 bg-gray-50 flex items-center justify-center ">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-cover w-full"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {product.categoryId.name || "General"}
          </p>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-xl font-bold text-red-600">${product.price}</p>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="cursor-pointer px-4 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
