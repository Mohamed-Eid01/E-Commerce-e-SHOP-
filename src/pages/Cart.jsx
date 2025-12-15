import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../assets/Images/emptycart.png";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "../comonents/Modal";
import ChangeAddress from "../comonents/ChangeAddress";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      {cart.products.length > 0 ? (
        <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
          <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>

          <div className="flex flex-col md:flex-row justify-between md:space-x-10 space-y-6 md:space-y-0 mt-8">
            {/* Products Section */}
            <div className="w-full md:w-2/3">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:flex justify-between border-b border-gray-300 shadow-sm items-center mb-4 text-xs font-bold">
                <p>Product</p>
                <div className="flex space-x-8">
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                  <p>Remove</p>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-4">
                {cart.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm gap-4"
                  >
                    {/* Product Image & Name */}
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

                    {/* Price, Quantity, Subtotal, Remove */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-end gap-3 sm:gap-6 md:gap-12 w-full sm:w-auto">
                      {/* Price */}
                      <div className="flex justify-between items-center w-full sm:w-auto">
                        <span className="text-xs text-gray-600 md:hidden font-semibold mr-2">
                          Price:
                        </span>
                        <p className="text-sm">${product.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center w-full sm:w-auto">
                        <span className="text-xs text-gray-600 md:hidden font-semibold mr-2">
                          Quantity:
                        </span>
                        <div className="flex justify-center items-center border border-gray-300 shadow-sm rounded">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                            className="text-lg sm:text-xl font-bold px-2 sm:px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <p className="px-3 sm:px-4 text-sm sm:text-base">
                            {product.quantity}
                          </p>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                            className="text-lg sm:text-xl px-2 sm:px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex justify-between items-center w-full sm:w-auto">
                        <span className="text-xs text-gray-600 md:hidden font-semibold mr-2">
                          Subtotal:
                        </span>
                        <p className="text-sm sm:text-base font-semibold">
                          ${(product.quantity * product.price).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <div className="flex justify-between items-center w-full sm:w-auto">
                        <span className="text-xs text-gray-600 md:hidden font-semibold mr-2">
                          Remove:
                        </span>
                        <button
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="text-red-500 hover:text-red-700 p-2"
                          aria-label="Remove item"
                        >
                          <FaTrashAlt className="text-base sm:text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="w-full md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-300 h-fit sticky top-4">
              <h3 className="text-base sm:text-lg font-semibold mb-5">
                Cart Total
              </h3>

              <div className="flex justify-between mb-5 pb-3 border-b border-gray-300">
                <span className="text-sm">Total Items:</span>
                <span className="font-semibold">{cart.totalQuantity}</span>
              </div>

              {/* <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="text-sm mb-2">Shipping:</p>
                <p className="text-sm ml-2 mb-2">
                  Shipping to: <span className="font-bold">{address}</span>
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-500 hover:underline text-sm ml-2"
                >
                  Change address
                </button>
              </div> */}

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-red-600">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-red-600 text-white py-2.5 sm:py-3 rounded hover:bg-red-800 transition-colors text-sm sm:text-base font-semibold"
              >
                Proceed to checkout
              </button>
            </div>
          </div>

          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <ChangeAddress
              setAddress={setAddress}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <img
            src={EmptyCart}
            alt="Empty cart"
            className="w-full max-w-md h-auto"
          />
          <p className="text-lg text-gray-600 mt-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
