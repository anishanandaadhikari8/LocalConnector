# NeighborConnect Backend Development Setup
## Quick Start Guide for Developers

---

## 🛠️ Prerequisites

### Required Software
- **Java 17** or higher
- **Maven 3.8+**
- **Docker & Docker Compose**
- **Git**
- **IDE** (IntelliJ IDEA, VS Code, or Eclipse)
- **PostgreSQL 15** (for local development)
- **Redis 7** (for caching)

### Optional Tools
- **Kubernetes** (for container orchestration)
- **Helm** (for K8s package management)
- **kubectl** (for K8s CLI)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/neighborconnect-backend.git
cd neighborconnect-backend
```

### 2. Start Infrastructure with Docker
```bash
# Start PostgreSQL, Redis, and other services
docker-compose up -d postgres redis

# Verify services are running
docker-compose ps
```

### 3. Set Up Database
```bash
# Create database and run migrations
./scripts/setup-database.sh

# Or manually:
psql -h localhost -U postgres -d postgres -c "CREATE DATABASE neighborconnect;"
```

### 4. Start Services
```bash
# Start all services in development mode
./scripts/start-dev.sh

# Or start individually:
cd user-service && mvn spring-boot:run
cd connector-service && mvn spring-boot:run
cd api-gateway && mvn spring-boot:run
```

### 5. Verify Setup
```bash
# Check API Gateway
curl http://localhost:8080/actuator/health

# Check User Service
curl http://localhost:8081/actuator/health

# Check Connector Service
curl http://localhost:8082/actuator/health
```

---

## 📋 Detailed Setup Instructions

### Step 1: Environment Setup

#### Install Java 17
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# macOS (with Homebrew)
brew install openjdk@17

# Windows
# Download from: https://adoptium.net/temurin/releases/?version=17
```

#### Install Maven
```bash
# Ubuntu/Debian
sudo apt install maven

# macOS
brew install maven

# Windows
# Download from: https://maven.apache.org/download.cgi
```

#### Install Docker
```bash
# Ubuntu/Debian
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER

# macOS
brew install --cask docker

# Windows
# Download Docker Desktop from: https://www.docker.com/products/docker-desktop
```

### Step 2: Project Structure Setup

#### Create Project Structure
```bash
mkdir -p neighborconnect-backend/{api-gateway,user-service,connector-service,shared-lib}
mkdir -p neighborconnect-backend/{kubernetes,scripts,docs}
```

#### Parent POM Configuration
```xml
<!-- parent/pom.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.neighborconnect</groupId>
    <artifactId>neighborconnect-parent</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    
    <name>NeighborConnect Parent</name>
    <description>Parent POM for NeighborConnect microservices</description>
    
    <modules>
        <module>shared-lib</module>
        <module>user-service</module>
        <module>connector-service</module>
        <module>api-gateway</module>
    </modules>
    
    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <spring-boot.version>3.2.0</spring-boot.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
        <postgresql.version>42.7.1</postgresql.version>
        <jwt.version>0.12.3</jwt.version>
    </properties>
    
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                    <version>${spring-boot.version}</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>
```

### Step 3: Database Setup

#### PostgreSQL Configuration
```sql
-- Create database
CREATE DATABASE neighborconnect;

-- Create user (optional)
CREATE USER neighborconnect_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE neighborconnect TO neighborconnect_user;
```

#### Database Migration Script
```bash
#!/bin/bash
# scripts/setup-database.sh

echo "Setting up NeighborConnect database..."

# Database connection details
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="neighborconnect"
DB_USER="postgres"
DB_PASSWORD="password"

# Create database if it doesn't exist
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "
    SELECT 'CREATE DATABASE $DB_NAME'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec
"

echo "Database setup complete!"
```

### Step 4: Service Configuration

