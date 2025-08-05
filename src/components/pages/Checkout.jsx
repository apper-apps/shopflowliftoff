import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { toast } from "react-toastify";

const Checkout = ({ cartItems = [], onOrderComplete }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      onOrderComplete?.();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${orderId}`);
      
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="ShoppingCart" size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 font-body">
            Add some products to proceed with checkout
          </p>
          <Button onClick={() => navigate("/")} className="gradient-primary text-white">
            <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-display"
      >
        Checkout
      </motion.h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl card-shadow p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">
              <ApperIcon name="Truck" size={24} className="inline mr-2" />
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  City
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  State
                </label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  ZIP Code
                </label>
                <Input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </motion.section>

          {/* Payment Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl card-shadow p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">
              <ApperIcon name="CreditCard" size={24} className="inline mr-2" />
              Payment Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Card Number
                </label>
                <Input
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Expiry Date
                </label>
                <Input
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  CVV
                </label>
                <Input
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Name on Card
                </label>
                <Input
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </motion.section>
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
            
            {/* Order Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4">
                  <img
                    src={item.image || "/api/placeholder/60/60"}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate font-display">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 font-body">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 font-body">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Pricing */}
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
            
            <Button
              type="submit"
              size="lg"
              className="w-full gradient-primary text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ApperIcon name="Lock" size={24} className="mr-2" />
                  Place Order
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-4 font-body">
              Your payment information is encrypted and secure
            </p>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default Checkout;