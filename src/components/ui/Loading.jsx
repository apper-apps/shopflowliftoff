import { motion } from "framer-motion";
import React from "react";

const Loading = ({ type = "grid" }) => {
  if (type === "detail") {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <motion.div
              className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                  style={{ backgroundSize: "200% 200%" }}
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <motion.div
              className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "400% 100%" }}
            />
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/4"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={{ backgroundSize: "400% 100%" }}
            />
            <motion.div
              className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-1/2"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.4 }}
              style={{ backgroundSize: "400% 100%" }}
            />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
                  animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                  style={{ backgroundSize: "400% 100%" }}
                />
              ))}
            </div>
            <motion.div
              className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.8 }}
              style={{ backgroundSize: "400% 100%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "cart") {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-white card-shadow">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg flex-shrink-0"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4"
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                style={{ backgroundSize: "400% 100%" }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2"
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.2 }}
                style={{ backgroundSize: "400% 100%" }}
              />
            </div>
            <motion.div
              className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.4 }}
              style={{ backgroundSize: "400% 100%" }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default grid skeleton
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl card-shadow overflow-hidden">
          <motion.div
            className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="p-4 space-y-3">
            <motion.div
              className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
              style={{ backgroundSize: "400% 100%" }}
            />
<motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.2 }}
              style={{ backgroundSize: "400% 100%" }}
            />
            <motion.div
              className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2"
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.4 }}
              style={{ backgroundSize: "400% 100%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;