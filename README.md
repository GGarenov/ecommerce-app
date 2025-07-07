<p align="center">
  <img src="client/public/vite.svg" alt="Logo" width="120" />
</p>

<h1 align="center">🕶️ Sunglasses Ecommerce App</h1>

<p align="center">
  <a href="https://sunglasses-ecommerce-app.vercel.app/" target="_blank"><b>🌐 Live Website</b></a>
</p>

<blockquote align="center">
  A full-stack e-commerce application built with <b>React</b> and <b>Node.js</b>, featuring both shopping and admin interfaces.
</blockquote>

---

## 🚀 Features

### 🛒 Shopping Interface

- User authentication (Login/Register)
- Product browsing with filters
- Shopping cart functionality
- Order management
- Product reviews and ratings
- Address management
- PayPal payment integration
- Responsive design

### 🛠️ Admin Interface

- Dashboard with analytics
- Product management (CRUD operations)
- Order management
- Image upload with Cloudinary
- Sales tracking
- User management

---

## 🛠 Tech Stack

<details>
<summary><b>Frontend</b></summary>

- React 18
- Redux Toolkit for state management
- Vite for build tooling
- Radix UI components
- Tailwind CSS for styling
- Axios for API requests
</details>

<details>
<summary><b>Backend</b></summary>

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- PayPal SDK for payments
- Cloudinary for image management
- Multer for file uploads
</details>

---

## 📦 Project Structure

```text
├── client/        # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store setup
│   │   ├── hooks/        # Custom hooks
│   │   └── config/       # Configuration files
│
└── server/       # Backend Node.js application
    ├── controllers/  # Request handlers
    ├── models/       # Database models
    ├── routes/       # API routes
    └── helpers/      # Utility functions
```

---

## � Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- PayPal Developer Account
- Cloudinary Account

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install Frontend Dependencies
cd client
npm install

# Install Backend Dependencies
cd ../server
npm install



# Run the application
# Frontend:
cd ../client
npm run dev

# Backend:
cd ../server
npm run dev
```

---

## 🔒 Authentication

The application uses <b>JWT-based authentication</b> with protected routes for both admin and regular users. The authentication flow includes:

- User registration
- User login
- Role-based access control
- Protected routes

---

## 💅 UI Components

Built with a combination of:

- <b>Radix UI</b> for accessible components
- <b>Tailwind CSS</b> for styling
- Custom UI components in the <code>components/ui</code> directory

---

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop devices
- Tablets
- Mobile devices

---

## 🔄 State Management

Uses <b>Redux Toolkit</b> for:

- User authentication state
- Shopping cart state
- Product management
- Order tracking

---

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

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📝 License

This project is MIT licensed.
