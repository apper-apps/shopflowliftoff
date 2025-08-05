import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const RatingStars = ({ rating = 0, reviewCount = 0, size = 16, showCount = true }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalfFilled = i === Math.ceil(rating) && rating % 1 !== 0;
    
    stars.push(
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        className="relative"
      >
        <ApperIcon
          name="Star"
          size={size}
          className={`${
            isFilled || isHalfFilled ? "text-accent fill-current" : "text-gray-300"
          } transition-colors duration-200`}
        />
        {isHalfFilled && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${(rating % 1) * 100}%` }}
          >
            <ApperIcon
              name="Star"
              size={size}
              className="text-accent fill-current"
            />
          </div>
        )}
      </motion.div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {stars}
      </div>
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-gray-600 font-body">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;