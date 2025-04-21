🏠 basaFinder
basaFinder is a role-based rental house management web application that connects landlords and tenants through a secure, feature-rich platform. It supports real-time listings, secure authentication, and payment functionality. The platform has three user roles: Admin, Landlord, and Tenant.

🔗 Live Demo
🌐 Click here to view the live website

Replace this link with your actual deployed site URL

🚀 Features
👤 Role-Based Access
Admin

Delete and update any user (Tenant or Landlord)

Update/delete posted houses

Manage user roles

Deactivate users

Landlord

Post houses for rent (after logging in)

Manage their own listings

Accept/reject tenant requests

Tenant

Browse and request rental houses

Make payments after landlord approval

🔒 Authentication & Authorization
Role-based authentication

Protected routes for different user types

Secure password hashing using bcrypt

Token-based authentication using JWT

💳 Payment System
Secure payment gateway

Tenants can pay rent after approval

🧑‍💻 Tech Stack
Frontend
React.js

Next.js

TypeScript

ShadCN UI

React Hook Form

AI Integration

Backend
Node.js

Express.js

TypeScript

JWT

bcrypt

MongoDB

Mongoose

📁 Project Structure
bash
Copy
Edit
basaFinder/
│
├── frontend/ # Next.js Frontend
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── utils/
│
├── backend/ # Node.js Backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── middlewares/
│
└── README.md
🛡️ Security
Passwords hashed with bcrypt

JWT-based session management

Middleware to protect sensitive routes by user role

🧾 How to Use
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/basaFinder.git
Navigate to the frontend and install dependencies:

bash
Copy
Edit
cd frontend
npm install
Navigate to the backend and install dependencies:

bash
Copy
Edit
cd backend
npm install
Set up .env files for environment variables

Run development servers:

bash
Copy
Edit

# Backend

npm run dev

# Frontend

npm run dev
📌 Future Improvements
Real-time chat between tenant and landlord

Notification system

Admin dashboard with analytics

Review and rating system

📧 Contact
For any feedback or issues, feel free to reach out:
📩 your-email@example.com
