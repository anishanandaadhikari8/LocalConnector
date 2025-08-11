# LocalConnector - Full-Stack Community Application

A modern full-stack application built with React Native (Expo) frontend and Spring Boot backend, featuring JWT authentication and a community service platform.

## 🚀 Features

- **Frontend**: React Native with Expo for cross-platform development
- **Backend**: Spring Boot with JWT authentication
- **Database**: H2 in-memory database with Flyway migrations
- **Authentication**: JWT-based secure authentication
- **Security**: Spring Security with custom JWT filters
- **CORS**: Configured for local development and cross-origin requests

## 🏗️ Architecture

```
localConnector/
├── frontend/                 # React Native + Expo application
│   ├── src/
│   │   ├── screens/         # Application screens
│   │   ├── lib/            # API utilities and authentication
│   │   ├── ui/             # Reusable UI components
│   │   └── navigation/     # Navigation configuration
│   └── package.json
├── backend/                 # Spring Boot application
│   └── community-service/
│       ├── src/main/java/
│       │   └── com/localconnector/community/
│       │       ├── controller/    # REST endpoints
│       │       ├── service/       # Business logic
│       │       ├── config/        # Security and CORS configuration
│       │       └── model/         # Data models
│       └── pom.xml
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation between screens
- **ESLint** - Code quality and consistency

### Backend
- **Spring Boot** - Java application framework
- **Spring Security** - Authentication and authorization
- **JWT** - JSON Web Token authentication
- **H2 Database** - In-memory database
- **Flyway** - Database migration tool
- **Maven** - Build and dependency management

## 📋 Prerequisites

- **Java 17** (Eclipse Temurin recommended)
- **Node.js 18+** and npm
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd localConnector
```

### 2. Start the Backend
```bash
cd backend/community-service
# Set Java environment (Windows)
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot"
$env:Path="$env:JAVA_HOME\bin;$env:Path"

# Start Spring Boot application
.\mvnw.cmd -DskipTests spring-boot:run
```

The backend will start on `http://localhost:8082`

### 3. Start the Frontend
```bash
cd frontend
# Set API URL for development
$env:EXPO_PUBLIC_API_URL="http://localhost:8082/api/v1"

# Start Expo development server
npx expo start --web --port 8083
```

The frontend will be available at `http://localhost:8083`

## 🔐 Authentication

The application uses JWT-based authentication with a development endpoint:

- **Endpoint**: `POST /api/v1/auth/devMint`
- **Purpose**: Development authentication bypass for testing
- **Security**: Configured to allow unauthenticated access for development

### Login Credentials (Development)
- **Name**: Anish
- **Unit**: 12B
- **Role**: ADMIN
- **User ID**: 101

## ⚙️ Configuration

### Backend Configuration
- **Port**: 8082
- **Database**: H2 in-memory with file persistence
- **JWT Secret**: Configured in `application.properties`
- **CORS**: Configured for local development

### Frontend Configuration
- **Port**: 8083 (configurable)
- **API URL**: Configurable via `EXPO_PUBLIC_API_URL` environment variable
- **Platform Detection**: Automatically detects Android emulator vs. localhost

## 🗄️ Database

- **Type**: H2 in-memory database
- **Persistence**: File-based storage in `.data/` directory
- **Migrations**: Flyway-managed schema migrations
- **Console**: Available at `http://localhost:8082/h2-console`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Custom Security Filter**: Selective JWT enforcement
- **CORS Configuration**: Cross-origin resource sharing
- **Role-based Access**: User role management system

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend/community-service
.\mvnw.cmd test

# Frontend tests
cd frontend
npm test
```

### Code Quality
- **ESLint**: Frontend code linting
- **TypeScript**: Type checking and compilation
- **Maven**: Backend build and dependency management

## 📱 Platform Support

- **Web**: React Native Web via Expo
- **Android**: Native Android app
- **iOS**: Native iOS app (requires macOS)

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**: If port 8082 is busy, change `server.port` in `application.properties`
2. **JWT Errors**: Ensure JWT secret is at least 256 bits (32 characters)
3. **Connection Refused**: Verify backend is running on correct port
4. **CORS Issues**: Check CORS configuration in `CorsConfig.java`

### Backend Won't Start
- Verify Java 17 is installed and in PATH
- Check Maven wrapper exists (`mvnw.cmd`)
- Ensure no other processes are using port 8082

### Frontend Issues
- Clear Expo cache: `npx expo start --clear`
- Check API URL configuration
- Verify backend is accessible

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/devMint` - Development authentication

### Health Check
- `GET /actuator/health` - Application health status

### Database
- `GET /h2-console` - H2 database console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Expo team for React Native development tools
- React Native community for continuous improvements

---

**Happy Coding! 🎉**


