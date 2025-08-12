# Multi-stage build for community-service
FROM maven:3.9-openjdk-17-slim AS build

# Set working directory
WORKDIR /app

# Copy parent pom and shared-lib first for better layer caching
COPY ../pom.xml ./
COPY ../shared-lib ./shared-lib/

# Copy community-service source
COPY pom.xml ./community-service/pom.xml
COPY src ./community-service/src/

# Build the service
WORKDIR /app/community-service
RUN mvn -B -e -DskipTests clean package

# Runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/community-service/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/app.jar"]