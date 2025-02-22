# Ema Job Assignment - Frontend

This is the frontend of the **Ema Job Assignment** website, built using **React.js** and **Tailwind CSS**.

## 🚀 Features
- Job listing and filtering
- User authentication (if applicable)
- Responsive UI with Tailwind CSS
- Dynamic routing with React Router
- API integration with backend

## 🛠️ Tech Stack
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API requests (if applicable)

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173/` in your browser.

## 🔗 API Configuration
If your project fetches data from an API, update the `.env` file:
```env
VITE_API_URL=<your-backend-api-url>
```

## 📜 Environment Variables
Ensure you have these variables in your `.env` file:
```
VITE_API_URL=<Backend API URL>
```

## 🚀 Deployment
This project is deployed on **Firebase Hosting**. To deploy:
```bash
npm run build
firebase deploy
```

## 📜 License
This project is licensed under the MIT License.