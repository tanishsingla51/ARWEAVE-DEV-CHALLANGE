# Stuneckt Backend Assignment README

## Introduction
This repository contains the backend code for a simple API. The API provides endpoints to perform various operations like :
- Get all posts made by a user
- Get all posts existing posts
- Get all followers of a user
- Get user’s basic details
- Update user’s details
- Create a post

## Technologies Used
- Node.js
- Express.js
- MongoDB (or any other database of your choice)

## Setup Instructions

### 1. Clone the Repository

gh repo clone tanishsingla51/Stuneckt-Backend-Assignment


### 2. Install Dependencies

- cd backend
- npm install

### 3. Set Environment Variables
Create a `.env` file in the backend directory and specify the following variables:

- MONGO_URI=`mongodb+srv://tanishsingla51:9313111030Aa%40@cluster0.edee7nr.mongodb.net/stuneckt`
- PORT=`4000`
- JWT_SECRET=`stuneckt`


### 4. Start the Server
 npm run dev 
- Server is running on port 4000
- Database connection successful

## API Endpoints

### POST `/api/v2/user/signup`
Description: Create a new user using username , password , firstName , lastName with all necessary endpoints 
- used jsonwebtoken for authentication and a token is created using your unique _id and your jwt password 

### POST `/api/v2/user/signin`
Description: User can sign in using their username and password
- a token is created after sign in using your userId and jwt password

### PUT `/api/v2/user/update`
- passed an authMiddleWare for authentication
Description: User can update thier password or firstName or lastName whatever you want 

### GET `/api/v2/user/details`
- passed an authMiddleWare for authentication
Description: Signed in User can get its basic details like username , firstName , lastName

### GET `/api/v2/user/bulk`
Description: User can get basic details of all the other users  like username , firstName , lastName

### POST `/api/v2/user/follow`
Description: User can follow other users and can get the their own followers as well


## Frontend Setup Instructions

To set up a minimal frontend to consume this API, follow these steps:

## Technologies Used
- React JS
- Tailwindcss

### 1. Create a New Directory
Create a new directory for your frontend project.

### 2. Initialize a New Project
cd frontend
npm init -y

### 2. Install Dependencies

npm install


### 4. Start the Server
 npm run dev 


Now, you should be able to access your frontend application on `http://localhost:5173` (or another port, depending on the HTTP server configuration).

## Additional Notes
- Make sure MongoDB is running on your local machine or update the `MONGODB_URI` environment variable with the appropriate connection string.
- You can customize the resource schema and endpoints according to your requirements.
- Ensure proper error handling and validation in both backend and frontend code.
- Ignore the deployed link its currently not working


