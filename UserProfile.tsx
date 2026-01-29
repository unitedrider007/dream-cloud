import React from 'react';
import { useStore } from './useStore';
import { Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function UserProfile() {
  const { currentUser } = useStore();

  if (!currentUser) return <Navigate to="/admin/login" replace />;

  // Mock Order History
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-02-20',
      status: 'Delivered',
      total: 450,
      items: ['Royal Kulfi Malai x2', 'Midnight Chocolate x1']
    },
    {
      id: 'ORD-2024-002',
      date: '2024-02-15',
      status: 'Processing',
      total: 279,
      items: ['Alphonso Mango Delight x1']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hello, Ice Cream Lover</h1>
        <p className="text-gray-500 dark:text-gray-400">{currentUser}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Package className="text-dream-500" /> Order History
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{order.id}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> {order.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {order.status}
                </span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">₹{order.total}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Items:</p>
              <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
