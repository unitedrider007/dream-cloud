import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './useStore';
import { Plus, Minus, Star, ShoppingBag } from 'lucide-react';

export default function Catalog() {
  const { addToCart, products, cart, updateQuantity, removeFromCart } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    if (filter === 'available') {
      return product.isAvailable;
    }
    if (filter === 'bestseller') {
      return product.orderCount > 800;
    }
    return true;
  });

  const getCartQuantity = (id: string) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white tracking-wide">Our Flavors</h1>
        <select 
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-dream-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Flavors</option>
          <option value="available">Available Now</option>
          <option value="bestseller">Best Sellers</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500 border border-white/50 dark:border-gray-700/50">
            <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              {!product.isAvailable && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold">Out of Stock</span>
                </div>
              )}
              {product.orderCount > 1000 && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="black" /> Best Seller
                </div>
              )}
            </Link>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/product/${product.id}`} className="text-xl font-serif font-bold text-gray-900 dark:text-white hover:text-dream-500 transition-colors">{product.name}</Link>
                <span className="text-lg font-semibold text-dream-500">₹{product.price}</span>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {product.ingredients.join(', ')}
              </p>

              <div className="mt-4">
                {getCartQuantity(product.id) > 0 ? (
                  <div className="flex items-center justify-between bg-dream-500 text-white rounded-xl p-1 shadow-lg animate-in fade-in zoom-in duration-200">
                    <button 
                      onClick={() => getCartQuantity(product.id) === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-bold text-lg">{getCartQuantity(product.id)} added</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={!product.isAvailable}
                    className="w-full bg-white dark:bg-gray-700 hover:bg-dream-500 hover:text-white dark:hover:bg-dream-500 text-gray-900 dark:text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm border border-gray-200 dark:border-gray-600"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}