import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Replace with your actual Firebase config from the console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth: Auth;
let db: Firestore;

try {
  // Only initialize if config is present to prevent white screen crash
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.warn("Firebase config missing. App running in mock mode.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db };

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  adminResponse?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  nutrition: {
    calories: number;
    sugar: string;
    fat: string;
  };
  allergens: string[];
  isAvailable: boolean;
  stock: number;
  image: string;
  category: 'scoop' | 'tub' | 'bar';
  orderCount: number;
  reviews: Review[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Kulfi Malai',
    description: 'Traditional Indian ice cream infused with saffron, cardamom, and roasted pistachios.',
    price: 249,
    ingredients: ['Full Cream Milk', 'Saffron', 'Cardamom', 'Pistachios', 'Sugar', 'Condensed Milk'],
    nutrition: { calories: 280, sugar: '22g', fat: '15g' },
    allergens: ['Dairy', 'Nuts'],
    isAvailable: true,
    stock: 50,
    image: '/asset/Gemini_Generated_Image_h175zvh175zvh175.png',
    category: 'bar',
    orderCount: 1200,
    reviews: [{ id: 'r1', user: 'Rahul', rating: 5, comment: 'Authentic taste, just like old Delhi!', date: '2024-02-10', adminResponse: 'Glad you loved it Rahul! It is our grandmothers recipe.' }]
  },
  {
    id: '2',
    name: 'Midnight Chocolate',
    description: 'Intense dark chocolate sorbet with chunks of 70% cocoa fudge.',
    price: 299,
    ingredients: ['Cocoa', 'Milk', 'Dark Chocolate Chips'],
    nutrition: { calories: 250, sugar: '20g', fat: '14g' },
    allergens: ['Dairy', 'Soy'],
    isAvailable: true,
    stock: 20,
    image: '/asset/Gemini_Generated_Image_s3dznzs3dznzs3dz.png',
    category: 'scoop',
    orderCount: 980,
    reviews: []
  },
  {
    id: '3',
    name: 'Alphonso Mango Delight',
    description: 'Made with real Ratnagiri Alphonso mangoes for a tropical burst of flavor.',
    price: 279,
    ingredients: ['Fresh Mango Pulp', 'Milk', 'Cream', 'Sugar'],
    nutrition: { calories: 200, sugar: '16g', fat: '10g' },
    allergens: ['Dairy'],
    isAvailable: true,
    stock: 45,
    image: '/asset/Gemini_Generated_Image_bsh3lybsh3lybsh3.png',
    category: 'scoop',
    orderCount: 1500,
    reviews: []
  },
  {
    id: '4',
    name: 'Butterscotch Bliss',
    description: 'Crunchy caramelized cashew nuts blended with creamy butterscotch.',
    price: 229,
    ingredients: ['Milk', 'Butter', 'Brown Sugar', 'Cashews', 'Cream'],
    nutrition: { calories: 260, sugar: '24g', fat: '13g' },
    allergens: ['Dairy', 'Nuts'],
    isAvailable: true,
    stock: 30,
    image: '/asset/Gemini_Generated_Image_cp5tggcp5tggcp5t.png',
    category: 'scoop',
    orderCount: 800,
    reviews: []
  },
  {
    id: '5',
    name: 'Pistachio Praline',
    description: 'Rich nutty flavor with roasted pistachio bits.',
    price: 349,
    ingredients: ['Pistachios', 'Milk', 'Cream', 'Sugar', 'Sea Salt'],
    nutrition: { calories: 240, sugar: '15g', fat: '16g' },
    allergens: ['Dairy', 'Nuts'],
    isAvailable: false,
    stock: 0,
    image: '/asset/Gemini_Generated_Image_muqjhkmuqjhkmuqj.png',
    category: 'tub',
    orderCount: 600,
    reviews: []
  },
  {
    id: '6',
    name: 'Rose Falooda',
    description: 'A floral symphony of rose syrup, vermicelli, and basil seeds.',
    price: 219,
    ingredients: ['Rose Syrup', 'Milk', 'Vermicelli', 'Basil Seeds', 'Cream'],
    nutrition: { calories: 210, sugar: '25g', fat: '9g' },
    allergens: ['Dairy', 'Gluten'],
    isAvailable: true,
    stock: 60,
    image: '/asset/Gemini_Generated_Image_g5yey8g5yey8g5ye.png',
    category: 'scoop',
    orderCount: 450,
    reviews: []
  },
  {
    id: '7',
    name: 'Tender Coconut',
    description: 'Fresh tender coconut meat blended with creamy coconut milk.',
    price: 269,
    ingredients: ['Tender Coconut Pulp', 'Coconut Milk', 'Cream', 'Sugar'],
    nutrition: { calories: 190, sugar: '14g', fat: '11g' },
    allergens: ['Dairy', 'Coconut'],
    isAvailable: true,
    stock: 35,
    image: '/asset/Gemini_Generated_Image_xggbxqxggbxqxggb.png',
    category: 'scoop',
    orderCount: 750,
    reviews: []
},
{
    id: '8',
    name: 'Tea flovour',
    description: 'Aromatic tea flavor ice cream.',
    price: 239,
    ingredients: [ 'tea', 'Milk', 'Cream'],
    nutrition: { calories: 180, sugar: '16g', fat: '9g' },
    allergens: ['Dairy'],
    isAvailable: true,
    stock: 40,
    image: '/asset/Gemini_Generated_Image_yujwu5yujwu5yujw.png',
    category: 'scoop',
    orderCount: 500,
    reviews: []
  },
  {
    id: '9',
    name: 'Rajbhog',
    description: 'Royal dessert flavor with saffron, cardamom, and dry fruits.',
    price: 289,
    ingredients: ['Saffron', 'Cardamom', 'Almonds', 'Cashews', 'Milk', 'Cream'],
    nutrition: { calories: 290, sugar: '24g', fat: '16g' },
    allergens: ['Dairy', 'Nuts'],
    isAvailable: true,
    stock: 25,
    image: '/asset/Gemini_Generated_Image_aeiw1aaeiw1aaeiw.png',
    category: 'scoop',
    orderCount: 920,
    reviews: []
  }
];