// Cart.jsx
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import EmptyCart from "../assets/Images/emptycart.png";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { products, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );


  // Increase quantity
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Decrease quantity
  const handleDecrease = (productId, currentQty) => {
    dispatch(decreaseQuantity(productId));
  };

  // Remove item
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <img
          src={EmptyCart}
          alt="Empty cart"
          className="w-full max-w-md h-auto"
        />
        <p className="text-lg text-gray-600 mt-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24 min-h-96">
      <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>

      <div className="flex flex-col md:flex-row justify-between md:space-x-10 space-y-6 md:space-y-0 mt-8">
        {/* Products */}
        <div className="w-full md:w-2/3 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm gap-4"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm sm:text-lg font-semibold">
                    {product.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-end gap-3 sm:gap-6 md:gap-12 w-full sm:w-auto">
                <p className="text-sm">${product.price}</p>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleDecrease(product.id, product.quantity)}
                    className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <p className="px-3">{product.quantity}</p>
                  <button
                    onClick={() => handleIncrease(product.id, product.quantity)}
                    className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm sm:text-base font-semibold">
                  ${(product.quantity * product.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FaTrashAlt className="text-base sm:text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300 h-fit sticky top-4">
          <h3 className="text-base sm:text-lg font-semibold mb-5">
            Cart Total
          </h3>
          <div className="flex justify-between mb-5 pb-3 border-b border-gray-300">
            <span>Total Items:</span>
            <span className="font-semibold">{totalQuantity}</span>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold">
            <span>Total Price:</span>
            <span className="text-red-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
  );
}

export default Cart;
