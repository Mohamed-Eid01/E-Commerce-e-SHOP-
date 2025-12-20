// Cart.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import EmptyCart from "../assets/Images/emptycart.png";
import { setCart } from "../redux/cartSlice";
import * as api from "../redux/api/cartApi";
import LoginModal from "../comonents/LoginModal";

function Cart() {
  const dispatch = useDispatch();
  const { products, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Helper to get user data
  const getUser = () => {
    try {
      // First, try to get user object from localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && (user._id || user.id) && user.token) {
          return user;
        }
      }

      // Fallback: check if token exists and try to get userId from token
      const token = localStorage.getItem("token");
      if (token && token.trim()) {
        try {
          // Decode JWT token to get userId
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const userId =
              payload?.id ||
              payload?._id ||
              payload?.userId ||
              payload?.sub ||
              payload?.user_id;
            if (userId) {
              // Create user object from token
              return {
                _id: userId,
                id: userId,
                token: token.trim(),
              };
            }
          }
        } catch (e) {
          console.warn("Failed to decode token:", e);
        }
      }
      return null;
    } catch (err) {
      console.error("Error getting user:", err);
      return null;
    }
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    // Simple check: if token exists, consider logged in
    const token = localStorage.getItem("token");
    if (token && token.trim()) {
      const user = getUser();
      // If we can get user data, use it; otherwise just having token is enough
      if (user && (user._id || user.id)) {
        return true;
      }
      // Even if we can't decode userId, if token exists, try to use it
      // The API will validate the token
      return true;
    }
    return false;
  };

  // Fetch cart data
  useEffect(() => {
    if (!isLoggedIn()) return;

    const user = getUser();
    if (!user || !user._id || !user.token) {
      console.warn("User data incomplete, cannot fetch cart");
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await api.getCart(user._id, user.token.trim());
        dispatch(
          setCart({
            products: data.products || [],
            totalQuantity: data.totalQuantity || 0,
            totalPrice: data.totalPrice || 0,
          })
        );
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, [dispatch]);

  // Update cart after modification
  const refreshCart = async () => {
    if (!isLoggedIn()) return;
    const user = getUser();
    if (!user || !user._id || !user.token) {
      console.warn("User data incomplete, cannot refresh cart");
      return;
    }
    try {
      const data = await api.getCart(user._id, user.token.trim());
      dispatch(
        setCart({
          products: data.products || [],
          totalQuantity: data.totalQuantity || 0,
          totalPrice: data.totalPrice || 0,
        })
      );
    } catch (err) {
      console.error("Failed to refresh cart:", err);
    }
  };

  // Increase quantity
  const handleIncrease = async (productId, currentQty) => {
    if (!isLoggedIn()) {
      setIsLoginModalOpen(true);
      return;
    }
    const user = getUser();
    if (!user || !user._id) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      await api.updateCartItem(
        user._id,
        user.token.trim(),
        productId,
        currentQty + 1
      );
      await refreshCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
      // If API call fails due to auth, show login modal
      if (err.message?.includes("401") || err.message?.includes("token")) {
        setIsLoginModalOpen(true);
      }
    }
  };

  // Decrease quantity
  const handleDecrease = async (productId, currentQty) => {
    if (!isLoggedIn()) {
      setIsLoginModalOpen(true);
      return;
    }
    if (currentQty <= 1) return;
    const user = getUser();
    if (!user || !user._id) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      await api.updateCartItem(
        user._id,
        user.token.trim(),
        productId,
        currentQty - 1
      );
      await refreshCart();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
      if (err.message?.includes("401") || err.message?.includes("token")) {
        setIsLoginModalOpen(true);
      }
    }
  };

  // Remove item
  const handleRemove = async (productId) => {
    if (!isLoggedIn()) {
      setIsLoginModalOpen(true);
      return;
    }
    const user = getUser();
    if (!user || !user._id) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      await api.removeCartItem(user._id, user.token.trim(), productId);
      await refreshCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
      if (err.message?.includes("401") || err.message?.includes("token")) {
        setIsLoginModalOpen(true);
      }
    }
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
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            setIsLoginModalOpen(false);
            // Refresh cart after login
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
        />
      )}
    </div>
  );
}

export default Cart;
