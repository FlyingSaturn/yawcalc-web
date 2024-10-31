# Use a Maven image to build the app
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .

RUN mvn -N wrapper:wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package

# Stage 2: Create the final Docker image using OpenJDK 19
FROM openjdk:19-jdk
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
