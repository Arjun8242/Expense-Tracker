# 💰 Expense Tracker 
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![Netlify](https://img.shields.io/badge/Deploy-Frontend-00C7B7?logo=netlify)
![Render](https://img.shields.io/badge/Deploy-Backend-46E3B7?logo=render)


A **full-stack MERN application** to track expenses with **user authentication**.  

---

## 🚀 Features  
- 🔐 User registration & login (JWT auth)  
- ➕ Add, ✏️ update & ❌ delete expenses  
- 📜 View expense history  
- 📱 Responsive frontend (React + Tailwind)  
- ⚡ REST API (Node.js + Express + MongoDB)  

---

## 🛠 Tech Stack  
- **Frontend:** React, TailwindCSS, Axios  
- **Backend:** Node.js, Express, MongoDB Atlas, JWT  
- **Deployment:** Render (backend) + Netlify (frontend)  

---


📂 Expense-Tracker  
├── 📁 backend   # Express + MongoDB API  
├── 📁 frontend  # React + Tailwind client  
└── README.md


---


## ⚙️ Setup & Installation  

### 1. Clone Repository  
```bash
git clone https://github.com/Arjun8242/Expense-Tracker.git
cd Expense-Tracker
```

2. Backend Setup
```bash
cd backend
npm install
```

Create a .env file inside backend folder:
```bash
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173   # for local
```

Run backend:
```bash
npm start
```

👉 Backend runs at: http://localhost:5000

3. Frontend Setup
```bash
cd frontend
npm install
```

Create a .env file inside frontend folder:

```bash
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

👉 Frontend runs at: http://localhost:5173

---

🤝 Contributing

Contributions are welcome!

1.Fork the repo

2.Create a branch (git checkout -b feature-name)

3.Commit changes (git commit -m "Added new feature")

4.Push (git push origin feature-name)

5.Open a Pull Request

---

🙌 Thank You

Thank you for checking out this project! 💙
If you like it, don’t forget to ⭐ the repo and contribute to make it even better.

---

👨‍💻 Made with ❤️ by [Arjun](https://github.com/Arjun8242)

