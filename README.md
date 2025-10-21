# WarmPaws - Pet Care in Winter 🐾

A cozy winter companion platform designed for pet owners to ensure their furry friends stay warm, safe, and healthy during the cold season. Users can explore local pet care services, winter pet clothing, grooming options, and expert tips — all in one friendly interface.

## 🌐 Live Demo
[Live Site URL](#) <!-- Add your deployment URL here -->

## 🚀 Features

### 🔐 Authentication System
- **User Registration & Login** with email/password
- **Google OAuth Integration** for seamless sign-in
- **Password Reset** functionality with email verification
- **Protected Routes** for authenticated users only
- **Profile Management** with update capabilities

### 🏠 Homepage
- **Hero Slider** with winter-themed pet care highlights
- **Popular Services** showcase with ratings and pricing
- **Winter Care Tips** section with essential pet safety information
- **Expert Veterinarians** display with specialties and experience
- **Emergency CTA** section for 24/7 winter care services

### 🛍️ Services
- **Service Catalog** with detailed listings
- **Advanced Filtering** by category, price range, and rating
- **Search Functionality** to find specific services
- **Grid/List View Toggle** for personalized browsing
- **Service Details** with booking forms

### 👤 User Profile
- **Personal Information** management
- **Profile Photo** upload and display
- **Account Statistics** and join date
- **Pet Preferences** customization
- **Quick Actions** for common tasks

### 📱 Responsive Design
- **Mobile-First** approach
- **Tablet & Desktop** optimized layouts
- **Touch-Friendly** interactions
- **Cross-Browser** compatibility

## 🏗️ Project Architecture

```
src/
├── components/          # Reusable UI Components
│   ├── Navbar.jsx      # Navigation with auth state
│   ├── Footer.jsx      # Site footer with contact info
│   ├── ServiceCard.jsx # Service display component
│   ├── ExpertCard.jsx  # Veterinarian expert card
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   └── LoadingSpinner.jsx # Loading state component
├── pages/              # Application Pages
│   ├── Home.jsx        # Landing page with hero section
│   ├── Services.jsx    # Service listing and filtering
│   ├── ServiceDetails.jsx # Individual service with booking
│   ├── Profile.jsx     # User profile management
│   ├── Login.jsx       # Authentication page
│   ├── Register.jsx    # User registration
│   └── ForgotPassword.jsx # Password recovery
├── layouts/            # Layout Components
│   └── RootLayout.jsx  # Main app layout wrapper
├── context/            # React Context Providers
│   └── AuthContext.jsx # Authentication state management
├── data/               # Static Data Files
│   ├── services.json   # Pet care services data
│   ├── experts.json    # Veterinarian experts data
│   └── tips.json       # Winter care tips
├── utils/              # Utility Functions
│   └── firebase.js     # Firebase configuration
├── assets/             # Static Assets
│   ├── images/         # Image files
│   └── styles/         # Global styles
├── App.jsx             # Main application component
├── main.jsx            # React DOM entry point
└── index.css           # Global styles and Tailwind imports
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - UI library with modern hooks
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and transitions
- **Animate.css** - CSS animation library
- **AOS** - Scroll animation library

### Backend & Authentication
- **Firebase 10** - Backend-as-a-Service
- **Firebase Auth** - User authentication
- **Firebase Analytics** - User behavior tracking

### Additional Packages
- **React Hot Toast** - Notification system
- **Swiper** - Touch slider for hero section
- **Heroicons React** - SVG icon library (embedded SVGs)

## 📦 Package Dependencies

### Production Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.14",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "tailwindcss": "^4.1.14",
  "firebase": "^10.14.1",
  "react-hot-toast": "^2.5.2",
  "aos": "^2.3.4",
  "swiper": "^11.2.5",
  "animate.css": "^4.1.1",
  "framer-motion": "^11.15.0"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.36.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@vitejs/plugin-react": "^5.0.4",
  "daisyui": "^5.2.3",
  "eslint": "^9.36.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.22",
  "globals": "^16.4.0",
  "vite": "^7.1.7"
}
```

## 🎯 Key Implementation Details

### Authentication Flow
- JWT-based authentication with Firebase
- Protected route implementation
- Automatic redirect after login
- Persistent login state

### Animation System
- Page transitions with Framer Motion
- Scroll-triggered animations with AOS
- Hover effects and micro-interactions
- Loading states and skeleton screens

### Responsive Design
- Mobile-first CSS approach
- Flexible grid systems
- Responsive typography
- Touch-optimized interactions

### Performance Optimizations
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Efficient re-renders with React.memo()
- Bundle size optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/warmpaws.git
   cd warmpaws
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Firebase Configuration

### Required Firebase Services
1. **Authentication**
   - Enable Email/Password provider
   - Enable Google OAuth provider
   - Add authorized domains (localhost and production URL)

2. **Firestore** (if needed for future features)
3. **Storage** (if needed for user uploads)

### Firebase Security Rules
```javascript
// Example Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Firebase for authentication and backend services
- Tailwind CSS for the utility-first CSS framework
- React community for excellent documentation and resources
- Unsplash for high-quality pet images

## 📞 Support

For support, email hello@warmpaws.com or join our Slack channel.

---

**Built with ❤️ for pet lovers everywhere** 🐶🐱