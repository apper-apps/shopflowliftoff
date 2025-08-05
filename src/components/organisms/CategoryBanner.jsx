import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CategoryBanner = ({ categories = [] }) => {
  const navigate = useNavigate();

  const categoryIcons = {
    "Electronics": "Smartphone",
    "Clothing": "Shirt",
    "Home & Garden": "Home",
    "Sports": "Dumbbell",
    "Books": "Book",
    "Beauty": "Sparkles",
    "Toys": "Gamepad2",
    "Automotive": "Car"
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-background via-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Shop by <span className="gradient-primary bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Discover amazing products across all our categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Button
                variant="ghost"
                onClick={() => handleCategoryClick(category)}
                className="w-full h-auto p-6 flex flex-col items-center space-y-4 bg-white rounded-2xl card-shadow card-hover border-0"
              >
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon
                    name={categoryIcons[category.name] || "Tag"}
                    size={32}
                    className="text-white"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 font-display">
                    {category.name}
                  </h3>
                  {category.productCount && (
                    <p className="text-sm text-gray-500 mt-1 font-body">
                      {category.productCount} items
                    </p>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;