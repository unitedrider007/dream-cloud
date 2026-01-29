import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Truck, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/asset/Gemini_Generated_Image_nltttonltttonltt.png" 
            alt="Ice Cream Background" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dream-50 dark:to-dream-dark"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Taste the <span className="text-dream-500">Dream</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Handmade ice cream delivered by bicycle to your doorstep in minutes.
          </p>
          <Link 
            to="/catalog" 
            className="inline-block bg-dream-500 hover:bg-dream-600 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 pb-16">
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 p-8 rounded-3xl shadow-lg text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500">
          <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={32} />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2 dark:text-white">Eco-Friendly Delivery</h3>
          <p className="text-gray-500">Our bicycle fleet covers 3 major zones, ensuring zero emissions.</p>
        </div>
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 p-8 rounded-3xl shadow-lg text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500">
          <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={32} />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2 dark:text-white">Live Tracking</h3>
          <p className="text-gray-500">Track your ice cream from our freezer to your hands in real-time.</p>
        </div>
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 p-8 rounded-3xl shadow-lg text-center hover:transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2 dark:text-white">Authentic & Transparent</h3>
          <p className="text-gray-500">Real taste with premium ingredients. We list full nutritional content for every scoop.</p>
        </div>
      </section>
    </div>
  );
}