import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";

const Search = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
          Search Results
        </h1>
        <p className="text-lg text-gray-600 font-body">
          {query ? `Results for "${query}"` : "Enter a search term to find products"}
        </p>
      </motion.div>

      {query && (
        <ProductGrid
          searchQuery={query}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default Search;