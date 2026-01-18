# Safa Residency Client

Modern, responsive frontend application for Safa Residency hotel management system built with React, Vite, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Multi-language Support**: i18next integration (English & Bengali)
- **User Authentication**: Firebase Authentication with JWT
- **Room Booking**: Interactive room selection and booking system
- **Payment Integration**: Secure payment processing with SSLCommerz
- **Event Management**: Browse and book events
- **Blog System**: Read hotel news and updates
- **Gallery**: Beautiful image gallery with lazy loading
- **User Dashboard**: Manage bookings, profile, and service requests
- **Admin Panel**: Complete hotel management dashboard
- **Staff Portal**: Handle reservations and guest requests
- **Real-time Updates**: Redux Toolkit Query for efficient data fetching

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Cloudinary account (for image uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahnabu/safa-residency.git
   cd safa-residency/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the client directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your credentials:
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

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── public/
│   ├── locales/           # Translation files (en, bn)
│   └── index.html         # Entry HTML
├── src/
│   ├── Components/        # React components
│   │   ├── Accommodation/ # Room booking components
│   │   ├── Blog/          # Blog components
│   │   ├── Events/        # Event management
│   │   ├── Gallery/       # Image gallery
│   │   ├── Home/          # Homepage sections
│   │   ├── Membership/    # Membership features
│   │   └── ui/            # Reusable UI components
│   ├── Dashboard/         # Dashboard layouts
│   │   ├── Admin/         # Admin panel
│   │   ├── Staff/         # Staff portal
│   │   └── User/          # User dashboard
│   ├── Pages/             # Page components
│   ├── redux/             # State management
│   │   ├── api/           # RTK Query API slices
│   │   ├── features/      # Redux slices
│   │   └── store.js       # Redux store
│   ├── routes/            # Routing configuration
│   ├── Shared/            # Shared components
│   ├── UserManagement/    # Auth components
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── i18n.js            # i18next configuration
├── .env                   # Environment variables
├── .env.example          # Environment template
├── firebase.json         # Firebase hosting config
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## 🎨 Tech Stack

### Core
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript/JavaScript** - Programming language

### State Management
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Redux Persist** - Persist Redux state

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Ant Design** - UI component library
- **Material Tailwind** - Material Design components
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Swiper** - Touch slider

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **React Headroom** - Smart header

### Internationalization
- **i18next** - Translation framework
- **react-i18next** - React integration

### Additional Libraries
- **Firebase** - Authentication
- **Axios** - HTTP client
- **Day.js** - Date manipulation
- **React Hot Toast** - Toast notifications
- **SweetAlert2** - Beautiful alerts
- **React Quill** - Rich text editor
- **Recharts** - Charts and graphs
- **Lottie** - Animation player

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting errors

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_apiKey` | Firebase API key | Yes |
| `VITE_authDomain` | Firebase auth domain | Yes |
| `VITE_projectId` | Firebase project ID | Yes |
| `VITE_storageBucket` | Firebase storage bucket | Yes |
| `VITE_messagingSenderId` | Firebase messaging sender ID | Yes |
| `VITE_appId` | Firebase app ID | Yes |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes |

## 🎯 Key Features

### For Guests
- Browse and book rooms
- View room availability and pricing
- Secure online payment
- Book events and activities
- Read blog posts
- View gallery
- Multi-language support (English/Bengali)

### For Users
- Manage bookings
- Update profile
- Submit service requests
- View booking history
- Receive email confirmations

### For Staff
- View reservations
- Manage guest requests
- Update booking status
- Handle check-in/check-out

### For Admin
- Complete dashboard analytics
- Manage rooms and categories
- User management
- Blog management
- Event management
- Gallery management
- Discount management
- View reports and statistics

## 🚀 Deployment

### Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Vercel/Netlify

1. Build command: `npm run build`
2. Output directory: `dist`
3. Add environment variables in hosting platform

## 🔒 Security Features

- Firebase Authentication
- Protected routes
- JWT token management
- Secure API communication
- Input validation
- XSS protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🌍 Internationalization

Supported languages:
- English (en)
- Bengali (bn)

Translation files located in `public/locales/`

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Development Team - [Ahnabu](https://github.com/Ahnabu)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email syedmdabuhoraira@gmail.com
