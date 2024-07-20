# Froker Backend Assisgnment

## Overview

This backend service is inspired by platforms like Slice and KreditBee. It leverages Node.js and MongoDB to manage user registrations, authentication, and financial transactions efficiently. The service provides a robust API for handling user data, loan approvals, and repayments with secure practices.

## Features

- **User Registration**: Approves or rejects user applications based on age and salary criteria.
- **Authentication**: Allows users to log in with email and password, utilizing JWT for secure access.
- **User Data Retrieval**: Provides user-specific information including purchase power and financial details.
- **Loan Management**: Enables users to borrow money, with automatic updates to purchase power and repayment calculations.

## API Endpoints

### 1. Approve Application During Signup

- **Endpoint:** `POST /signup`
- **Description:** Processes user registrations by validating age and monthly salary, and then approves or rejects the application.
- **Request Body:**
  ```json
  {
    "phoneNumber": "9876543210",
    "email": "user1@gmail.com",
    "name": "User first",
    "dob": "1990-01-01",
    "monthlySalary": 450000
    "password":"Password123"
  }

- **Salary Validation:**

 <img width="644" alt="Salary_Validation" src="https://github.com/user-attachments/assets/ffc77c15-e709-4aaa-a487-30064627420a">

- **Age Validation:**

<img width="637" alt="Age_Validation" src="https://github.com/user-attachments/assets/f9b18c5e-f8b9-471e-9da2-b41661270ef0">

### Success:
- **Response:**

<img width="633" alt="SignUp" src="https://github.com/user-attachments/assets/e4548840-8701-4ff9-bafb-90a7788b640b">

### 2. Login API
- **Endpoint:** `POST /login`
- **Description:** Authenticates users using email and password. Returns a JWT for session management.
- **Request Body:**
  ```json
  {
    "email": "user1@gmail.com",
    "password":"Password123"
  }

### Success:
- **Response:**
<img width="634" alt="Login" src="https://github.com/user-attachments/assets/ce2f6de4-d010-4a93-bf35-8201831fe133">

### 3. Show User Data
- **Endpoint:** `GET /user`
- **Description:**  Retrieves detailed user information including purchase power and financial metrics.

  ### Headers:
  - **Authorization:** Bearer JWT

 ### Response:

 <img width="635" alt="Get User" src="https://github.com/user-attachments/assets/c2534673-bd84-44fa-9c20-b920804f1734">

### 4. Borrow Money API
- **Endpoint:** `POST /borrow`
- **Description:** Facilitates money borrowing, updates the user's purchase power, and calculates repayment details.
- **Request Body:**
  ```json
  {
     "amount": 60000
  }

### Response:
<img width="627" alt="Borrow" src="https://github.com/user-attachments/assets/bcc1f559-564d-4a29-b67d-a104b43ad68d">

## Installation
1. Clone the repository: git clone https://github.com/ArghaRoy10/Froker_task.git
2. Install server dependencies: npm run server
3. Set up your environment variables: MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Start the server: npm run server
