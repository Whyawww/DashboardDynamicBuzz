# 🚀 Dynamic Buzz - KOL Analyzer

A simple yet powerful web application built to predict whether an influencer is recommended based on key follower metrics and engagement. This tool is designed for Dynamic Buzz's internal Key Opinion Leader (KOL) evaluation process, leveraging machine learning to provide data-driven insights.

## ✨ Core Features

-   **Real-time Prediction:** Input influencer attributes (Followers, Posts, Avg. Likes, Category, Channel Info) and receive instant recommendations.
-   **Clear Outcomes:** Predicts whether an influencer is "Recommended" or "Not Recommended."
-   **Confidence Score:** Displays a probability score indicating the model's confidence in its prediction.
-   **Business Rules Integration:** Includes backend logic to flag and handle unrealistic input data, ensuring more sensible predictions.
-   **Interactive UI:** Smooth animations powered by Framer Motion for an enhanced user experience.
-   **Responsive Design:** Built with Tailwind CSS for a consistent look and feel across devices.
-   **SPA Architecture:** Developed as a Single Page Application using React for fast and dynamic interactions.

---

## ⚙️ Tech Stack

| Category   | Technology                                                                                                                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Frontend   | [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)](https://reactjs.org) `CRA` <br> [![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat)](https://tailwindcss.com) <br> [![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white&style=flat)](https://www.framer.com/motion/) <br> [![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&style=flat)](https://axios-http.com/) |
| Backend    | [![FastAPI](https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white&style=flat)](https://fastapi.tiangolo.com) <br> [![Uvicorn](https://img.shields.io/badge/-Uvicorn-121212?logo=python&logoColor=white&style=flat)](https://www.uvicorn.org) <br> [![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white&style=flat)](https://python.org) |
| ML/AI      | [![Scikit-Learn](https://img.shields.io/badge/-Scikit--Learn-F7931E?logo=scikit-learn&logoColor=white&style=flat)](https://scikit-learn.org) <br> [![Pandas](https://img.shields.io/badge/-Pandas-150458?logo=pandas&logoColor=white&style=flat)](https://pandas.pydata.org) <br> [![NumPy](https://img.shields.io/badge/-NumPy-013243?logo=numpy&logoColor=white&style=flat)](https://numpy.org/) |
| Tools      | [![Google Colab](https://img.shields.io/badge/-Google%20Colab-F9AB00?logo=google-colab&logoColor=white&style=flat)](https://colab.research.google.com) <br> [![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=flat)](https://git-scm.com/) <br> [![VSCode](https://img.shields.io/badge/-VSCode-007ACC?logo=visual-studio-code&logoColor=white&style=flat)](https://code.visualstudio.com/) |

---

## 🔧 Getting Started

### Prerequisites

-   Node.js (v16.x or higher recommended)
-   npm (usually comes with Node.js)
-   Python (v3.9 or higher recommended)
-   pip (usually comes with Python)

### Installation & Running the App

**1. Frontend **

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file for API configuration
# Create a file named .env in the 'frontend' root directory
# and add the following line :
# REACT_APP_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

# Run the React development server
npm run start
# The frontend will open in your browser, typically on http://localhost:3000 (for CRA)

**2. Backend (FastAPI Server)**

```bash
# Clone the repository
# git clone <https://github.com/Whyawww/DashboardDynamicBuzz.git>
# cd <DashboardDynamicBuzz>

# Navigate to the backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate the virtual environment
# On Windows:
# venv\Scripts\activate

# IMPORTANT: Ensure your model files are in place
# Make sure `influencer_model.joblib`, `scaler.joblib` (or `preprocessor.joblib`),
# and `model_columns.joblib` are present in the `backend/app/model_files/` directory.
# These files are generated from the Jupyter Notebook (`.ipynb`).

# Run the FastAPI server
uvicorn app.main:app --reload
# The backend will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000)
