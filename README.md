# Mon Vieux Grimoire – Book Rating API

## 📚 Project Overview

**Mon Vieux Grimoire** is the seventh project in the [OpenClassrooms](https://openclassrooms.com/) Web Developer curriculum.  
The application allows users to rate and review books stored in a digital library.

This project focuses on **backend development**. The **entire frontend** is provided, including all API requests.  
You are tasked with building a **RESTful API** using **Node.js** and **Express.js**, connected to a **MongoDB** database.

## 🎯 Objectives

- Build a secure and scalable backend system
- Provide full **CRUD** capabilities for books
- Implement user **authentication** with JWT
- Handle **image uploads and compression**
- Enable book **ratings** and compute average scores

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Multer** (image upload)
- **Sharp** (image optimization)

## 🔐 Authentication

- Users can sign up and log in
- Secure endpoints using **JWT token-based authentication**

## 📂 API Features

### 📚 Book Routes
- `GET /api/books` – Fetch all books
- `GET /api/books/:id` – Fetch one book by ID
- `POST /api/books` – Add a new book
- `PUT /api/books/:id` – Edit an existing book
- `DELETE /api/books/:id` – Delete a book

### ⭐ Rating System
- `POST /api/books/:id/rating` – Add a rating (1–5)
- Average rating is automatically calculated per book

### 🖼️ Image Handling
- Images are uploaded and stored on the server
- Automatically resized and compressed using **Multer** and **Sharp**

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB database (local or remote)

### Installation
```bash
git clone https://github.com/laflosh/Developpeur-web-formation-OC-projet_7-Back-end-Mon-vieux-grimoire.git
cd mon-vieux-grimoire
npm install
```

### Environment Setup
See the `.env` file to add your personnal informations.

### Run the Server
```bash
npm start