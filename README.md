# CanvasConnect 

**CanvasConnect** is a real-time collaborative whiteboard built with the **MERN stack**.  
Draw, chat, and ideate instantly in shared rooms. Designed for seamless **remote collaboration**.

## Features

- **Real-time Drawing** – Draw together on a live canvas using **Socket.IO**.
- **Integrated Chat** – Communicate with participants instantly.
- **Persistent Whiteboards** – Save and load your work via **MongoDB**.
- **Dynamic Frontend** – Animated UI with **Framer Motion** and **Three.js**.
- **Responsive & Fast** – Built with **React + TailwindCSS** for smooth UX.
- **Client-side Auth** – Quick room joining without complex logins.

---

## 🛠 Tech Stack

**Frontend:** React, TailwindCSS, Framer Motion, Three.js  
**Backend:** Node.js, Express.js, Socket.IO  
**Database:** MongoDB (Mongoose)  
**Other:** Vite / CRA, JWT (if using auth), Vercel / Netlify for deployment

---

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/canvasconnect.git
   cd canvasconnect
Install dependencies

bash
Copy
Edit
# Client
cd client
npm install

# Server
cd ../server
npm install
Environment Variables
Create a .env file in the server folder:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection
PORT=5000
Run development servers

bash
Copy
Edit
# Server
cd server
npm run dev

# Client (in another terminal)
cd client
npm run dev
🌐 Usage
Open the app in your browser.

Create or join a room.

Start drawing and chatting in real time!

Your drawings and messages are synced instantly with all participants.