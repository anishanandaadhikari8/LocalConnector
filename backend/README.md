# NeighborConnect Backend Services

A comprehensive microservices backend for the NeighborConnect hyperlocal social platform built with Spring Boot, featuring user management, connector services, and complete API documentation.

## 🏗️ Architecture Overview

The backend consists of multiple microservices:

- **User Service** (Port 8081) - Authentication, user management, profiles
- **Connector Service** (Port 8082) - Community/connector management
- **Post Service** (Port 8083) - Posts, comments, content management
- **Event Service** (Port 8084) - Event creation and management
- **Marketplace Service** (Port 8085) - Buy/sell functionality
- **Chat Service** (Port 8086) - Real-time messaging
- **Notification Service** (Port 8087) - Push notifications
- **API Gateway** (Port 8080) - Central API routing and load balancing

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Maven 3.8+
- Docker & Docker Compose
- PostgreSQL 15+ (for production)
- Redis 7+ (for caching)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neighborconnect/backend
   ```

2. **Start infrastructure services**
   ```bash
   docker-compose up -d postgres redis
   ```

3. **Run User Service**
   ```bash
   cd user-service
   mvn spring-boot:run
   ```

4. **Access the application**
   - User Service API: http://localhost:8081
   - Swagger UI: http://localhost:8081/swagger-ui.html
   - H2 Console: http://localhost:8081/h2-console

### Production Setup with Docker

1. **Build and run all services**
   ```bash
   docker-compose up --build
   ```

2. **Access services**
   - API Gateway: http://localhost:8080
   - User Service: http://localhost:8081
   - Connector Service: http://localhost:8082
   - Grafana Monitoring: http://localhost:3000 (admin/admin)
   - Prometheus: http://localhost:9090

## 📋 Available Services

### ✅ User Service (Implemented)

**Features:**
- User registration and authentication
- JWT token-based security
- Email verification
- Profile management
- User search and discovery
- Reputation system
- Admin user management

**Key Endpoints:**
```
POST   /api/v1/users/register     # Register new user
POST   /api/v1/users/login        # User login
GET    /api/v1/users/profile      # Get current user profile
PUT    /api/v1/users/profile      # Update profile
GET    /api/v1/users/search       # Search users
GET    /api/v1/users/{id}         # Get user by ID
GET    /api/v1/users/verify-email # Verify email
```

**Mock Users Available:**
- Email: `john.doe@example.com`, Password: `password123`
- Email: `jane.smith@example.com`, Password: `password123`
- Email: `admin@neighborconnect.com`, Password: `password123`
- (All mock users use password: `password123`)

### 🔄 Connector Service (In Progress)

**Planned Features:**
- Create and manage connectors for all 6 types:
  - Apartment/HOA Connectors
  - Local Marketplace
  - Neighborhood Watch/Safety
  - Event & Party Organizing
  - Roommate Connectors
  - Dating for Verified Locals
- Member management (join/leave)
- Module configuration (enable/disable features)
- Geo-radius settings
- Verification requirements

### 🔄 Additional Services (Planned)

- **Post Service** - Content management for all connector types
- **Event Service** - Event creation, RSVP, calendar integration
- **Marketplace Service** - Buy/sell listings with payment integration
- **Chat Service** - Real-time messaging with WebSocket
- **Notification Service** - Push notifications and email alerts

## 🛠️ Technology Stack

### Core Technologies
- **Spring Boot 3.2** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database access
- **JWT** - Token-based authentication
- **Maven** - Dependency management
- **Docker** - Containerization

### Databases
- **H2** - Development database
- **PostgreSQL 15** - Production database
- **Redis 7** - Caching and sessions

### Monitoring & Observability
- **Spring Actuator** - Health checks and metrics
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards
- **ELK Stack** - Logging and analysis

### API Documentation
- **OpenAPI 3** - API specification
- **Swagger UI** - Interactive API documentation

## 🔐 Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Encryption** - BCrypt hashing
- **CORS Configuration** - Cross-origin request handling
- **Role-based Access Control** - Admin vs User permissions
- **Email Verification** - Account activation
- **Security Headers** - Protection against common attacks

## 🧪 Testing

### Run Tests
```bash
# Unit tests
mvn test

# Integration tests
mvn test -Dtest="*IntegrationTest"

# All tests with coverage
mvn clean test jacoco:report
```

### Test Data
The application automatically creates mock users in development mode:
- 10 test users with various neighborhoods
- Admin user for testing admin functionality
- All users verified and active for testing

## 📊 Monitoring

### Health Checks
- **Service Health**: `GET /actuator/health`
- **Database Health**: Included in health endpoint
- **Redis Health**: Included in health endpoint

### Metrics
- **Application Metrics**: `GET /actuator/metrics`
- **Prometheus Format**: `GET /actuator/prometheus`
- **Custom Metrics**: User registration, login attempts, API usage

### Grafana Dashboards
Access monitoring at http://localhost:3000 (admin/admin):
- JVM metrics and performance
- Database connection pools
- API request rates and response times
- Custom business metrics

## 🔧 Configuration

### Environment Variables
```bash
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/neighborconnect
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-256-bit-secret
JWT_EXPIRATION=86400000

# Email (for production)
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Application
APP_BASE_URL=http://localhost:8081
```

### Profiles
- **dev** - H2 database, debug logging, mock data
- **docker** - PostgreSQL, Redis, production logging
- **prod** - Full production configuration

## 🚧 Development Guidelines

### Adding New Services

1. **Create service module**
   ```bash
   mkdir new-service
   cd new-service
   # Copy structure from user-service
   ```

2. **Update parent POM**
   ```xml
   <modules>
     <module>new-service</module>
   </modules>
   ```

3. **Add to Docker Compose**
   ```yaml
   new-service:
     build: ./new-service
     ports:
       - "808X:808X"
   ```

### Code Standards
- Use Lombok for reducing boilerplate
- Follow REST API conventions
- Add comprehensive Swagger documentation
- Include unit and integration tests
- Implement proper error handling
- Use structured logging

### Database Migrations
- Use Flyway for database version control
- Place migration files in `src/main/resources/db/migration/`
- Follow naming convention: `V1__Initial_schema.sql`

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port
   lsof -ti:8081 | xargs kill -9
   ```

2. **Database Connection Issues**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps postgres
   
   # View logs
   docker-compose logs postgres
   ```

3. **Redis Connection Issues**
   ```bash
   # Test Redis connectivity
   docker exec -it neighborconnect-redis redis-cli ping
   ```

4. **JWT Token Issues**
   - Ensure JWT_SECRET is properly set
   - Check token expiration (default 24 hours)
   - Verify token format in Authorization header

### Logging
- **Development**: Console output with DEBUG level
- **Production**: File logging with structured format
- **Log Location**: `logs/user-service.log`

## 📝 API Documentation

### Swagger UI
Access interactive API documentation:
- User Service: http://localhost:8081/swagger-ui.html
- API Gateway: http://localhost:8080/swagger-ui.html

### OpenAPI Specification
- JSON Format: http://localhost:8081/v3/api-docs
- YAML Format: http://localhost:8081/v3/api-docs.yaml

### Sample API Requests

**Register User:**
```bash
curl -X POST http://localhost:8081/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8081/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "john.doe@example.com",
    "password": "password123"
  }'
```

**Get Profile (with JWT):**
```bash
curl -X GET http://localhost:8081/api/v1/users/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `mvn test`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation
- Check logs for error details

---

**NeighborConnect Backend** - Building the foundation for stronger communities! 🏘️✨