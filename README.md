# Circles - Neighbor Connect MVP

A modern community management platform for apartments, hotels, and offices. Built with React Native Web + Expo, featuring a beautiful UI and comprehensive functionality.

## 🚀 Features

### Core Functionality
- **Amenity Booking System** - Reserve gym, pool, community rooms with conflict detection
- **Incident Management** - Report and track maintenance/security issues
- **Community Communications** - Announcements, events with RSVP, polls
- **Member Management** - Role-based access control (Resident, Admin, Security, Maintenance)
- **Analytics Dashboard** - KPI tracking, demand forecasting, anomaly detection

### Circle Types
- **🏢 Apartments** - Full feature set (bookings, incidents, comms, analytics)
- **🏨 Hotels** - Restaurant bookings, room service, promotions
- **🏢 Offices** - Meeting room reservations, visitor management

### Technical Features
- **Cross-Platform** - Web PWA + iOS/Android via Expo
- **Modern UI** - Polished design with accessibility focus
- **Mock API** - Complete development environment with realistic data
- **TypeScript** - Full type safety and developer experience
- **Responsive Design** - Works on all screen sizes

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (optional, for mobile development)

### Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd circles
   npm install
   ```

2. **Start the development server (Windows)**
   ```powershell
   powershell -ExecutionPolicy Bypass -File start-app.ps1
   ```
   Press `w` to open Web when prompted.

3. **Open in browser**
   - Navigate to `http://localhost:8081` (or the port shown in terminal)
   - The app will automatically open in your default browser

### Development Commands

```bash
# Start web development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎭 Demo Script (7 minutes)

### 1. Resident Experience (3 min)
1. **Login as Resident**
   - Select "Oakwood Apartments"
   - Choose "Sarah Johnson" (RESIDENT)
   - Continue

2. **Book an Amenity**
   - Tap "Book" tab
   - Select "Fitness Center"
   - Choose tomorrow's date
   - Pick 7:00 PM start time
   - Submit booking request
   - ✅ Success! Booking submitted

3. **View Home Dashboard**
   - See pinned announcements
   - Check upcoming bookings
   - Browse community events
   - Participate in polls

### 2. Admin Experience (3 min)
1. **Login as Admin**
   - Select "Oakwood Apartments"
   - Choose "Mike Chen" (ADMIN)
   - Continue

2. **Dashboard Overview**
   - View KPI cards (bookings, approval time, MTTR)
   - Check recent activities
   - Quick stats overview

3. **Manage Bookings**
   - Tap "Approvals" tab
   - See pending booking requests
   - Approve/reject as needed

4. **Analytics Insights**
   - Tap "Analytics" tab
   - View demand forecasting
   - Check anomaly alerts
   - Apply suggested policies

### 3. Feature Exploration (1 min)
- **Switch Circles**: Try River Inn Hotel or North Tower Office
- **Different Roles**: Test Security, Maintenance, Staff roles
- **Mobile Experience**: Resize browser to mobile dimensions

### Fixture Users
- Oakwood Apartments (APARTMENT)
  - Sarah Johnson (RESIDENT)
  - Alex Kim (RESIDENT)
  - Maria Garcia (RESIDENT)
  - Mike Chen (ADMIN)
  - Lisa Rodriguez (SECURITY)
  - David Thompson (MAINTENANCE)
- River Inn Hotel (HOTEL)
  - Emma Wilson (STAFF)
- North Tower Office (OFFICE)
  - James Brown (STAFF)

### Kiosk Check-in (demo)
- Route: `/kiosk/checkin` — enter a booking ID from Resident → Bookings and press Check-in.

## 🏗️ Architecture

### Frontend Structure
```
apps/client/
├── app/                    # Expo Router pages
│   ├── (auth)/           # Authentication flows
│   ├── (resident)/       # Resident user interface
│   ├── (admin)/          # Admin management interface
│   └── _layout.tsx       # Root layout
├── src/
│   ├── api/              # API adapters (Mock/HTTP)
│   ├── components/       # Reusable UI components
│   ├── fixtures/         # Mock data and schemas
│   ├── store/            # State management (Zustand)
│   ├── theme/            # Design system & tokens
│   └── utils/            # Helper functions
```

### Key Technologies
- **React Native Web** - Cross-platform UI
- **Expo Router** - File-based routing
- **Tamagui** - Design system & components
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **TypeScript** - Type safety

### Mock API Features
- **Realistic Data** - 3 circles, 8 users, comprehensive fixtures
- **Simulated Latency** - 200-400ms responses
- **Local Storage** - Persists changes across sessions
- **Conflict Detection** - Prevents double-bookings
- **Status Workflows** - Full booking/incident lifecycles

## 🎨 Design System

### Color Palette
- **Primary**: `#6C8CFF` (Blue)
- **Accent**: `#4CC38A` (Green)
- **Warning**: `#FFC857` (Yellow)
- **Danger**: `#FF6B6B` (Red)
- **Text**: `#111318` (Dark Gray)

### Typography
- **H1**: 40px/48px, Weight 800
- **H2**: 28px/36px, Weight 700
- **H3**: 22px/30px, Weight 700
- **Body**: 16px/24px, Weight 400
- **Caption**: 13px/18px, Weight 400

### Components
- **Cards**: 16px radius, soft shadows
- **Buttons**: 12px radius, hover states
- **Motion**: 120-200ms transitions
- **Spacing**: 8px grid system

## 🔧 Development Notes

### Current Status
- ✅ **Frontend Complete** - All major screens implemented
- ✅ **Mock API** - Full data layer with realistic responses
- ✅ **Design System** - Comprehensive tokens and components
- ✅ **Navigation** - Resident and admin flows
- ✅ **Responsive UI** - Works on all screen sizes

### Next Steps (Backend Phase)
- Spring Boot API implementation
- PostgreSQL database setup
- JWT authentication
- Real-time notifications
- Performance optimization

### Known Limitations
- Mock data only (no real backend)
- Local storage persistence
- No real-time updates
- Limited image handling

## 📱 Platform Support

### Web (Primary)
- **PWA Ready** - Installable on desktop/mobile
- **Responsive Design** - Mobile-first approach
- **Modern Browsers** - Chrome, Firefox, Safari, Edge

### Mobile (Expo)
- **iOS** - iPhone/iPad support
- **Android** - All major devices
- **Expo Go** - Easy testing and development

## 🤝 Contributing

1. Follow the established design patterns
2. Maintain TypeScript strict mode
3. Use the design system tokens
4. Test on multiple screen sizes
5. Ensure accessibility compliance

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for modern community management**
