function Register({openLogin}) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 ">Name</label>
            <input
              placeholder="Enter Name"
              type="text"
              className="w-full px-3 py-2 border  border-gray-300 shadow-lg outline-none rounded-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              placeholder="Enter Email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Password</label>
            <input
              placeholder="Enter the Password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor=""> ConfirmPassword</label>
            <input
              placeholder="Enter the Password again"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-sm"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center ">
          <span className="text-gray-700">Already have an account?</span>
          <button onClick={openLogin} className="text-red-800">
            Login
          </button>
        </div>
      </div>
    );
}

export default Register
