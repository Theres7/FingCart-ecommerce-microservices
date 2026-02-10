# FingCart - E-commerce Application using Spring Boot + Spring Security + JWT + Microservices

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Category Service](#category-service-category-api)
- [Product Service](#product-service-product-api)

## Overview
FingCart is a microservices-based e-commerce platform developed with Spring Boot, Spring Security, and JWT.
The project is currently under development, with core features such as REST APIs for product and category management,
including create, read, update, delete, pagination, and filtering already implemented.
Both category and product APIs support pagination for efficient data retrieval.
The system uses Spring Cloud Gateway with a reactive stack for API routing and service discovery,
enabling scalable microservice communication.

WebClient is used for non-blocking, reactive HTTP calls between services.
Secure user authentication and authorization are implemented using JWT tokens.

## Tech Stack

- Java
- Spring Boot
- Hibernate / JPA
- Spring Cloud
- Eureka
- WebClient
- PostgreSQL / MySQL / MongoDB
- Docker

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
  "timestamp": "2026-02-10T22:07:19.692649",
  "status": 400,
  "error": "Bad Request",
  "message": "Category validation unavailable. Please try again later.",
  "path": "/api/products/category/68ca4d2b17556094354be368"
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