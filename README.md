# FingCart - E-commerce Application using Spring Boot + Spring Security + JWT + Microservices

## Overview

FingCart is a microservices-based e-commerce platform developed with Spring Boot, Spring Security, and JWT. 
The project is currently under development, with core features such as REST APIs for product and category management, including create, read, update, delete, 
pagination, and filtering already implemented. Both category and product APIs support pagination for efficient data retrieval. 
The system uses Spring Cloud Gateway with a reactive stack for API routing and service discovery, enabling scalable microservice communication.

WebClient is used for non-blocking reactive communication in Microservices. 
Secure user authentication and authorization are implemented using JWT tokens.

## Prerequisites

- **Java 17** or higher
- **Spring Boot 3.x**
- **Maven** 
- **PostgreSQL**
- **MySQL**
- **MongoDB** (NoSQL database)
- **Eureka**
- **Reactive Gateway** (API gateway)
- **Docker** (containerization)
- **ConfigServer** (centralized configuration management)

## Microservices

The application consists of the following microservices: auth-service, category-service, product-service, api-gateway, and discovery-server

 - **Auhentication Service and User Service**:
   - Manages user registration, update user details, get user by Id, and delete user data.
   - Handles authentication and authorization with Spring Security + JWT.
   - Implementing security rules for endpoints based on user roles.
 - **Category Service**: Handles categories by creating, updating, deleting and retrieving category data.
 - **Product Service**: Manages product catalog (create, update, retrieve, and delete).
 - **Servie Discovery(Eureka)**: Enables service discovery and dynamic routing between microservices, allowing services to register and discover each other.
 - **API Gateway**:
   - Single entry point for all clients.
   - Routes incoming requests to respective services.
 - **Cart Service**: 
   - Automatically creates a shopping cart for each user and keeps it updated in real time.
   - Add products, update quantities, or remove items with instant feedback.

