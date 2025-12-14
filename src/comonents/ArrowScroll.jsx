import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ArrowScroll() {
  const [showArrow, setShowArrow] = useState(false);

  // تابع يظهر السهم بعد تجاوز طول الشاشة
  const checkScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // تابع للضغط على السهم للعودة لأول الصفحة
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showArrow && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 bg-white p-3 rounded-full shadow-md hover:bg-red-500 z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default ArrowScroll;
