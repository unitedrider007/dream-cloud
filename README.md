# 🍦 Dream Cloud - Production-Grade Ice Cream E-Commerce Platform

Welcome to Dream Cloud, a modern, scalable, and secure web application for selling and delivering delicious ice cream. This project is built with a production-first mindset, using a serverless architecture for high performance and low maintenance.

## ✨ Features

### Customer-Facing
- **Dreamy UI/UX:** A soft, cloud-like interface with dark mode support.
- **Full Catalog:** Browse flavors with details, pricing, and real-time availability.
- **Advanced Filtering:** Sort and filter by price, flavor, and popularity.
- **Modern Shopping Cart:** Persistent cart and a secure, multi-step checkout process.
- **Order Tracking:** Real-time updates from "Preparing" to "Delivered".
- **Feedback System:** Rate and review flavors to help other customers.
- **User Authentication:** Secure login and order history.

### Admin Dashboard
- **At-a-Glance Analytics:** Monitor revenue, top-selling items, and user activity.
- **Ice Cream CMS:** Full CRUD (Create, Read, Update, Delete) for all flavors.
- **Inventory Management:** Instantly toggle availability and get low-stock alerts.
- **Order Management:** View and update customer order statuses.
- **Refrigerator Monitoring:** (Simulated) Real-time temperature and status alerts.

## 🧱 Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Serverless (Netlify Functions)
- **Database:** Firebase Firestore (for real-time data)
- **Authentication:** JWT-based with secure, role-based routes.
- **Deployment:** Netlify

---

## 🚀 Getting Started & Deployment Guide

This guide will walk you through setting up the required services and deploying the application on Netlify.

### Step 1: Create a Firebase Project

This project uses Firebase for its database and as a backend service.

1.  Go to the Firebase Console.
2.  Click **"Add project"**, give it a name (e.g., `dream-cloud-app`), and create the project.
3.  On the Project Overview page, click the **Web icon** (`</>`) to register a new web app.
4.  Enter an app nickname and click **Register app**.
5.  You will see a `firebaseConfig` object. **Copy this object.**

### Step 2: Set Up Your Local Environment

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:** Create a file named `.env` in the root of your project.

4.  **Add Firebase Keys to `.env`:** Paste the `firebaseConfig` values into your `.env` file, prefixing each key with `VITE_`.

    ```env
    # .env
    VITE_FIREBASE_API_KEY="AIza..."
    VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="12345..."
    VITE_FIREBASE_APP_ID="1:12345..."
    ```

### Step 3: Configure the Database (Firestore)

1.  In the Firebase Console, go to **Build > Firestore Database**.
2.  Click **Create database**.
3.  Choose a location and click **Next**.
4.  Select **Start in test mode** for initial setup. We will secure this later.
5.  Click **Enable**.

### Step 4: Deploy to Netlify

1.  Push your code to a GitHub/GitLab/Bitbucket repository.
2.  Log in to Netlify and click **"New site from Git"**.
3.  Select your repository.
4.  Netlify will auto-detect the settings. The build command should be `npm run build` and the publish directory should be `dist`.
5.  Before deploying, go to **Site settings > Build & deploy > Environment**.
6.  Add the same environment variables from your `.env` file here. This is crucial for your serverless functions to connect to Firebase.
7.  Click **Deploy Site**.

---

## 🔐 Security Best Practices (CRUCIAL)

Your application is not secure until you complete these steps.

### A. Restrict Your Firebase API Key

This prevents others from using your Firebase project on their own websites.

1.  Go to the Google Cloud Console API Credentials page.
2.  Select your Firebase project from the dropdown.
3.  Click on the API key named **"Browser key (auto created by Firebase)"**.
4.  Under **Application restrictions**, select **HTTP referrers (web sites)**.
5.  Click **ADD AN ITEM** and add your Netlify URL (e.g., `https://your-dream-cloud.netlify.app/*`).
6.  Also add `http://localhost:*` for local development.
7.  Click **Save**.

### B. Apply Firestore Security Rules

The default "test mode" rules are insecure. Replace them with production rules to control data access.

1.  Go to the **Firebase Console > Firestore Database > Rules** tab.
2.  Copy the contents of the `firestore.rules` file from this project.
3.  Paste it into the editor and click **Publish**.

These rules ensure that:
- Users can only read public data (like ice creams).
- Authenticated users can create orders and feedback for themselves.
- Only admins can modify products or view analytics.

## 🔧 Running Locally

To run the full stack (frontend and serverless functions) locally, use the Netlify CLI.

```bash
# Install the Netlify CLI
npm install -g netlify-cli

# Run the development server
netlify dev
```

This will start the Vite server and the serverless functions, accessible at `http://localhost:8888`.

## 📦 Project Structure

```
/
├── netlify/
│   └── functions/      # Serverless backend functions
│       ├── get-icecreams.ts
│       └── middleware/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts
│   ├── components/     # Reusable React components
│   ├── context/        # React Context for state management
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (Admin & Public)
│   └── services/       # External service integrations (Firebase)
├── .env                # Environment variables (local)
├── firestore.rules     # Database security rules
├── index.html          # Main HTML entry point
└── package.json
```