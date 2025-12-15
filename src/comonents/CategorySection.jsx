import ManCategory from "../assets/Images/man.png";
import WomanCategory from "../assets/Images/woman.png";
import KidCategory from "../assets/Images/kid.png";
import { useNavigate } from "react-router-dom";

function CategorySection() {
  const categories = [
    { title: "Men", imageUrl: ManCategory },
    { title: "Women", imageUrl: WomanCategory },
    { title: "Kids", imageUrl: KidCategory },
  ];
    const navigate = useNavigate();

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative h-64 rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <img
            src={category.imageUrl}
            alt={category.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h3 className="text-white text-2xl font-bold drop-shadow-md mb-2">
              {category.title}
            </h3>
            <button
              onClick={() => navigate(`/category/${category.title}`)}
              className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-md hover:bg-red-800 transition"
            >
              View All
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySection;
