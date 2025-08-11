FROM eclipse-temurin:17-jdk as build
WORKDIR /workspace
COPY . /workspace/backend/community-service
# This Dockerfile assumes multi-module build is handled outside; using Spring Boot jar directly is simpler in dev

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app/app.jar"]