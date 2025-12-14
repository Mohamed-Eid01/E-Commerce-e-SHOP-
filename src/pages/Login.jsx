function Login({openSignUp}) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            placeholder="Enter Email"
            type="email"
            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="Enter the Password"
          />
        </div>

        {/* Remember + Forget */}
        <div className="mb-4 flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-gray-700">Remember Me</span>
          </label>

          <a href="#" className="text-red-700 hover:underline text-sm">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-sm hover:bg-red-700 transition"
          >
            Login
          </button>
        </div>
      </form>

      {/* Signup Link */}
      <div className="text-center mt-4">
        <span className="text-gray-700">Don't have an account? </span>
        <button
          onClick={openSignUp}
          className="text-red-700 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
