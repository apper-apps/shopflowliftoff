import { useState, useEffect } from "react";
import HeroBanner from "@/components/organisms/HeroBanner";
import CategoryBanner from "@/components/organisms/CategoryBanner";
import FeaturedProducts from "@/components/organisms/FeaturedProducts";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { categoryService } from "@/services/api/categoryService";

const Home = ({ onAddToCart }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-12">
        <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading type="grid" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Error message={error} onRetry={loadCategories} />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <HeroBanner />
      <CategoryBanner categories={categories} />
      <FeaturedProducts onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;