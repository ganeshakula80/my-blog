# Project Structure and Data Flow

## Overview
This project is a full-stack blog application built with Next.js (frontend) and Node.js/Express (backend), using MongoDB for data storage and JWT for authentication.

---

## Directory Structure

```
blog-post/
├── backend/
│   ├── controllers/         # Backend business logic (auth, user, blog)
│   ├── middleware/          # Express middleware (JWT auth, etc)
│   ├── models/              # Mongoose models (User, Blog)
│   ├── routes/              # Express route definitions
│   ├── server.js            # Express app entry point
│   └── .env                 # Environment variables (Mongo URI, JWT secret)
│
├── src/
│   ├── app/
│   │   ├── register/        # Register page (frontend)
│   │   ├── login/           # Login page (frontend)
│   │   ├── userdetails/     # User profile page (frontend)
│   │   └── blog/[id]/       # Blog detail page (frontend)
│   ├── contexts/            # React context for user state (UserContexts.tsx)
│   └── ...                  # Other frontend code
└── README.md
```

---

## Backend File Explanations

- **server.js**: Sets up Express, connects to MongoDB, applies middleware, and mounts all API routes.
- **routes/**: Defines REST API endpoints for authentication (`authRoutes.js`), users (`userRoutes.js`), and blogs (`blogRoutes.js`).
- **controllers/**: Contains logic for each route, e.g.:
  - `authController.js`: Handles register, login, JWT creation.
  - `userController.js`: Handles fetching/updating user profile.
- **models/**: Mongoose schemas for `User` and `Blog`.
- **middleware/authMiddleware.js**: Checks JWT on protected routes.
- **.env**: Stores sensitive config (MongoDB URI, JWT secret).

---

## Frontend File Explanations

- **src/app/register/page.tsx**: Registration form. Sends POST to `/api/auth/register`.
- **src/app/login/page.tsx**: Login form. Sends POST to `/api/auth/login`. On success, saves JWT and user info to localStorage and context.
- **src/app/userdetails/page.tsx**: User profile page. Fetches/updates user data using JWT for auth.
- **src/app/blog/[id]/page.tsx**: Blog detail page. Fetches a single blog post by ID.
- **src/contexts/UserContexts.tsx**: React Context to manage user state globally. Persists user in localStorage and rehydrates on refresh. Fetches user from backend if JWT is present.

---

## Data Flow (Authentication Example)

1. **User logs in via `/login` page:**
    - Credentials sent to `/api/auth/login` (backend).
    - Backend validates, issues JWT and user info.
    - Frontend saves JWT and user info to localStorage and context.
2. **On page refresh:**
    - Context checks localStorage for user. If missing but JWT exists, fetches user from `/api/auth/me` using JWT.
    - User remains logged in as long as JWT is valid.
3. **Authenticated requests:**
    - Frontend reads JWT from localStorage and sends it in the `Authorization` header for protected API calls.
    - Backend middleware validates JWT and attaches user info to the request.

---

## Where Data Flows
- **Frontend forms (register/login)** → **Backend API** → **MongoDB**
- **Frontend context (UserContexts.tsx)** ←→ **localStorage** ←→ **Backend `/api/auth/me`**
- **User profile/blog pages** fetch/update data via API routes, using JWT for authentication.

---

## How to Run

1. **Backend:**
    - `cd backend`
    - `npm install`
    - `npm start` (ensure MongoDB is running)
2. **Frontend:**
    - `cd ..` (project root)
    - `npm install`
    - `npm run dev`
3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Security Notes
- JWT is stored in localStorage for simplicity. For production, consider HttpOnly cookies for better security.
- Never commit your `.env` file or secrets to version control.

---

## Contribution & Customization
- Add more routes, models, or React pages as needed.
- Customize styles and features to fit your needs.

---

If you have any questions about file roles or data flow, see the comments in each file or ask for more details!
