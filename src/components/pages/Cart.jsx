import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";

const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem, loading }) => {
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

  const getSubtotal = () => getTotalPrice();
  const getShipping = () => getTotalPrice() > 50 ? 0 : 9.99;
  const getTax = () => getTotalPrice() * 0.08;
  const getFinalTotal = () => getSubtotal() + getShipping() + getTax();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
        <Loading type="cart" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Empty
          title="Your cart is empty"
          message="Add some amazing products to get started with your shopping journey"
          actionText="Start Shopping"
          onAction={() => navigate("/")}
          icon="ShoppingCart"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-display"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl card-shadow p-6"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image || "/api/placeholder/120/120"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate font-display">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-body">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <ApperIcon name="Minus" size={20} />
                      </Button>
                      
                      <span className="w-12 text-center text-lg font-medium font-body">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                      >
                        <ApperIcon name="Plus" size={20} />
                      </Button>
                    </div>
                    
                    <div className="text-lg font-bold text-gray-900 font-display min-w-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-error hover:bg-error/10"
                      onClick={() => onRemoveItem(item.productId)}
                    >
                      <ApperIcon name="Trash2" size={20} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl card-shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between font-body">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(getSubtotal())}</span>
              </div>
              
              <div className="flex justify-between font-body">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {getShipping() === 0 ? "Free" : formatPrice(getShipping())}
                </span>
              </div>
              
              <div className="flex justify-between font-body">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(getTax())}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900 font-display">Total</span>
                  <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent font-display">
                    {formatPrice(getFinalTotal())}
                  </span>
                </div>
              </div>
            </div>
            
            {getShipping() > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-info/10 border border-info/20 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Truck" size={20} className="text-info" />
                  <p className="text-sm text-info font-body">
                    Add {formatPrice(50 - getSubtotal())} more for free shipping!
                  </p>
                </div>
              </motion.div>
            )}
            
            <Button
              size="lg"
              className="w-full gradient-primary text-white"
              onClick={handleCheckout}
            >
              <ApperIcon name="CreditCard" size={24} className="mr-2" />
              Proceed to Checkout
            </Button>
            
            <Button
              variant="ghost"
              className="w-full mt-3"
              onClick={() => navigate("/")}
            >
              <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;