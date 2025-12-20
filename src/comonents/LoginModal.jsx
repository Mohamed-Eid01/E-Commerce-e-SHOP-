import { useState } from "react";

function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8008/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Extract userId from response or token
      let userId = null;
      let tokenPayload = null;

      if (data.user && (data.user._id || data.user.id)) {
        userId = data.user._id || data.user.id;
      } else {
        // Extract userId from token
        try {
          if (data.token && data.token.split(".").length === 3) {
            tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
            userId =
              tokenPayload?.id ||
              tokenPayload?._id ||
              tokenPayload?.userId ||
              tokenPayload?.sub ||
              tokenPayload?.user_id;
          }
        } catch (err) {
          console.warn("Failed to extract userId from token:", err);
        }
      }

      // Create user data object
      const userData = data.user
        ? { ...data.user, token: data.token }
        : {
            _id: userId,
            id: userId,
            token: data.token,
            email: data.email || tokenPayload?.email || email,
          };

      // Store token separately as well
      localStorage.setItem("token", data.token);

      // Call success callback with user data
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 shadow-lg rounded-sm focus:ring-1 focus:ring-red-600 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 shadow-lg rounded-sm focus:ring-1 focus:ring-red-600 outline-none"
            />
          </div>

          {/* Remember + Forget */}
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">Remember Me</span>
            </label>

            <button
              type="button"
              className="text-red-700 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-sm hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup */}
        <div className="text-center mt-4">
          <span className="text-gray-700">Don't have an account? </span>
          <button
            type="button"
            className="text-red-700 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
