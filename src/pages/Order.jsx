import { useNavigate } from "react-router-dom";

function Order({order}) {
    const navigate=useNavigate();
    if(!order) return;
    return (
      <div className="container mx-auto py-8 px-4 md:px-16 lg:px-24">
        <h2 className="text-2xl font-semibold mb-4">
          Thank you for your order
        </h2>
        <p>You Order has been placed successfully</p>
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2 ">Order summary</h3>
          <p>Order Number : {order.orderNumber}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 ">
              Shipping Information
            </h4>
            <p>{order.shippingInformation.name}</p>
            <p>{order.shippingInformation.address}</p>
            <p>{order.shippingInformation.city}</p>
            <p>{order.shippingInformation.zipcode}</p>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-semibold mt-2">Products Ordered</h4>
            {order.products.map((product, index) => (
              <div key={index} className="flex justify-between mt-2">
                <p>
                  {product.name} x ({product.quantity})
                </p>
                <p>{product.price * product.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span>Total Price:</span>
            <span className="font-semibold">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <button className="mr-4 bg-green-500 text-white py-2 px-4 hover:bg-green-600">
            Track Order
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 hover:bg-red-800"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
}

export default Order
