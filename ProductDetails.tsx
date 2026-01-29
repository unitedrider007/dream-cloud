import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from './useStore';
import { Star, ArrowLeft, ShoppingBag, Leaf, MessageCircle, Plus, Minus } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, products, addReview, cart, updateQuantity, removeFromCart } = useStore();
  const product = products.find(p => p.id === id);

  const getCartQuantity = (id: string) => {
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const [newReview, setNewReview] = useState({ rating: 5, comment: '', user: '' });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newReview.comment || !newReview.user) return;
    
    addReview(product.id, {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newReview
    });
    setNewReview({ rating: 5, comment: '', user: '' });
  };

  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6 hover:text-dream-500">
        <ArrowLeft size={20} /> Back to Menu
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-3xl font-bold border-4 border-white px-8 py-4 rounded-xl transform -rotate-12">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <span className="text-3xl font-bold text-dream-500">₹{product.price}</span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Ingredients & Nutrition */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
              <Leaf className="text-green-500" size={20} /> Ingredients & Nutrition
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase">Calories</span>
                <span className="font-bold text-gray-900 dark:text-white">{product.nutrition.calories}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase">Sugar</span>
                <span className="font-bold text-gray-900 dark:text-white">{product.nutrition.sugar}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Ingredients:</span> {product.ingredients.join(', ')}
            </p>
            <div className="mt-2 flex gap-2">
              {product.allergens.map(a => (
                <span key={a} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">Contains {a}</span>
              ))}
            </div>
          </div>

          {getCartQuantity(product.id) > 0 ? (
            <div className="flex items-center justify-between bg-dream-500 text-white rounded-xl p-2 shadow-lg animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => getCartQuantity(product.id) === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                className="p-3 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Minus size={24} />
              </button>
              <span className="font-bold text-2xl">{getCartQuantity(product.id)} added</span>
              <button onClick={() => addToCart(product)} className="p-3 hover:bg-white/20 rounded-lg transition-colors"><Plus size={24} /></button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(product)}
              disabled={!product.isAvailable}
              className="w-full bg-dream-500 hover:bg-dream-600 disabled:bg-gray-300 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag /> Add to Cart
            </button>
          )}

          {/* Reviews */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-serif font-bold mb-4 dark:text-white">Customer Love</h3>
            
            {/* Add Review Form */}
            <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-6">
              <h4 className="font-bold mb-2 dark:text-white">Write a Review</h4>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <input 
                  type="text" placeholder="Your Name" required
                  value={newReview.user} onChange={e => setNewReview({...newReview, user: e.target.value})}
                  className="px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <select 
                  value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
                  className="px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <textarea 
                placeholder="How was the ice cream?" required
                value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})}
                className="w-full px-3 py-2 rounded border mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button type="submit" className="bg-dream-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Post Review</button>
            </form>

            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold dark:text-white">{review.user}</span>
                      <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /> {review.rating}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                    {review.adminResponse && (
                      <div className="mt-2 bg-dream-50 dark:bg-dream-dark/50 p-3 rounded-lg text-sm">
                        <p className="font-bold text-dream-500 flex items-center gap-1"><MessageCircle size={12}/> Dream Cloud Response:</p>
                        <p className="text-gray-600 dark:text-gray-400">{review.adminResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500">No reviews yet. Be the first to taste the dream!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}