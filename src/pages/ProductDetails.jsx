import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import StartRating from "../comonents/StartRating";
import { FaCarSide, FaQuestionCircle } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // لما المنتجات تتغير أو ييجي id جديد
  useEffect(() => {
    if (products.length === 0) return; // لو مفيش منتجات، متعملش حاجة
    const newProduct = products.find((p) => p._id === id);
    setProduct(newProduct);
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Product added to cart");
  };

  return (
    <div className="container mx-auto py-6 px-2 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-x-16">
        {/* Product Image */}
        <div className="md:w-1/2 shadow-md h-96 flex justify-center rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-3 shadow-md md:p-8 flex flex-col gap-y-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category || "Uncategorized"}
          </p>
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-2xl font-semibold text-red-600">
            ${product.price}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "Product description will go here."}
          </p>

          <StartRating maxRating={5} size={24} />

          <p className="text-gray-700">
            <span className="font-semibold">In Stock:</span> {product.stock}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            <button
              className="flex-1 bg-red-600 text-white py-2 px-4 hover:bg-red-800 rounded-lg transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <FaCarSide className="text-red-600 text-2xl mt-1" />
              <div>
                <p className="font-semibold text-gray-800">Fast Delivery</p>
                <p className="text-sm text-gray-600">
                  Free shipping within 2–5 business days
                </p>
              </div>
            </div>

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
