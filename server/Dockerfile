FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /target/twitterclone-0.0.1-SNAPSHOT.jar twitterclone.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","twitterclone.jar"]