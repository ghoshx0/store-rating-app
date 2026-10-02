# Store Rating App

A full-stack Store Rating application built using **React**, **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. The application supports three different roles (Admin, Owner, and User) with role-based authentication and authorization using JWT.

---

# Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Role-Based Authorization
- Password Hashing using bcrypt
- Protected Routes

---

## Admin Features

- Dashboard Statistics
  - Total Users
  - Total Owners
  - Total Stores
  - Total Ratings
- Create Users (Admin, Owner, User)
- View All Users
- Search Users
- Sort Users
- Pagination
- View User Details
- Create Stores
- View All Stores
- Search Stores
- Sort Stores
- Pagination
- View Store Details

---

## Owner Features

- Dashboard
- View Store Details
- Update Store Information
- View Customer Ratings

---

## User Features

- Browse Stores
- Search Stores
- Pagination
- View Overall Store Rating
- View Own Submitted Rating
- Submit Rating
- Update Rating
- Update Password

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Vite

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

## Validation

- Zod

---

# Project Structure

```
Store-Rating-App
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── validations
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/ghoshx0/store-rating-app
cd Store-Rating-App
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate deploy
```

(Optional) Seed the Database

```bash
npm run seed
```

Start Backend

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

```
POST /api/v1/auth/signup
POST /api/v1/auth/login
```

## Admin

```
GET    /api/v1/admin/dashboard

POST   /api/v1/admin/users
GET    /api/v1/admin/users
GET    /api/v1/admin/users/:id

POST   /api/v1/admin/stores
GET    /api/v1/admin/stores
GET    /api/v1/admin/stores/:id
```

## Owner

```
GET    /api/v1/owner/dashboard
GET    /api/v1/owner/store
PUT    /api/v1/owner/store
GET    /api/v1/owner/ratings
```

## User

```
GET    /api/v1/user/stores
POST   /api/v1/user/ratings
PUT    /api/v1/user/ratings
PUT    /api/v1/user/password
```

---

# Test Credentials


## Admin

```
Email: admin@store.com
Password: Admin@123
```

## Owner

```
Email: adani@store.com
Password: Admin@123
```

## User

```
Email: gaurav@gmail.com
Password: Admin@1234
```

---

# Screenshots

### Login
![Store Rating app login screen with email and password fields, a sign in button, and a clean dark blue dashboard style.](screenshots/image.png)

### Admin Dashboard
![Admin dashboard with a sidebar, summary cards, and analytics panels for users, stores, and ratings in a clean management interface.](screenshots/image-1.png)

### Users
![Users management page listing registered accounts in a table with search, filters, and action controls in the admin panel.](screenshots/image-2.png)

### User Details
![Detailed user profile view showing account information, activity summary, and management actions in a structured admin screen.](screenshots/image-3.png)

### Stores
![Stores management page displaying a list of store entries with categories, ratings, and administrative controls in a dashboard layout.](screenshots/image-5.png)

### Store Details
![Store detail screen showing store information, statistics, and related management options in a focused business dashboard.](screenshots/image-6.png)

### Create Store
![Create store form with fields for the name, location, category, and description, presented in a simple admin interface.](screenshots/image-7.png)

### Owner Dashboard
![Owner dashboard with store performance statistics, navigation options, and summary panels for managing a business in the Store Rating app.](screenshots/image-8.png)

### My Store
![Owner store management page showing the business profile, performance metrics, and details for the current store in a polished dashboard.](screenshots/image-9.png)

### Ratings
![Ratings management view listing customer feedback entries with scores, comments, and moderation controls in a table layout.](screenshots/image-10.png)

### User Dashboard
![User dashboard with navigation to browse stores, view ratings, and manage the account in a personalized app interface.](screenshots/image-11.png)

### Browse Stores
![Store browsing screen displaying multiple storefront cards with names, ratings, and categories in a responsive catalog layout.](screenshots/image-12.png)

### Submit Rating
![Submit rating form with a star selection, store details, and a comment field for leaving customer feedback.](screenshots/image-13.png)

### Update Rating
![Update rating form showing an existing review with editable star selection, comment text, and save controls.](screenshots/image-14.png)

### Update Password
![Password update screen with fields for the current password, a new password, and confirmation, inside a secure account settings form.](screenshots/image-15.png)

---

# Future Improvements

- Better UI using a component library (Material UI/Tailwind CSS)
- Toast notifications instead of browser alerts
- Advanced filtering
- Profile management
- Unit and integration tests
- Docker support
- Deployment to a cloud platform

---

# Author

**Ghosh Bisen**

Built as a Full Stack Store Rating Application using React, Express.js, Prisma ORM, PostgreSQL, and JWT Authentication.