# NeighborConnect - Hyperlocal Community Social Network

A full-featured React Native mobile application for building stronger neighborhood communities through local social networking.

## 🌟 Features

### Core Functionality
- **Community Posts**: Share updates, events, and information with neighbors
- **Category-based Content**: Organize posts by General, Buy/Sell, Lost & Found, and Alerts
- **Real-time Notifications**: Stay updated with neighborhood activities
- **User Profiles**: Complete user profiles with reputation system
- **Search & Filter**: Find relevant content quickly
- **Image Upload**: Share photos with posts using camera or gallery

### Enhanced UI/UX
- **Modern Greenish Theme**: Attractive emerald green color scheme
- **Dark/Light Mode Support**: Adaptive theming system
- **Responsive Design**: Optimized for various screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **Accessibility**: Screen reader support and high contrast options

### Social Features
- **Like & Comment System**: Engage with community posts
- **User Verification**: Trusted neighbor verification system
- **Reputation Scoring**: Community trust indicators
- **Location-based Content**: Hyperlocal neighborhood focus
- **Tag System**: Categorized content discovery

### Technical Features
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Real-time updates (mock implementation)
- **Image Compression**: Optimized image handling
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Graceful error management

## 📱 Screens

### Authentication
- **Splash Screen**: App introduction and loading
- **Sign In**: User authentication with email/password
- **Sign Up**: New user registration

### Main App
- **Home Feed**: Community posts with search and filtering
- **Post Details**: Full post view with comments
- **Create Post**: Rich post creation with image upload
- **User Profile**: Personal profile and settings
- **Notifications**: Real-time activity updates

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (#059669)
- **Secondary**: Green (#10b981)
- **Accent**: Light Emerald (#34d399)
- **Background**: Clean white/light gray
- **Text**: Dark gray for readability

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, comfortable line height
- **Captions**: Subtle, informative

### Components
- **Cards**: Elevated, rounded corners
- **Buttons**: Consistent styling with hover states
- **Inputs**: Clear focus states and validation
- **Icons**: Material Design icon set

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neighborconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

### Mock Credentials
For testing purposes, use any email and password combination:
- **Email**: `user@example.com`
- **Password**: `password123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PostCard.js     # Post display component
│   └── ...
├── screens/            # App screens
│   ├── HomeScreen.js   # Main feed
│   ├── ProfileScreen.js # User profile
│   └── ...
├── navigation/         # Navigation configuration
│   └── AppNavigator.js # Main navigation setup
├── data/              # Mock data and constants
│   └── mockData.js    # Sample posts, users, notifications
├── theme/             # Design system
│   └── theme.js       # Color schemes and styling
└── utils/             # Utility functions
    └── helpers.js     # Helper functions
```

## 🔧 Configuration

### Environment Setup
The app uses Expo's managed workflow with the following key configurations:

- **Expo SDK**: 50.0.0
- **React Native**: 0.73.2
- **React Navigation**: 6.x
- **React Native Paper**: 5.12.1

### Key Dependencies
- `expo-image-picker`: Image selection and camera access
- `date-fns`: Date formatting and manipulation
- `react-native-paper`: Material Design components
- `@react-navigation`: Navigation system

## 📊 Mock Data

The app includes comprehensive mock data for demonstration:

### Sample Posts
- Community events and announcements
- Buy/sell items with pricing
- Lost and found pets
- Important alerts and notifications

### User Profiles
- Verified and unverified users
- Reputation scores
- Neighborhood associations
- Activity statistics

### Notifications
- Comment notifications
- Like notifications
- Follow notifications
- Alert notifications

## 🎯 Key Features Explained

### Post Creation
- **Category Selection**: Choose from predefined categories
- **Image Upload**: Take photos or select from gallery
- **Location Tagging**: Specify neighborhood location
- **Price Setting**: For buy/sell items
- **Tag System**: Add relevant tags for discoverability

### Search & Filter
- **Text Search**: Search posts, users, and locations
- **Category Filter**: Filter by post type
- **Tag Filter**: Find posts by specific tags
- **Location Filter**: Find posts in specific areas

### User Experience
- **Pull to Refresh**: Update feed content
- **Infinite Scroll**: Load more posts (mock implementation)
- **Smooth Navigation**: Seamless screen transitions
- **Loading States**: Clear feedback during operations

## 🔒 Security & Privacy

### Data Protection
- **Mock Authentication**: Simulated login system
- **User Verification**: Trust indicators for community safety
- **Privacy Controls**: User-controlled data sharing
- **Location Privacy**: Optional location sharing

### Community Safety
- **Content Moderation**: Post categorization and filtering
- **User Reporting**: Report inappropriate content (mock)
- **Neighborhood Boundaries**: Local community focus

## 🚀 Future Enhancements

### Planned Features
- **Real-time Chat**: Direct messaging between neighbors
- **Event Calendar**: Community event management
- **Emergency Alerts**: Critical neighborhood notifications
- **Business Directory**: Local business listings
- **Neighborhood Groups**: Interest-based communities

### Technical Improvements
- **Backend Integration**: Real API endpoints
- **Push Notifications**: Firebase integration
- **Offline Sync**: Robust offline functionality
- **Performance Optimization**: Image caching and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **React Native Community**: For the robust framework
- **Material Design**: For the design system inspiration
- **Unsplash**: For the sample images used in mock data

---

**NeighborConnect** - Building stronger communities, one neighborhood at a time! 🏘️✨ 