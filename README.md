🏠 BasaFinder - Smart Rental Platform
BasaFinder Banner

BasaFinder is a role-based rental platform where landlords list properties, tenants book them, and admins manage the ecosystem. Supports secure payments, AI-driven recommendations, and full moderation.

✨ Features
Role Permissions
Tenant Browse properties, book rentals, make payments
Landlord Post/update listings, approve/reject bookings
Admin Delete users, manage roles, deactivate listings
✅ Property Listings – Filter, search, and book rentals
✅ Role-Based Access Control (RBAC) – Secure routes for tenants/landlords/admins
✅ Payments – Integration with Nagad/bKash (success/fail tracking)
✅ AI Tools – Fraud detection, chatbot support, smart recommendations

🛠 Tech Stack
Area Technologies Used
Frontend Next.js, React, TypeScript, Shadcn UI, React Hook Form
Backend Node.js, Express, TypeScript, MongoDB, Mongoose
Auth JWT, Bcrypt, Role-based access
DevOps Docker (optional), Vercel/AWS
� Installation (Local Development)
Prerequisites
Node.js ≥ v18

MongoDB (local or MongoDB Atlas)

Git

Steps
Clone the repo

bash
git clone https://github.com/yourusername/basaFinder.git
cd basaFinder
Set up backend

bash
cd server
npm install
cp .env.example .env # Update MongoDB/JWT keys
npm run dev
Set up frontend

bash
cd ../client
npm install
npm run dev
Access the app

Frontend: http://localhost:3000

Backend API: http://localhost:5000

🌐 Live Demo
🔗 https://basafinder.vercel.app (Replace with your live link)

📂 Project Structure
bash
basaFinder/
├── client/ # Next.js frontend
│ ├── src/
│ │ ├── app/ # Role-based routes
│ │ ├── lib/ # API calls, auth logic
├── server/ # Express backend
│ ├── src/
│ │ ├── models/ # MongoDB schemas
│ │ ├── routes/ # API endpoints
│ │ ├── utils/ # Bcrypt, JWT helpers
📜 License
MIT © Your Name

📬 Contact
Email: hello@basafinder.com

GitHub Issues: Report Bugs Here
