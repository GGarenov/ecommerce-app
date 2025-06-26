# Modern E-commerce Application

Live Website: [https://sunglasses-ecommerce-app.vercel.app/](https://sunglasses-ecommerce-app.vercel.app/)

A full-stack e-commerce application built with React and Node.js, featuring both shopping and admin interfaces.

## 🚀 Features

### Shopping Interface

- User authentication (Login/Register)
- Product browsing with filters
- Shopping cart functionality
- Order management
- Product reviews and ratings
- Address management
- PayPal payment integration
- Responsive design

### Admin Interface

- Dashboard with analytics
- Product management (CRUD operations)
- Order management
- Image upload with Cloudinary
- Sales tracking
- User management

## 🛠 Tech Stack

### Frontend

- React 18
- Redux Toolkit for state management
- Vite for build tooling
- Radix UI components
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- PayPal SDK for payments
- Cloudinary for image management
- Multer for file uploads

## 📦 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store setup
│   │   ├── hooks/        # Custom hooks
│   │   └── config/       # Configuration files
│
└── server/                # Backend Node.js application
    ├── controllers/      # Request handlers
    ├── models/          # Database models
    ├── routes/          # API routes
    └── helpers/         # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- PayPal Developer Account
- Cloudinary Account

### Installation

1. Clone the repository
   \`\`\`bash
   git clone [repository-url]
   \`\`\`

2. Install Frontend Dependencies
   \`\`\`bash
   cd client
   npm install
   \`\`\`

3. Install Backend Dependencies
   \`\`\`bash
   cd server
   npm install
   \`\`\`

4. Set up environment variables
   Create a .env file in the server directory with:
   \`\`\`
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   \`\`\`

5. Run the application
   Frontend:
   \`\`\`bash
   cd client
   npm run dev
   \`\`\`

Backend:
\`\`\`bash
cd server
npm run dev
\`\`\`

## 🔒 Authentication

The application uses JWT-based authentication with protected routes for both admin and regular users. The authentication flow includes:

- User registration
- User login
- Role-based access control
- Protected routes

## 💅 UI Components

Built with a combination of:

- Radix UI for accessible components
- Tailwind CSS for styling
- Custom UI components in the components/ui directory

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop devices
- Tablets
- Mobile devices

## 🔄 State Management

Uses Redux Toolkit for:

- User authentication state
- Shopping cart state
- Product management
- Order tracking

## 🌟 Key Features Implementation

### Shopping Cart

- Add/remove items
- Update quantities
- Persist cart data
- Calculate totals

### Payment Processing

- PayPal integration
- Secure checkout process
- Order confirmation

### Admin Dashboard

- Sales analytics
- Order management
- Product inventory
- User management

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
