import { FaHeadset, FaLock, FaShippingFast, FaTag } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

function InfoSection() {
  const infoItems = [
    {
      icon: <FaShippingFast className="text-3xl text-red-600" />,
      title: "Free Shipping",
      description: "Get your order delivered free",
    },
    {
      icon: <FaHeadset className="text-3xl text-red-600" />,
      title: "24/7 Support",
      description: "We are here to help you",
    },
    {
      icon: <FaMoneyBill1Wave className="text-3xl text-red-600" />,
      title: "100% Money Back",
      description: "Full refund if you are not satisfied",
    },
    {
      icon: <FaLock className="text-3xl text-red-600" />,
      title: "Secure Payment",
      description: "Your payment information is safe with us",
    },
    {
      icon: <FaTag className="text-3xl text-red-600" />,
      title: "Best Prices",
      description: "We offer competitive prices on all products",
    },
  ];
  return (
    <div className="bg-white pb-8 pt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {infoItems.map((item, index) => (
          <div
            className="flex flex-col items-center text-center p-4 border-gray-50 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            key={index}
          >
            {item.icon}
            <h3 className="mt-4 text-x1 font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoSection;
