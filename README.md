# Admin-User Task Management System

## 📌 Project Overview

This project is an **Admin-User Task Management System** where the admin can assign tasks to users with a due date, and users can update the task status. Admin can monitor all tasks, including total, pending, and completed tasks.

---

## 🚀 Features

### 👨‍💼 Admin Panel

* Admin can **create and assign tasks** to any user.
* Admin can set a **task due date**.
* Admin can view:

  * **Total tasks** assigned
  * **Pending tasks**
  * **Completed tasks**
* Admin can see **Pending Task Table** and **Completed Task Table**.

### 👤 User Panel

* User can view assigned tasks.
* User can **update task status** from:

  * Pending ➝ Completed
* User can add notes or updates (optional).

---

## 🛠️ Tech Stack

* **Front-end:** React (Vite)
* **Back-end:** Express.js (Node.js)
* **Database:** MongoDB (local or MongoDB Atlas)
* **Auth:** JWT

---

## 📁 Project structure

```
Backend/    Express + MongoDB API (port 3007)
Frontend/   React + Vite client (port 5173)
```

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- A MongoDB database — either a local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone and install

```bash
git clone https://github.com/shameershahzad/admin-user-task-system.git
cd admin-user-task-system
```

### 2. Backend setup

```bash
cd Backend
npm install
cp .env.example .env
```

`Backend/.env`:

| Variable     | Description                                  |
|--------------|-----------------------------------------------|
| `MONGO_URI`  | MongoDB connection string                     |
| `JWT_SECRET` | Any long random string used to sign JWTs      |
| `PORT`       | Port for the API server (defaults to `3007`)  |

Start the API:

```bash
npm run dev
```

You should see `DB connected!` and `Server is running at port: 3007` in the terminal.

### 3. Frontend setup

In a separate terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. It talks to the API at `http://localhost:3007` by default, so make sure the backend is running first.

The first account you sign up with the role **Admin** becomes the admin account (only one admin is allowed); everyone else signs up as **User**.

---

## Available scripts

**Backend** (`Backend/package.json`)
- `npm run dev` — start the API with nodemon (auto-restart on changes)
- `npm start` — start the API with plain Node

**Frontend** (`Frontend/package.json`)
- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally

---

## 🔑 How It Works

### Admin Flow

1. Login into admin dashboard.
2. Create a task → select user → set due date.
3. View task status summary.
4. Check pending and completed task lists.

### User Flow

1. User logs in.
2. Sees assigned tasks.
3. Updates task from **Pending** to **Completed**.

---

## 📊 Admin Dashboard Summary

* **Total Tasks:** Shows count of all assigned tasks.
* **Pending Tasks:** Tasks not completed by users.
* **Completed Tasks:** Tasks users have marked as done.
* **Tables:**

  * Pending task table
  * Completed task table

---

## 🎯 Future Improvements

* Add email notifications
* Add file attachments in tasks
* Add user performance analytics

---

## 📝 License

This project is free to use for educational and development purposes.

---
