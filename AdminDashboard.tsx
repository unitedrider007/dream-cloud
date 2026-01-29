import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, AlertTriangle, TrendingUp, Package, Users, ClipboardList, MessageSquare, Reply } from 'lucide-react';
import { useStore } from './useStore';

const SALES_DATA = [
  { name: 'Kulfi', sales: 12000 },
  { name: 'Mango', sales: 15000 },
  { name: 'Chocolate', sales: 8000 },
  { name: 'Rose', sales: 6000 },
  { name: 'Butterscotch', sales: 9500 },
];

const REFRIGERATORS = [
  { id: 'R1', temp: -18, status: 'normal', capacity: 80 },
  { id: 'R2', temp: -15, status: 'warning', capacity: 95 },
  { id: 'R3', temp: -2, status: 'critical', capacity: 40 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'reviews'>('overview');
  const { products, replyToReview } = useStore();
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'overview' ? 'bg-dream-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >Overview</button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'orders' ? 'bg-dream-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >Orders</button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'reviews' ? 'bg-dream-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >Reviews</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Daily Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹45,240</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'overview' ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Refrigerator Monitoring */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <Thermometer className="text-dream-500" /> Refrigerator Status
          </h2>
          <div className="space-y-4">
            {REFRIGERATORS.map((ref) => (
              <div key={ref.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Unit {ref.id}</p>
                  <p className="text-sm text-gray-500">Capacity: {ref.capacity}%</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xl font-mono font-bold ${
                    ref.temp > -10 ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {ref.temp}°C
                  </span>
                  {ref.status === 'critical' && (
                    <span className="flex items-center gap-1 text-red-500 text-sm font-bold animate-pulse">
                      <AlertTriangle size={16} /> CRITICAL
                    </span>
                  )}
                  {ref.status === 'warning' && (
                    <span className="text-yellow-500 text-sm font-bold">Check</span>
                  )}
                  {ref.status === 'normal' && (
                    <span className="text-green-500 text-sm font-bold">OK</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Analytics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Top Selling Flavors</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      ) : activeTab === 'orders' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ClipboardList className="text-dream-500" /> Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 dark:text-white">#ORD-001</td>
                  <td className="px-6 py-4 dark:text-white">John Doe</td>
                  <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Preparing</span></td>
                  <td className="px-6 py-4 dark:text-white">₹450</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {products.flatMap(p => p.reviews.map(r => ({...r, productName: p.name, productId: p.id}))).map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{review.productName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{review.user}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                  {review.rating} Stars
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">"{review.comment}"</p>
              
              {review.adminResponse ? (
                <div className="ml-8 bg-dream-50 dark:bg-dream-900/30 p-3 rounded-lg border-l-4 border-dream-500">
                  <p className="text-sm font-bold text-dream-600 mb-1">Response sent:</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{review.adminResponse}</p>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <input 
                    type="text" 
                    placeholder="Write a response..." 
                    className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={replyText[review.id] || ''}
                    onChange={(e) => setReplyText({...replyText, [review.id]: e.target.value})}
                  />
                  <button 
                    onClick={() => {
                      replyToReview(review.productId, review.id, replyText[review.id]);
                      setReplyText({...replyText, [review.id]: ''});
                    }}
                    className="bg-dream-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                  >
                    <Reply size={16} /> Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}