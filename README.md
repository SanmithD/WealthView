# 💰 WealthView – Portfolio Performance Dashboard

WealthView is a full-stack portfolio dashboard app that visualizes stock holdings, performance metrics, and market/sector allocations. It reads data from an Excel sheet and provides clear financial insights using interactive charts and tables.

---

## 🗂️ Project Structure

```bash
WealthView/
├── client/ # React + Vite frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── Components/
│ │ ├── lib/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
├── server/ # Node.js + Express backend
│ ├── controller/
│ ├── routes/
│ ├── utils/
│ ├── data.xlsx
│ ├── index.js
│ ├── .env
│ └── package.json

```

## 🚀 Features

- 📊 **Holdings Summary** – Total value, gain/loss, and gain %
- 🔍 **Search & Sort** – Filter holdings by symbol/company and sort by performance
- 🧠 **Top/Bottom Performers** – Highlights best and worst-performing stocks
- 🧭 **Asset Allocation** – Sector and market cap pie charts with interactivity
- 📈 **Performance Comparison** – Compare portfolio with Nifty50 and Gold over time
- 📦 **Excel Integration** – Data read from `data.xlsx`

---

## 🧩 Dependencies

### Backend (`server/package.json`)
```bash
{
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "nodemon": "^3.1.10",
    "xlsx": "^0.18.5"
  }
}
```

### Frontend (`client/package.json`)
```bash
"dependencies": {
  "@tailwindcss/vite": "^4.1.11",
  "axios": "^1.11.0",
  "chart.js": "^4.5.0",
  "react": "^19.1.1",
  "react-chartjs-2": "^5.3.0",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.8.0",
  "tailwindcss": "^4.1.11",
  "zustand": "^5.0.7"
}
```

### 🛠️ Getting Started
1. Clone the Repository
```bash
git clone https://github.com/your-username/wealthview.git
cd wealthview

```
2. Install Dependencies
# Backend:
```bash
cd server
npm install
```

# Frontend:
```bash
cd ../client
npm install
```
3. Start the App
# Start Backend:
```bash
npm start
```
# Start Frontend:
```bash
npm run dev
```

### 📷Screenshots
📊 Holdings & Allocation
<img width="1318" alt="Holdings View" src="https://github.com/user-attachments/assets/b974fb20-49b3-4631-9108-71718aecce47" />
🧠 Performance Summary 
<img width="1319" alt="Performance" src="https://github.com/user-attachments/assets/b929fd03-b0a4-4561-b131-6ff2f12b4ddf" />
📈 Timeline Comparison (Portfolio vs Nifty50 vs Gold)
<img width="1298" alt="Comparison" src="https://github.com/user-attachments/assets/3404af2b-c0a4-4c7e-8e15-40bcf7d6ecec" />

## Docs
Thank you for considering me for this opportunity. I built this project according to your requirements. The backend is mostly handwritten, while I used AI (ChatGPT) to help with the frontend—mainly to save time and speed up the design process. It really helped me bring the UI together quickly and responsively.