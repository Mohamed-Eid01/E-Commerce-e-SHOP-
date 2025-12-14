import { useEffect, useState } from "react";
import { FaCarSide, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice"; // ★ لازم تضيف ده

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

    alert("Product added to cart successfully!");
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
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
        <div className="md:w-1/2 p-4 shadow-md md:p-16 flex flex-col gap-y-2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.name}
          </h2>

          <p className="text-xl font-semibold text-gray-800 mb-4">
            ${product.price}
          </p>

          {/* Quantity & Add */}
          <div className="flex items-center mb-4 gap-x-2">
            <button
              className="bg-red-600 text-white py-1.5 px-4 hover:bg-red-800"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Other Info */}
          <div className="flex flex-col gap-y-4 mt-4">
            <p className="flex items-center">
              <FaCarSide className="mr-2" />
              Delivery & Return
            </p>
            <p className="flex items-center">
              <FaQuestionCircle className="mr-2" />
              Ask a Question
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <p className="text-gray-600">
              {product.description || "Product description will go here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
