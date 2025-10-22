import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import bgImage from "../assets/leafs.webp"; 
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("✅ Products fetched:", data);
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl font-semibold">
        <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mb-4"></div>
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div
        className="relative h-[400px] w-full rounded-2xl shadow-lg overflow-hidden mb-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 right-8 text-right text-white"
        >
          <h2 className="text-4xl font-extrabold drop-shadow-lg">
            Welcome to LeafOra 🛒
          </h2>
          <p className="text-lg font-light opacity-90">
           Nurture Nature with LeafOra.
          </p>
        </motion.div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"

      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ProductCard product={p} onAddToCart={() => {}} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            ❌ No products available.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
