# FingCart - E-commerce Application using Spring Boot + Spring Security + JWT + Microservices

FingCart is a microservices-based e-commerce platform built using Spring Boot, Spring Cloud, Spring Security, and JWT, 
designed to provide secure, scalable, and efficient service communication.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Category Service](#category-service-category-api)
- [Product Service](#product-service-product-api)
- [Cart Service](#cart-service-cart-api)
- [Auth Service - Auth API](#auth-api)
- [Auth Service - User API](#user-api)
- [Order Service - Checkout API](#checkout-api)
- [Order Service - Order API](#order-api)

## Project Overview
The primary goal of this project is to implement a Spring Boot microservices architecture and evaluate 
how independent services communicate with each other through an API Gateway.

All services are registered with a Eureka Server (Service Registry), and service routing is configured 
through the API Gateway.

## Tech Stack

- Java 8+
- Spring Boot
- Hibernate / JPA
- Spring Cloud
- Eureka
- WebClient
- PostgreSQL / MySQL / MongoDB
- Docker

---

## Core Features

### REST APIs
- Category management
- Product management
- Cart management
- Authentication
- User management
- Checkout and Order management

### Data Handling
- Pagination support for category and product APIs
- Filtering for efficient data retrieval

### API Gateway & Service Communication
- Centralized routing using **Spring Cloud Gateway**
- Service discovery via Eureka
- Supports both blocking and reactive (non-blocking) communication

### Security
- Secure authentication and authorization using **JWT tokens**

---

## Reactive Microservice

The **Order Service** follows a **reactive (non-blocking) programming model**, enabling better performance, 
responsiveness, and scalability under high load.

---

## Implementation Highlights

### Java 8 Features
- Lambda expressions
- Method references
- Stream API
- Optional class

### Lombok
Reduces boilerplate code using:

- `@Getter` and `@Setter`
- `@NoArgsConstructor`
- `@AllArgsConstructor`
- `@Builder`
- `@RequiredArgsConstructor`

### MapStruct
- Used for mapping between DTOs and Models
- Automatically updates model fields from DTOs (Used in the **User API of the auth-service**)

---

**Base URL:** `http://localhost:9000`

---

## Architecture

### Microservices

| Service           | Port | Description                     |
|-------------------|------|---------------------------------|
| API Gateway       | 9000 | Entry point, routing            |
| Discovery Service | 8761 | Eureka server                   |
| Category Service  | 9001 | Category Management             |
| Product Service   | 9002 | Product catalog management      |
| Cart Service      | 9003 | Shopping cart management        |
| Order Service     | 9004 | Order processing                |
| Auth Service      | 9005 | User management, authentication |
| Config Service    | 8888 | Configuration management        |

### Docker Compose (All included Services)

```zsh
docker-compose up -d
```
---
## Category Service (Category API)

Base Path: `/api/categories`

### 1. Create Category

**Endpoint:** `POST /api/categories`

**Request:**
```json
{
  "name": "Smartphones",
  "description": "Discover the latest smartphones designed to fit your life"
}
```

**Response:**
```json
{
  "id": "698a15bd475eb29e33bd839b",
  "name": "Smartphones",
  "description": "Discover the latest smartphones designed to fit your life",
  "createdAt": "2026-02-09T22:43:33.588161",
  "updatedAt": "2026-02-09T22:43:33.588161"
}
```

**Error Responses:**

```json
{
    "error": "Bad Request",
    "message": "Category with this name already exists",
    "timestamp": "2026-02-09T22:45:40.618343",
    "status": 400
}
```

```json
{
  "error": "Internal Server Error",
  "message": "No static resource api/categories.",
  "timestamp": "2026-02-09T22:46:43.01238",
  "status": 500
}
```

### 2. Get all Categories

**Endpoint:** `GET /api/categories`

**Request:**
```json
{  
  "content": [
    {
      "id": "698a1755475eb29e33bd839c",
      "name": "Laptops",
      "description": "Explore a wide range of designs, operating systems, and configurations to find a laptop that fits your needs, whether at home, in the office, or on the go.",
      "createdAt": "2026-02-09T22:50:21.071",
      "updatedAt": "2026-02-09T22:50:21.071"
    },
    {
      "id": "698a180b475eb29e33bd839e",
      "name": "Shirts",
      "description": "Upgrade your wardrobe with our stylish shirt collection.",
      "createdAt": "2026-02-09T22:53:23.466",
      "updatedAt": "2026-02-09T22:53:23.466"
    },
    {
      "id": "698a15bd475eb29e33bd839b",
      "name": "Smartphones",
      "description": "Discover the latest smartphones designed to fit your life",
      "createdAt": "2026-02-09T22:43:33.588",
      "updatedAt": "2026-02-09T22:43:33.588"
    },
    {
      "id": "698a17e8475eb29e33bd839d",
      "name": "Washing Machines",
      "description": "With advanced wash programs, powerful cleaning performance, and water- and energy-efficient technology, modern washing machines handle everything from delicate fabrics to heavy loads.",
      "createdAt": "2026-02-09T22:52:48.693",
      "updatedAt": "2026-02-09T22:52:48.693"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 4,
  "totalPages": 1,
  "last": true,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "sorted": true,
    "unsorted": false
  },
  "numberOfElements": 4,
  "first": true,
  "empty": false
}
```
### 3. Get Category by Id

**Endpoint:** `GET /api/categories/698a15bd475eb29e33bd839b`

**Response:**
```json
{
  "id": "698a15bd475eb29e33bd839b",
  "name": "Smartphones",
  "description": "Discover the latest smartphones designed to fit your life",
  "createdAt": "2026-02-09T22:43:33.588",
  "updatedAt": "2026-02-09T22:43:33.588"
}
```

### 4. Update Category

Update category description

**Endpoint:** `PUT /api/categories/698a15bd475eb29e33bd839b`

**Request:**
```json
{
  "name": "Smartphones",
  "description": "From powerful processors and immersive edge-to-edge displays to advanced camera systems that capture every detail, these devices are designed to keep up with your lifestyle."
}
```

**Response:**
```json
{
  "id": "698a15bd475eb29e33bd839b",
  "name": "Smartphones",
  "description": "From powerful processors and immersive edge-to-edge displays to advanced camera systems that capture every detail, these devices are designed to keep up with your lifestyle.",
  "createdAt": "2026-02-09T22:43:33.588",
  "updatedAt": "2026-02-09T23:38:37.44051"
}
```

**Error Responses:**

```json
{
    "path": "/api/categories/698a15bd475eb29e33bd839",
    "error": "Not Found",
    "message": "Category not found with id 698a15bd475eb29e33bd839",
    "timestamp": "2026-02-09T23:41:23.175133",
    "status": 404
}
```

```json
{
"error": "Internal Server Error",
"message": "No static resource api/categories.",
"timestamp": "2026-02-09T23:41:54.17001",
"status": 500
}
```

### 5. Delete Category

**Endpoint:** `DELETE /api/categories/698a15bd475eb29e33bd839b`

**Response:** `204 No Content`

## Product Service (Product API)

Base Path: `/api/products`

### 1. Create Product

**Endpoint:** `POST /api/products`

**Request:**
```json
{
  "name": "iPhone 16",
  "description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
  "price": 65900,
  "quantity":2,
  "imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
  "categoryId":"698a15bd475eb29e33bd839b"
}
```

**Response:**
```json
{
"id": 12,
"name": "iPhone 16",
"description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
"price": 65900,
"quantity": 2,
"imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
"categoryId": "698a15bd475eb29e33bd839b",
"createdAt": "2026-02-10T21:39:56.910737",
"updatedAt": "2026-02-10T21:39:56.910777"
}
```

### 2. Get all Products

**Endpoint:** `POST /api/products`

**Response:**
```json
{
    "content": [
        {
            "id": 14,
            "name": "Allen Solly Shirt",
            "description": "100% cotton, regular fit, long sleeve",
            "price": 1500.00,
            "quantity": 1,
            "imageUrl": "https://fingcart.com/c/125/p/allen-solly-shirt-90.jpg",
            "categoryId": "698a180b475eb29e33bd839e",
            "createdAt": "2026-02-10T21:52:40.424258",
            "updatedAt": "2026-02-10T21:52:40.424291"
        },
        {
            "id": 12,
            "name": "iPhone 16",
            "description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
            "price": 65900.00,
            "quantity": 2,
            "imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
            "categoryId": "698a15bd475eb29e33bd839b",
            "createdAt": "2026-02-10T21:39:56.910737",
            "updatedAt": "2026-02-10T21:39:56.910777"
        },
        {
            "id": 13,
            "name": "Samsung Galaxy S25 Ultra 5G",
            "description": "The Samsung Galaxy S25 Ultra 5G sets a new standard for premium smartphones.",
            "price": 119000.00,
            "quantity": 10,
            "imageUrl": "https://fingcart.com/c/124/p/samsung-s25-ultra.jpg",
            "categoryId": "698a15bd475eb29e33bd839b",
            "createdAt": "2026-02-10T21:51:33.8331",
            "updatedAt": "2026-02-10T21:51:33.833141"
        }
    ],
    "pageable": {
        "pageNumber": 0,
        "pageSize": 10,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "last": true,
    "totalElements": 3,
    "totalPages": 1,
    "first": true,
    "numberOfElements": 3,
    "size": 10,
    "number": 0,
    "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
    },
    "empty": false
}
```

### 3. Get Product by Id

**Endpoint:** `GET /api/products/14`

**Response:**
```json
{
  "id": 14,
  "name": "Allen Solly Shirt",
  "description": "100% cotton, regular fit, long sleeve",
  "price": 1500.00,
  "quantity": 1,
  "imageUrl": "https://fingcart.com/c/125/p/allen-solly-shirt-90.jpg",
  "categoryId": "698a180b475eb29e33bd839e",
  "createdAt": "2026-02-10T21:52:40.424258",
  "updatedAt": "2026-02-10T21:52:40.424291"
}
```

**Error Responses:**

```json
{
  "timestamp": "2026-02-10T21:58:50.149059",
  "status": 404,
  "error": "Resource Not Found",
  "message": "Product not found with id: 10",
  "path": "/api/products/10"
}
```

### 4. Update Product

Update product quantity

**Endpoint:** `PUT /api/products/12`

**Request:**
```json
 {
  "name": "iPhone 16",
  "description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
  "price": 65900.00,
  "quantity": 25,
  "imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
  "categoryId": "698a15bd475eb29e33bd839b"
}
```

**Response:**
```json
{
  "id": 12,
  "name": "iPhone 16",
  "description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
  "price": 65900.00,
  "quantity": 25,
  "imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
  "categoryId": "698a15bd475eb29e33bd839b",
  "createdAt": "2026-02-10T21:39:56.910737",
  "updatedAt": "2026-02-10T22:02:50.139331"
}
```

**Error Responses:**

```json
{
  "timestamp": "2026-02-10T22:05:56.585763",
  "status": 404,
  "error": "Resource Not Found",
  "message": "Product not found with id: 1",
  "path": "/api/products/1"
}
```

```json
{
  "timestamp": "2026-02-10T22:06:34.127981",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please contact support.",
  "path": "/api/productszz/12"
}
```

### 5. Get Products by Category Id

**Endpoint:** `GET /api/products/category/698a15bd475eb29e33bd839b`

**Response:**
```json
{
  "content": [
    {
      "id": 13,
      "name": "Samsung Galaxy S25 Ultra 5G",
      "description": "The Samsung Galaxy S25 Ultra 5G sets a new standard for premium smartphones.",
      "price": 119000.00,
      "quantity": 10,
      "imageUrl": "https://fingcart.com/c/124/p/samsung-s25-ultra.jpg",
      "categoryId": "698a15bd475eb29e33bd839b",
      "createdAt": "2026-02-10T21:51:33.8331",
      "updatedAt": "2026-02-10T21:51:33.833141"
    },
    {
      "id": 12,
      "name": "iPhone 16",
      "description": "Designed for everyday ease and next-level performance, it combines a refined look with intelligent features that feel effortless from the moment you pick it up.",
      "price": 65900.00,
      "quantity": 25,
      "imageUrl": "https://fingcart.com/c/123/p/iphone-16.jpg",
      "categoryId": "698a15bd475eb29e33bd839b",
      "createdAt": "2026-02-10T21:39:56.910737",
      "updatedAt": "2026-02-10T22:02:50.139331"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalElements": 2,
  "totalPages": 1,
  "first": true,
  "numberOfElements": 2,
  "size": 10,
  "number": 0,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "empty": false
}
```

**Error Responses:**

```json
{
  "timestamp": "2026-02-24T22:34:09.258423",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid category ID: 698a15bd475eb29e33bd839",
  "path": "/api/products/category/698a15bd475eb29e33bd839"
}
```

### 6. Delete Product by Id

**Endpoint:** `DELETE /api/products/13`

**Response:** `204 No Content`

**Error Responses:**

```json
{
  "timestamp": "2026-02-10T22:15:35.100184",
  "status": 404,
  "error": "Resource Not Found",
  "message": "Product not found with id: 13",
  "path": "/api/products/13"
}
```

## Cart Service (Cart API)

### 1. Create Cart

Base Path: `/api/carts`

**Endpoint:** `POST /api/carts`

**Response:**

```json
{
    "id": "b125ab36-b0fd-41f9-85fd-745b4199cb62",
    "items": [],
    "totalPrice": 0,
    "createdAt": "2026-02-11T22:58:31.564002"
}
```

### 2. Add Product to Cart

**Endpoint:** `POST /api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems`

**Request:**

```json
{
    "productId":12
}
```

**Response:**

```json
{
  "productId": 12,
  "quantity": 1,
  "totalPrice": 65900.00
}
```

**Error Response:**

```json
{
  "timestamp": "2026-02-11T23:15:31.04854",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Method parameter 'cartId': Failed to convert value of type 'java.lang.String' to required type 'java.util.UUID'; UUID string too large",
  "path": "/api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb620/cartItems"
}
```

### 3. Get all Cart Product Items by Cart Id

**Endpoint:** `GET /api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62`

**Response:**

```json
{
  "id": "b125ab36-b0fd-41f9-85fd-745b4199cb62",
  "items": [
    {
      "productId": 12,
      "quantity": 1,
      "totalPrice": 65900.00
    },
    {
      "productId": 14,
      "quantity": 2,
      "totalPrice": 3000.00
    }
  ],
  "totalPrice": 68900.00,
  "createdAt": "2026-02-11T22:58:31.564002"
}
```

**Error Response:**

```json
{
  "timestamp": "2026-02-11T23:21:57.726365",
  "status": 404,
  "error": "Cart not found!",
  "message": "Cart not found",
  "path": "/api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb6"
}
```

### 4. Update Cart Item Quantity by ProductId

**Endpoint:** `PUT /api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems/14`

**Request:**

```json
{
    "quantity": 5
}
```

**Response:**

```json
{
    "productId": 14,
    "quantity": 5,
    "totalPrice": 7500.00
}
```

### 5. Remove Cart Item by ProductId

**Endpoint:** `DELETE /api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems/12`

**Response:** `204 No Content`

**Error Responses**

```json
{
    "timestamp": "2026-02-11T23:32:44.450362",
    "status": 404,
    "error": "Product not found!",
    "message": "Product not found",
    "path": "/api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems/10"
}
```

```json
{
    "timestamp": "2026-02-11T23:33:53.658585",
    "status": 404,
    "error": "Product not found!",
    "message": "Product not found",
    "path": "/api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems/12"
}
```

```json
{
  "timestamp": "2026-02-11T23:34:36.366752",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Method parameter 'cartId': Failed to convert value of type 'java.lang.String' to required type 'java.util.UUID'; UUID string too large",
  "path": "/api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb629/cartItems/12"
}
```

### 6. Remove all Cart Items (Clear Cart)

**Endpoint:** `DELETE /api/carts/b125ab36-b0fd-41f9-85fd-745b4199cb62/cartItems`

**Response:** `204 No Content`

## Auth Service (Auth API, User API)

## Auth API

Base Path: `/api/auth`

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Request:**

```json
{
  "name": "Meera",
  "username":"meera12",
  "email":"meera2@gmail.com",
  "password":"P12346",
  "addresses": [
    {
      "street": "Spring 123",
      "city": "Spring city",
      "district":"Kottayam",
      "state": "Kerala",
      "pincode":"612346"
    },
    {
      "street": "Web 125",
      "city": "Web city",
      "district":"Calicut",
      "state": "Kerala",
      "pincode":"612347"
    }]
}
```

**Response:**

```json
{
  "id": 20,
  "name": "Meera",
  "username": "meera12",
  "email": "meera2@gmail.com",
  "addresses": [
    {
      "id": 31,
      "state": "Kerala",
      "district": "Kottayam",
      "city": "Spring city",
      "street": "Spring 123",
      "pincode": "612346"
    },
    {
      "id": 32,
      "state": "Kerala",
      "district": "Calicut",
      "city": "Web city",
      "street": "Web 125",
      "pincode": "612347"
    }
  ]
}
```

**Error Responses:**

```json
{
    "path": "/api/auth/register",
    "error": "Bad Request",
    "message": "Username is already taken",
    "timestamp": "2026-02-15T22:09:31.023808",
    "status": 409
}
```

```json
{
  "path": "/api/auth/register",
  "error": "Bad Request",
  "message": "Email is already registered",
  "timestamp": "2026-02-15T22:10:50.915307",
  "status": 409
}
```

### 2. Login User

Generates a JWT (JSON Web Token) Token as Access Token
**Endpoint:** `POST /api/auth/login`

**Request:**

```json
{
    "username":"meera12",
    "password":"P12346"
}
```
**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMCIsInVzZXJuYW1lIjoibWVlcmExMiIsImVtYWlsIjoibWVlcmEyQGdtYWlsLmNvbSIsIm5hbWUiOiJNZWVyYSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxMTc1NDgzLCJleHAiOjE3NzExNzYzODN9.0D0tl3jaB_bIzQD04B-z-mY_8J1rvbq8hB_9KZN6AYM"
}
```

**Decoded Header:**

```json
{
  "alg": "HS256"
}
```

**Decoded Payload:**

```json
{
  "sub": "20",
  "username": "meera12",
  "email": "meera2@gmail.com",
  "name": "Meera",
  "role": "USER",
  "iat": 1771173983,
  "exp": 1771174883
}
```

**Error Response:**

```json
{
    "error": "Internal Server Error",
    "message": "Bad credentials",
    "timestamp": "2026-02-15T22:25:17.309126",
    "status": 500
}
```

### 3. Refresh Access Token

**Endpoint:** `POST /api/auth/refresh`

**Refresh Token at Cookies:**

```
refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMCIsInVzZXJuYW1lIjoibWVlcmExMiIsImVtYWlsIjoibWVlcmEyQGdtYWlsLmNvbSIsIm5hbWUiOiJNZWVyYSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxMTc1NDgzLCJleHAiOjE3NzcyMjM0ODN9.TS7FFNQKOgggGCAQ_OqBJc1Es4tzIeqB5sq0H0rOPHI; Path=/api/auth/refresh; Secure; HttpOnly; Expires=Sun, 26 Apr 2026 17:11:23 GMT;

```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMCIsInVzZXJuYW1lIjoibWVlcmExMiIsImVtYWlsIjoibWVlcmEyQGdtYWlsLmNvbSIsIm5hbWUiOiJNZWVyYSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcxMTc1NTE4LCJleHAiOjE3NzExNzY0MTh9._NDZhbBhZQE3SGl7pDUmBnVc61cMigl6NQv0CjkIU2s"
}
```
**Response:**

```json
{
  "error": "Internal Server Error",
  "message": "Required cookie 'refreshToken' for method parameter type String is not present",
  "timestamp": "2026-02-15T22:47:06.146303",
  "status": 500
}
```


### 4. Get Current User

Include the token generated after login as a Bearer token in the request header using 'Authorization' Key.

**Endpoint:** `GET /api/auth/me`

**Response:**

```json
{
    "id": 20,
    "name": "Meera",
    "username": "meera12",
    "email": "meera2@gmail.com",
    "addresses": [
        {
            "id": 31,
            "state": "Kerala",
            "district": "Kottayam",
            "city": "Spring city",
            "street": "Spring 123",
            "pincode": "612346"
        },
        {
            "id": 32,
            "state": "Kerala",
            "district": "Calicut",
            "city": "Web city",
            "street": "Web 125",
            "pincode": "612347"
        }
    ]
}

```

## User API

Base Path: `/api/users`

### 1. Get User By Id

**Endpoint:** `GET /api/users/20`

**Response:**

```json
{
    "id": 20,
    "name": "Meera",
    "username": "meera12",
    "email": "meera2@gmail.com",
    "addresses": [
        {
            "id": 31,
            "state": "Kerala",
            "district": "Kottayam",
            "city": "Spring city",
            "street": "Spring 123",
            "pincode": "612346"
        },
        {
            "id": 32,
            "state": "Kerala",
            "district": "Calicut",
            "city": "Web city",
            "street": "Web 125",
            "pincode": "612347"
        }
    ]
}
```

**Error Response:**

```json
{
    "path": "/api/users/25",
    "error": "Not Found",
    "message": "User with id 25 not found",
    "timestamp": "2026-02-15T23:18:57.451041",
    "status": 404
}
```

### 2. Update User

**Endpoint:** `PUT /api/users/20`

**Request:**

```json
{
  "name": "Meera",
  "username":"meera24",
  "email":"meera2@gmail.com",
  "addresses": [
    {
      "street": "Spring 123",
      "city": "Spring power city",
      "district":"Kottayam",
      "state": "Kerala",
      "pincode":"612346"
    }]
}

```

**Response:**

```json
{
    "id": 20,
    "name": "Meera",
    "username": "meera24",
    "email": "meera2@gmail.com",
    "addresses": [
        {
            "id": 31,
            "state": "Kerala",
            "district": "Kottayam",
            "city": "Spring city",
            "street": "Spring 123",
            "pincode": "612346"
        },
        {
            "id": 32,
            "state": "Kerala",
            "district": "Calicut",
            "city": "Web city",
            "street": "Web 125",
            "pincode": "612347"
        },
        {
            "id": 33,
            "state": "Kerala",
            "district": "Kottayam",
            "city": "Spring power city",
            "street": "Spring 123",
            "pincode": "612346"
        }
    ]
}
```

**Error Response:**

```json
{
  "path": "/api/users/25",
  "error": "Access Denied!",
  "message": "You can only update your own account",
  "timestamp": "2026-02-15T23:21:06.334664",
  "status": 403
}
```

### 3. Delete User

An ADMIN role token is required to delete a user. Login with admin credentials

**Endpoint:** `DELETE /api/users/20`

**Admin Token:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOSIsInVzZXJuYW1lIjoic2hpbmUxMiIsImVtYWlsIjoic2hpbmUxQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGluZSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3MTE3ODQwNCwiZXhwIjoxNzcxMTc5MzA0fQ.f9AuZ4c8FxaUAEXq5AT_-1PSKWMUbSntnllUiLxiqGw"
}
```

**Decoded Payload:**

```json
{
  "sub": "19",
  "username": "shine12",
  "email": "shine1@gmail.com",
  "name": "Shine",
  "role": "ADMIN",
  "iat": 1771178404,
  "exp": 1771179304
}
```
**Response:** `204 No Content`

**Error Response**

```json
{
    "path": "/api/users/20",
    "error": "Not Found",
    "message": "User not found",
    "timestamp": "2026-02-15T23:33:20.941632",
    "status": 404
}
```

## Order Service (Checkout API, Order API)

## Checkout API

Base Path: `/api/checkout`

### 1. Checkout Cart

Include the JWT Bearer token in the request header under the Authorization header.

**Endpoint:** `POST /api/checkout`

**Request:**

```json
{
  "cartId":"b125ab36-b0fd-41f9-85fd-745b4199cb62"
}
```

**Response:**

```json
{
  "orderId": 4,
  "checkoutUrl": "http://fingcart.com/demo-orders/checkout/4"
}
```
**Error Response**

```json
{
    "timestamp": "2026-02-24T22:54:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Cart is empty",
    "path": "/api/checkout"
}
```
```json
{
"timestamp": "2026-02-25T22:42:22",
"status": 401,
"error": "Unauthorized",
"message": "Invalid or expired token",
"path": "/api/checkout"
}
```
```json
{
"timestamp": "2026-02-24T22:54:24",
"status": 500,
"error": "Internal Server Error",
"message": "An unexpected error occurred",
"path": "/api/checkout"
}
```

## Order API

Base Path: `/api/orders`

### 1. Get all Orders of Current customer 

Include the JWT Bearer token in the request header under the Authorization header.

**Endpoint:** `POST /api/orders`

**Response:**

```json
[
  {
    "id": 1,
    "customerId": 19,
    "status": "PENDING",
    "createdAt": "2026-02-25T22:14:50.678275",
    "totalPrice": 1500.00
  },
  {
    "id": 2,
    "customerId": 19,
    "status": "PENDING",
    "createdAt": "2026-02-25T22:16:33.247137",
    "totalPrice": 70400.00
  }
]

```
**Error Response**

```json
{
    "timestamp": "2026-02-25T22:58:56",
    "status": 401,
    "error": "Unauthorized",
    "message": "Invalid or expired token",
    "path": "/api/orders"
}
```

### 2. Get Order with Items by Id

**Endpoint:** `POST /api/orders/4`

**Response:**

```json
{
  "id": 4,
  "customerId": 21,
  "status": "PENDING",
  "createdAt": "2026-02-25T22:39:50.018443",
  "totalPrice": 212700.00,
  "orderItems": [
    {
      "id": 6,
      "orderId": 4,
      "productId": 12,
      "quantity": 3,
      "totalPrice": 197700.00
    },
    {
      "id": 7,
      "orderId": 4,
      "productId": 14,
      "quantity": 10,
      "totalPrice": 15000.00
    }
  ]
}
```
**Error Response**

```json
{
    "timestamp": "2026-02-25T22:56:30",
    "status": 404,
    "error": "Order Not Found",
    "message": "Order not found for 40",
    "path": "/api/orders/40"
}
```

### 3. Get all Orders with Order Items

**Endpoint:** `POST /api/orders/ordersWithItems`

**Response:**

```json
[
    {
        "id": 1,
        "customerId": 19,
        "status": "PENDING",
        "createdAt": "2026-02-25T22:14:50.678275",
        "totalPrice": 1500.00,
        "orderItems": [
            {
                "id": 1,
                "orderId": 1,
                "productId": 14,
                "quantity": 1,
                "totalPrice": 1500.00
            }
        ]
    },
    {
        "id": 2,
        "customerId": 19,
        "status": "PENDING",
        "createdAt": "2026-02-25T22:16:33.247137",
        "totalPrice": 70400.00,
        "orderItems": [
            {
                "id": 2,
                "orderId": 2,
                "productId": 14,
                "quantity": 3,
                "totalPrice": 4500.00
            },
            {
                "id": 3,
                "orderId": 2,
                "productId": 12,
                "quantity": 1,
                "totalPrice": 65900.00
            }
        ]
    },
    {
        "id": 3,
        "customerId": 21,
        "status": "PENDING",
        "createdAt": "2026-02-25T22:35:35.569748",
        "totalPrice": 133300.00,
        "orderItems": [
            {
                "id": 4,
                "orderId": 3,
                "productId": 12,
                "quantity": 2,
                "totalPrice": 131800.00
            },
            {
                "id": 5,
                "orderId": 3,
                "productId": 14,
                "quantity": 1,
                "totalPrice": 1500.00
            }
        ]
    },
    {
        "id": 4,
        "customerId": 21,
        "status": "PENDING",
        "createdAt": "2026-02-25T22:39:50.018443",
        "totalPrice": 212700.00,
        "orderItems": [
            {
                "id": 6,
                "orderId": 4,
                "productId": 12,
                "quantity": 3,
                "totalPrice": 197700.00
            },
            {
                "id": 7,
                "orderId": 4,
                "productId": 14,
                "quantity": 10,
                "totalPrice": 15000.00
            }
        ]
    }
]
```
**Error Response**

```json
{
    "timestamp": "2026-02-25T22:55:16",
    "status": 500,
    "error": "Internal Server Error",
    "message": "An unexpected error occurred",
    "path": "/api/orders/ordersWithItem"
}
```

