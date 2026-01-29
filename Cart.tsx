import React, { useState } from 'react';
import { useStore } from './useStore';
import { Trash2, Plus, Minus, MapPin, CheckCircle, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const DELIVERY_ZONES = [
  { id: 1, name: 'Aishbagh', zip: '226004' },
  { id: 2, name: 'Hazratganj', zip: '226003' },
  { id: 3, name: 'Gomati Nagar', zip: '226010' },
];

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, firstOrderDiscount } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [zip, setZip] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = firstOrderDiscount ? subtotal * 0.10 : 0;
  const deliveryFee = 40;
  const total = subtotal - discountAmount + deliveryFee;

  const checkDelivery = () => {
    const isValid = DELIVERY_ZONES.some(z => z.zip === zip);
    setDeliveryStatus(isValid ? 'valid' : 'invalid');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <Link to="/catalog" className="text-dream-500 hover:underline">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {step === 'cart' ? 'Your Cart' : 'Checkout'}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {step === 'cart' ? (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-dream-500 font-semibold">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Minus size={16} /></button>
                    <span className="font-medium dark:text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Plus size={16} /></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 self-start"><Trash2 size={20} /></button>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Delivery Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Delivery Zone (Zip Code)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={zip} 
                      onChange={e => setZip(e.target.value)}
                      placeholder="Enter Zip (e.g. 10001)"
                      className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button onClick={checkDelivery} className="bg-gray-900 text-white px-4 rounded-lg">Check</button>
                  </div>
                  {deliveryStatus === 'valid' && <p className="text-green-500 text-sm mt-1 flex items-center gap-1"><CheckCircle size={14}/> Bicycle Delivery Available!</p>}
                  {deliveryStatus === 'invalid' && <p className="text-red-500 text-sm mt-1">Sorry, we don't deliver there yet.</p>}
                </div>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                <input type="text" placeholder="Street Address" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h3>
          <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {firstOrderDiscount && (
              <div className="flex justify-between text-green-500 font-medium">
                <span className="flex items-center gap-1"><Gift size={14} /> First Order Discount (10%)</span>
                <span>-₹{discountAmount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery (Bicycle)</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="border-t pt-2 mt-2 font-bold text-lg text-gray-900 dark:text-white flex justify-between">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          
          {step === 'cart' ? (
            <button onClick={() => setStep('checkout')} className="w-full bg-dream-500 hover:bg-dream-600 text-white font-bold py-3 rounded-lg transition-colors">
              Proceed to Checkout
            </button>
          ) : (
            <button disabled={deliveryStatus !== 'valid'} className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-colors">
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}