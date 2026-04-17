# ⚙️ MechQuish Club Management Portal

Welcome to the **MechQuish Club Management Portal**, a centralized web application built to digitize, streamline, and manage the complete workflow of the college technical club. From event planning and QR-based attendance to secure judge scoring and media galleries, this portal ensures transparent and paperless club operations.

---

## 🚀 Key Features

* **Role-Based Access Control (RBAC):** Secure login routing for Admin, Organisers, Judges, and Students.
* **Dynamic Activity Lifecycle:** Manage Events in three stages: *Planned*, *Live*, and *Completed*.
* **Judges Scoring System:** Specialized tablet-friendly interface for evaluations with a "Lock" mechanism.
* **Smart QR Attendance:** Unique QR code generation for every student for zero-touch attendance.
* **Tech Asset Management:** Tracking club equipment (Kits, Drones, Sensors) issued to members.

---

## 👥 User Roles & Permissions

| Role | Access Level & Responsibilities |
| :--- | :--- |
| **Admin** | Full system control, Member registration, and Global configurations. |
| **Organiser** | Event creation, QR scanning for attendance, and winner management. |
| **Judge** | Secure scoring panel for live technical evaluations. |
| **Student** | Accessing event timeline, personal QR code, and result tracking. |

---

## 💻 Tech Stack

This project is built using the **MERN Stack**:
* **Frontend:** React.js, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Security:** JWT (JSON Web Tokens) & Bcrypt Password Hashing

---

## ⚙️ Local Setup & Installation

**1. Clone the repository**
```bash
git clone [https://github.com/rohit-mathur4568/mechquish-club-web.git](https://github.com/rohit-mathur4568/mechquish-club-web.git)
cd mechquish-club-web
2. Setup the Backend

Bash
cd server
npm install
# Create a .env file with MONGO_URI and JWT_SECRET
npm run dev
3. Setup the Frontend

Bash
cd client
npm install
npm start