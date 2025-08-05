import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import CartSidebar from "@/components/organisms/CartSidebar";
import Home from "@/components/pages/Home";
import ProductDetail from "@/components/pages/ProductDetail";
import Category from "@/components/pages/Category";
import Search from "@/components/pages/Search";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import { categoryService } from "@/services/api/categoryService";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.Id);
      
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, {
        productId: product.Id,
        title: product.title,
        price: product.price,
        image: product.images?.[0],
        quantity: 1
      }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearch = (query) => {
    // Search functionality handled by Search component
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header
          cartItemCount={getTotalItems()}
          onSearch={handleSearch}
          categories={categories}
        />
        
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/category/:categoryId" element={<Category onAddToCart={addToCart} />} />
            <Route path="/search" element={<Search onAddToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems}
                  onUpdateQuantity={updateCartQuantity}
                  onRemoveItem={removeFromCart}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cartItems={cartItems}
                  onOrderComplete={clearCart}
                />
              } 
            />
          </Routes>
        </main>

        <CartSidebar
          isOpen={cartSidebarOpen}
          onClose={() => setCartSidebarOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;