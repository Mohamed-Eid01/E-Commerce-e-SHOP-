import { useState } from "react";

function Register({ openLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); 

    try {
      const res = await fetch("http://localhost:8008/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter the Password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter the Password again"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 shadow-lg outline-none rounded-sm"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="text-center">
        <span className="text-gray-700">Already have an account?</span>
        <button onClick={openLogin} className="text-red-800 ml-1">
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
