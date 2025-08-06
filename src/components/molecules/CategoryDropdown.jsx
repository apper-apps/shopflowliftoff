import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const CategoryDropdown = ({ categories = [], onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-300 font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ApperIcon name="Grid3X3" size={20} />
        <span>Categories</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-64 glassmorphism rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="py-2">
{categories.map((category, index) => (
                <motion.button
                  key={category.Id || category.id || index}
                  onClick={() => handleCategoryClick(category)}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Tag" size={16} />
                    <span>{category.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoryDropdown;