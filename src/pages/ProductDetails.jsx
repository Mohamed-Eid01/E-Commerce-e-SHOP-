import { useEffect, useState } from "react";
import { FaCarSide, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice"; // ★ لازم تضيف ده
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const newProduct = products.find((product) => product.id === parseInt(id));
    setProduct(newProduct);
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
      })
    );
toast("Product added to cart", {
  className: "custom-red-toast",
});
  }

  return (
    <div className="container mx-auto py-6 px-2 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-x-16">
        {/* Product Image */}
        <div className="md:w-1/2 py-4 shadow-md md:px-8 h-96 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-3 shadow-md md:p-8 flex flex-col gap-y-4">
          {/* Category */}
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category || "Uncategorized"}
          </p>

          {/* Product Name */}
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>

          {/* Price */}
          <p className="text-2xl font-semibold text-red-600">
            ${product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description || "Product description will go here."}
          </p>

          {/* Stock */}
          <p className="text-gray-700">
            <span className="font-semibold">In Stock: 30</span> {product.stock}
          </p>

          {/* Add to Cart */}
          <div className="mt-2">
            <button
              className="w-full bg-red-600 text-white py-2 px-4 hover:bg-red-800 rounded-lg transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <FaCarSide className="text-red-600 text-2xl mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Fast Delivery</p>
                <p className="text-sm text-gray-600">
                  Free shipping within 2–5 business days
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <FaQuestionCircle className="text-red-600 text-2xl mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Need Help?</p>
                <p className="text-sm text-gray-600">
                  Contact our support team anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