#### User Service Configuration
```yaml
# user-service/src/main/resources/application.yml
spring:
  application:
    name: user-service
  profiles:
    active: dev
  datasource:
    url: jdbc:postgresql://localhost:5432/neighborconnect
    username: postgres
    password: password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
  redis:
    host: localhost
    port: 6379
    timeout: 2000ms
  security:
    jwt:
      secret: your-super-secret-jwt-key-here-make-it-long-and-secure
      expiration: 86400000 # 24 hours

server:
  port: 8081

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always

logging:
  level:
    com.neighborconnect: DEBUG
    org.springframework.security: DEBUG
```

#### Connector Service Configuration
```yaml
# connector-service/src/main/resources/application.yml
spring:
  application:
    name: connector-service
  profiles:
    active: dev
  datasource:
    url: jdbc:postgresql://localhost:5432/neighborconnect
    username: postgres
    password: password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
  redis:
    host: localhost
    port: 6379
    timeout: 2000ms

server:
  port: 8082

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always

logging:
  level:
    com.neighborconnect: DEBUG
```

### Step 5: Docker Configuration

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: neighborconnect-postgres
    environment:
      POSTGRES_DB: neighborconnect
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql
    networks:
      - neighborconnect-network

  redis:
    image: redis:7-alpine
    container_name: neighborconnect-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - neighborconnect-network

  api-gateway:
    build:
      context: ./api-gateway
      dockerfile: Dockerfile
    container_name: neighborconnect-api-gateway
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: dev
      SPRING_CLOUD_GATEWAY_DISCOVERY_LOCATOR_ENABLED: true
    depends_on:
      - postgres
      - redis
    networks:
      - neighborconnect-network

  user-service:
    build:
      context: ./user-service
      dockerfile: Dockerfile
    container_name: neighborconnect-user-service
    ports:
      - "8081:8081"
    environment:
      SPRING_PROFILES_ACTIVE: dev
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/neighborconnect
      SPRING_REDIS_HOST: redis
    depends_on:
      - postgres
      - redis
    networks:
      - neighborconnect-network

  connector-service:
    build:
      context: ./connector-service
      dockerfile: Dockerfile
    container_name: neighborconnect-connector-service
    ports:
      - "8082:8082"
    environment:
      SPRING_PROFILES_ACTIVE: dev
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/neighborconnect
      SPRING_REDIS_HOST: redis
    depends_on:
      - postgres
      - redis
    networks:
      - neighborconnect-network

volumes:
  postgres_data:
  redis_data:

networks:
  neighborconnect-network:
    driver: bridge
```

#### Dockerfile Template
```dockerfile
# Dockerfile (for each service)
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build the application
RUN mvn clean package -DskipTests

# Create runtime image
FROM openjdk:17-jre-slim

WORKDIR /app

# Copy the built JAR
COPY --from=0 /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Step 6: Development Scripts

#### Start Development Environment
```bash
#!/bin/bash
# scripts/start-dev.sh

echo "Starting NeighborConnect development environment..."

# Start infrastructure
echo "Starting PostgreSQL and Redis..."
docker-compose up -d postgres redis

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Run database migrations
echo "Running database migrations..."
./scripts/setup-database.sh

# Start services in background
echo "Starting microservices..."

# Start User Service
cd user-service
mvn spring-boot:run > ../logs/user-service.log 2>&1 &
USER_SERVICE_PID=$!
cd ..

# Start Connector Service
cd connector-service
mvn spring-boot:run > ../logs/connector-service.log 2>&1 &
CONNECTOR_SERVICE_PID=$!
cd ..

# Start API Gateway
cd api-gateway
mvn spring-boot:run > ../logs/api-gateway.log 2>&1 &
GATEWAY_PID=$!
cd ..

# Save PIDs for cleanup
echo $USER_SERVICE_PID > .pids/user-service.pid
echo $CONNECTOR_SERVICE_PID > .pids/connector-service.pid
echo $GATEWAY_PID > .pids/api-gateway.pid

echo "Development environment started!"
echo "API Gateway: http://localhost:8080"
echo "User Service: http://localhost:8081"
echo "Connector Service: http://localhost:8082"
echo ""
echo "Logs are available in the logs/ directory"
echo "To stop services, run: ./scripts/stop-dev.sh"
```

#### Stop Development Environment
```bash
#!/bin/bash
# scripts/stop-dev.sh

echo "Stopping NeighborConnect development environment..."

# Stop services
if [ -f .pids/user-service.pid ]; then
    kill $(cat .pids/user-service.pid) 2>/dev/null
    rm .pids/user-service.pid
fi

if [ -f .pids/connector-service.pid ]; then
    kill $(cat .pids/connector-service.pid) 2>/dev/null
    rm .pids/connector-service.pid
fi

if [ -f .pids/api-gateway.pid ]; then
    kill $(cat .pids/api-gateway.pid) 2>/dev/null
    rm .pids/api-gateway.pid
fi

# Stop infrastructure (optional)
read -p "Stop PostgreSQL and Redis containers? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down
fi

echo "Development environment stopped!"
```

### Step 7: Testing Setup

#### Test Configuration
```yaml
# src/test/resources/application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  redis:
    host: localhost
    port: 6379

logging:
  level:
    com.neighborconnect: DEBUG
```

#### Test Scripts
```bash
#!/bin/bash
# scripts/run-tests.sh

echo "Running NeighborConnect tests..."

# Run all tests
mvn clean test

# Run specific service tests
echo "Running User Service tests..."
cd user-service && mvn test && cd ..

echo "Running Connector Service tests..."
cd connector-service && mvn test && cd ..

echo "Tests completed!"
```

---

## 🔧 IDE Configuration

### IntelliJ IDEA Setup
1. **Import Project**: File → Open → Select `neighborconnect-backend` folder
2. **Maven Import**: Import Maven projects automatically
3. **Run Configurations**: Create run configurations for each service
4. **Database Connection**: Add PostgreSQL connection
5. **Docker Integration**: Enable Docker plugin

### VS Code Setup
1. **Extensions**: Install Java Extension Pack, Spring Boot Extension Pack
2. **Java Home**: Set JAVA_HOME environment variable
3. **Maven**: Install Maven extension
4. **Docker**: Install Docker extension

---

## 🧪 Testing the Setup

### 1. Health Check
```bash
# Check API Gateway
curl http://localhost:8080/actuator/health

# Check User Service
curl http://localhost:8081/actuator/health

# Check Connector Service
curl http://localhost:8082/actuator/health
```

### 2. User Registration Test
```bash
# Register a new user
curl -X POST http://localhost:8080/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 3. User Login Test
```bash
# Login with the registered user
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Connector Creation Test
```bash
# Create a connector (requires authentication)
curl -X POST http://localhost:8080/api/v1/connectors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Community",
    "description": "A test community for development",
    "category": "General"
  }'
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :8080
lsof -i :8081
lsof -i :8082

# Kill process
kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

#### 3. Redis Connection Issues
```bash
# Check Redis status
docker-compose ps redis

# Test Redis connection
redis-cli ping

# Restart Redis
docker-compose restart redis
```

#### 4. Maven Build Issues
```bash
# Clean and rebuild
mvn clean install

# Update dependencies
mvn dependency:resolve

# Skip tests
mvn clean install -DskipTests
```

#### 5. Docker Issues
```bash
# Clean up Docker
docker system prune -a

# Rebuild images
docker-compose build --no-cache

# Restart Docker service
sudo systemctl restart docker
```

---

## 📚 Additional Resources

### Documentation
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Cloud Reference](https://spring.io/projects/spring-cloud)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL GUI
- [Redis Commander](https://github.com/joeferner/redis-commander) - Redis GUI
- [Docker Desktop](https://www.docker.com/products/docker-desktop) - Docker GUI

### Monitoring
- [Prometheus](https://prometheus.io/) - Metrics collection
- [Grafana](https://grafana.com/) - Visualization
- [ELK Stack](https://www.elastic.co/elk-stack) - Logging

This setup guide provides everything needed to get started with NeighborConnect backend development quickly and efficiently. 