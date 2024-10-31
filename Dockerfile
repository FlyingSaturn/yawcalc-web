# Use an official Java runtime as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the jar file into the container
COPY target/your-app-name.jar app.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
