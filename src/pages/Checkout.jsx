import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout({setOrder}) {
  const [billingToggle, setBillingToggle] = useState(false);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingInfo,setShippingInfo]=useState({
    address:"",
    city:"",
    zipcode:""
  });
  const cart = useSelector((state) => state.cart);
  const navigate=useNavigate();
  function handleOrder() {
    const newOrder = {
      products: cart.products,
      orderNumber: "1234",
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
    };
    setOrder(newOrder);
    navigate("/order");
  }
  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
      <div className="flex flex-col md:flex-row justify-between space-x-10 mt-8">
        {/* Products Section */}
        <div className="md:w-2/3">
          <div className="border border-gray-300 shadow-md p-2 mb-6 rounded-sm">
            <div
              className="flex items-center justify-between"
              onClick={() => setBillingToggle((prev) => !prev)}
            >
              <h3 className="text-lg font-semibold mb-2">
                Billing Information
              </h3>
              {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${billingToggle ? "" : "hidden"}`}>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Text"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                />
              </div>
            </div>
          </div>
          <div className="border border-gray-300 shadow-md p-2 mb-6 rounded-sm">
            <div
              className="flex items-center justify-between"
              onClick={() => setShippingToggle((prev) => !prev)}
            >
              <h3 className="text-lg font-semibold mb-2">
                Shipping Information
              </h3>
              {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${shippingToggle ? "" : "hidden"}`}>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Adress"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter City"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="zipcode" className="block text-gray-700">
                  Zip code
                </label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Enter Zip code"
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      zipcode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="border border-gray-300 shadow-md p-2 mb-6 rounded-sm">
            <div
              className="flex items-center justify-between"
              onClick={() => setPaymentToggle((prev) => !prev)}
            >
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`space-y-4 ${paymentToggle ? "" : "hidden"}`}>
              <div>
                <div className="flex justify-start items-center mb-2">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    className="mr-1"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label htmlFor="cash" className="block text-gray-700">
                    Cash on delivery
                  </label>
                </div>
                <div className="flex justify-start items-center mb-2">
                  <input
                    type="radio"
                    id="Credit-Card"
                    name="payment"
                    className="mr-1"
                    checked={paymentMethod === "cc"}
                    onChange={() => setPaymentMethod("cc")}
                  />
                  <label htmlFor="Credit-Card" className="block text-gray-700">
                    Credit Card
                  </label>
                </div>
              </div>
              {paymentMethod === "cc" && (
                <div className=" bg-gray-100  p-4 rounded-lg mb-4 ">
                  <h3>Debit Card Information</h3>
                  <div className="mb-4">
                    <label
                      htmlFor="card-number"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="card-number"
                      placeholder="Enter Card Number"
                      required
                      className="border border-gray-400 p-2 w-full rounded "
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cardholder"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Card Holder Name
                    </label>
                    <input
                      name="cardholder"
                      type="text"
                      required
                      placeholder="Enter Card Holder Name"
                      className="border border-gray-400 p-2 w-full rounded "
                    />
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="w-1/2 mr-2">
                      <label
                        htmlFor="expiredate"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Expire Date
                      </label>
                      <input
                        name="expiredate"
                        type="text"
                        placeholder="MM/YY"
                        className="border border-gray-400 p-2 w-full rounded"
                        required
                      />
                    </div>
                    <div className="w-1/2 ml-2">
                      <label
                        htmlFor=""
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border border-gray-400 p-2 w-full rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-300 ">
          <h3 className="text-lg font-semibold mb-4">Order Summery</h3>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div key={product.id} className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-md font-semibold">{product.name}</h4>
                    <p className="text-gray-600">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-gray-800">
                  ${product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-400  pt-4">
            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="font-semibold">
                ${cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <button onClick={handleOrder} className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
