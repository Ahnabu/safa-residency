# Safa Residency - Hotel Management System

A modern, full-stack hotel management system built with React, Node.js, Express, TypeScript, and MongoDB. Features comprehensive booking management, payment integration, multi-language support, and role-based dashboards for guests, staff, and administrators.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## 🌟 Features

### Guest Features
- 🏨 **Room Booking System** - Browse, filter, and book rooms with real-time availability
- 💳 **Secure Payments** - SSLCommerz payment gateway integration
- 🎉 **Event Management** - Book and manage hotel events
- 📱 **Responsive Design** - Seamless experience across all devices
- 🌐 **Multi-language** - English and Bengali support
- 📧 **Email Notifications** - Automated booking confirmations
- 🖼️ **Image Gallery** - Explore hotel facilities and rooms

### User Dashboard
- 📊 **Booking Management** - View and manage all bookings
- 👤 **Profile Management** - Update personal information
- 🛎️ **Service Requests** - Submit and track service requests
- 📜 **Booking History** - Complete transaction history

### Staff Portal
- 📋 **Reservation Management** - Handle check-ins and check-outs
- 🔔 **Request Handling** - Manage guest service requests
- 📊 **Daily Operations** - Track daily reservations

### Admin Dashboard
- 📈 **Analytics & Reports** - Comprehensive business insights
- 🏢 **Room Management** - CRUD operations for rooms and categories
- 👥 **User Management** - Manage users, staff, and permissions
- 💰 **Discount Management** - Create and manage promotional offers
- ✍️ **Content Management** - Blog posts and gallery management
- 🎪 **Event Management** - Control event bookings and schedules

## 🏗️ Architecture

```
safa-residency/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/    # React components
│   │   ├── Dashboard/     # Dashboard layouts
│   │   ├── redux/         # State management
│   │   ├── routes/        # Routing configuration
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
└── server/                # Node.js backend API
    ├── src/
    │   ├── app/
    │   │   ├── modules/   # Feature modules
    │   │   ├── routes/    # API routes
    │   │   ├── middlewares/ # Custom middleware
    │   │   └── config/    # Configuration
    │   ├── app.ts         # Express app
    │   └── server.ts      # Server entry point
    └── dist/              # Compiled TypeScript
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management with RTK Query
- **Tailwind CSS** - Utility-first CSS framework
- **Ant Design** - UI component library
- **Framer Motion** - Animation library
- **i18next** - Internationalization
- **Firebase** - Authentication
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Zod** - Schema validation
- **Nodemailer** - Email service
- **SSLCommerz** - Payment gateway

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account or local MongoDB
- **Firebase** account (for authentication)
- **Cloudinary** account (for image uploads)
- **SSLCommerz** merchant account (for payments)
- **Gmail** account (for email notifications)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Ahnabu/safa-residency.git
cd safa-residency
```

### 2. Server Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your credentials
# See server/.env.example for all required variables

# Build TypeScript
npm run build

# Run in development mode
npm run dev
```

Server will start on `http://localhost:5000`

### 3. Client Setup

```bash
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your Firebase and Cloudinary credentials
# See client/.env.example for all required variables

# Run in development mode
npm run dev
```

Client will start on `http://localhost:5173`

## 🔐 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_EXPIRE=90d
ACCESS_TOKEN_SECRET=your_jwt_secret
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_password
SENDER_EMAIL=your_email@gmail.com
SENDER_APP_PASS=your_gmail_app_password
```

### Client (.env)
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your-project.firebaseapp.com
VITE_projectId=your-project-id
VITE_storageBucket=your-project.appspot.com
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## � Default Admin Credentials

For initial setup and testing, use these admin credentials:

```
Email: admin@gmail.com
Password: Admin@123
```

**⚠️ Important:** Change the admin password immediately after first login in production environments.

## �🗄️ Database Migration

To migrate data from an old MongoDB database to a new one:

```bash
cd server

# Update database URLs in migrate-db.js
node migrate-db.js

# Verify migration
node verify-migration.js
```

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Room Endpoints
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create room (Admin only)
- `PATCH /api/rooms/:id` - Update room (Admin only)
- `DELETE /api/rooms/:id` - Delete room (Admin only)

### Booking Endpoints
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

For complete API documentation, see [server/README.md](server/README.md)

## 🚀 Deployment

### Frontend (Firebase Hosting)
```bash
cd client
npm run build
firebase deploy
```

### Backend (Vercel)
```bash
cd server
npm run build
vercel --prod
```

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 📱 Screenshots

[Add screenshots of your application here]

## 🎯 Roadmap

- [ ] Add WhatsApp notification integration
- [ ] Implement review and rating system
- [ ] Add loyalty program features
- [ ] Create mobile application (React Native)
- [ ] Add real-time chat support
- [ ] Implement advanced analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- **Developer** - [Ahnabu](https://github.com/Ahnabu)

## 📞 Contact & Support

- **Email**: safa.residency.bd@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/Ahnabu/safa-residency/issues)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern hotel management systems
- Built with ❤️ for the hospitality industry

---

**Note**: This is a production-ready application. Make sure to update all environment variables with your actual credentials before deploying to production.
