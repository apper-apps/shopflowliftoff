import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CartBadge = ({ itemCount = 0, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-3 text-gray-700 hover:text-primary transition-colors duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name="ShoppingCart" size={24} />
      
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1"
          >
            <Badge variant="error" className="text-xs px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartBadge;