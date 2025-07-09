# Multi-stage build
FROM maven:3.9-openjdk-17-slim AS build

# Set working directory
WORKDIR /app

# Copy parent pom.xml and shared-lib first
COPY ../pom.xml ./
COPY ../shared-lib ./shared-lib/

# Copy user-service source
COPY pom.xml ./user-service/
COPY src ./user-service/src/

# Build the application
WORKDIR /app/user-service
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/user-service/target/*.jar app.jar

# Create logs directory
RUN mkdir -p /app/logs

# Expose port
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8081/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "app.jar"]