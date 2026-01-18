# Safa Residency Server

Backend API server for Safa Residency hotel management system built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **User Management**: Authentication, authorization with JWT
- **Room Management**: CRUD operations for rooms, categories, and pricing
- **Booking System**: Reservation management with payment integration
- **Payment Gateway**: SSLCommerz integration for secure payments
- **Event Management**: Handle event bookings and requests
- **Blog System**: Content management for blog posts
- **Gallery Management**: Image gallery with Cloudinary integration
- **Email Notifications**: Automated email sending with Nodemailer
- **Discount Management**: Promotional codes and discounts
- **Service Requests**: Guest service request handling

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- SSLCommerz merchant account (for payments)
- Gmail account (for email notifications)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahnabu/safa-residency.git
   cd safa-residency/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory and copy contents from `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   DEFAULT_PASS=your_default_password
   JWT_EXPIRE=90d
   ACCESS_TOKEN_SECRET=your_jwt_secret
   DATABASE_URL=your_mongodb_connection_string
   STORE_ID=your_sslcommerz_store_id
   STORE_PASSWORD=your_sslcommerz_password
   SENDER_EMAIL=your_email@gmail.com
   SENDER_APP_PASS=your_gmail_app_password
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:5000`

### Production Mode
```bash
npm run start:prod
```

## 📁 Project Structure

```
server/
├── src/
│   ├── app/
│   │   ├── modules/        # Feature modules (users, rooms, bookings, etc.)
│   │   ├── middlewares/    # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── errors/         # Error handling
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── app.ts             # Express app setup
│   └── server.ts          # Server entry point
├── .env                   # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run prettier` - Format code with Prettier
- `npm run prettier:fix` - Fix code formatting

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | development/production |
| `PORT` | Server port | 5000 |
| `DATABASE_URL` | MongoDB connection string | mongodb+srv://... |
| `JWT_EXPIRE` | JWT token expiration | 90d |
| `ACCESS_TOKEN_SECRET` | JWT secret key | your-secret-key |
| `STORE_ID` | SSLCommerz store ID | store123 |
| `STORE_PASSWORD` | SSLCommerz password | pass123 |
| `SENDER_EMAIL` | Email sender address | email@gmail.com |
| `SENDER_APP_PASS` | Gmail app password | xxxx xxxx xxxx xxxx |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create room (Admin)
- `PATCH /api/rooms/:id` - Update room (Admin)
- `DELETE /api/rooms/:id` - Delete room (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id` - Update booking status

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

## 🗄️ Database Migration

To migrate from an old MongoDB database to a new one:

```bash
node migrate-db.js
```

To verify migration:
```bash
node verify-migration.js
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Zod
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Vercel
The project is configured for Vercel deployment with `vercel.json`:
```bash
vercel --prod
```

### Manual Deployment
1. Build the project: `npm run build`
2. Set environment variables on your hosting platform
3. Start the server: `npm run start:prod`

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Development Team - [Ahnabu](https://github.com/Ahnabu)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email syedmdabuhoraira@gmail.com
