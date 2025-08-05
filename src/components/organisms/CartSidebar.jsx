import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";

const CartSidebar = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem, loading }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-display">
                Shopping Cart
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ApperIcon name="X" size={24} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <Loading type="cart" />
              ) : cartItems.length === 0 ? (
                <Empty
                  title="Your cart is empty"
                  message="Add some products to get started"
                  actionText="Start Shopping"
                  onAction={() => {
                    onClose();
                    navigate("/");
                  }}
                  icon="ShoppingCart"
                />
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <img
                        src={item.image || "/api/placeholder/80/80"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate font-display">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-body">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        >
                          <ApperIcon name="Minus" size={16} />
                        </Button>
                        
                        <span className="w-8 text-center font-medium font-body">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          <ApperIcon name="Plus" size={16} />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-error hover:bg-error/10"
                        onClick={() => onRemoveItem(item.productId)}
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 font-display">
                    Total
                  </span>
                  <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent font-display">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <Button
                  className="w-full gradient-primary text-white"
                  onClick={handleCheckout}
                >
                  <ApperIcon name="CreditCard" size={20} className="mr-2" />
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;