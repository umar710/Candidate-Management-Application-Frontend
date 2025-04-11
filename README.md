# Candidate Management System - Frontend

## 🌟 Technologies Used

- **Framework**: React.js
- **UI Library**: React Bootstrap
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: CSS

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v16.x or later recommended)
- npm (comes with Node.js)
- Backend server running (see backend README)

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/candidate-management-system.git
cd candidate-management-system/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the frontend directory:

```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Run the application

```bash
npm start
```

This will automatically open the app in your default browser at `http://localhost:3000`

## 🌍 Live Deployment

The application is deployed and available at:  
👉 [https://andidate-management-application-front.netlify.app/](https://andidate-management-application-front.netlify.app/)

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (advanced)

## 📂 Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── services/    # API services
│   ├── App.js       # Main application component
│   └── index.js     # Application entry point
├── package.json
└── README.md
```

## 🌐 Connecting to Backend

By default, the frontend expects the backend to be running at `http://localhost:5000`. To change this:

1. Edit the `.env` file
2. Update `REACT_APP_API_URL` to point to your backend URL

## 💡 Features

- View all candidates in a responsive table
- Add, edit, and delete candidates
- Search and filter functionality
- Pagination support
- Modern UI with loading states

## 🛠 Troubleshooting

**Common Issues:**

1. **Connection to backend fails**

   - Ensure backend server is running
   - Check CORS settings in backend
   - Verify `REACT_APP_API_URL` in `.env`

2. **Styles not loading properly**

   - Run `npm install` again
   - Clear browser cache

3. **Dependency issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again


