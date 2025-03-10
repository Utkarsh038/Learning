# Interactive Learning Platform - Documentation

## **Setup Instructions**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/interactive-learning-platform.git
cd interactive-learning-platform
```

### **2. Backend Setup (Django + FastAPI)**
#### **Install Dependencies**
```sh
pip install -r backend/requirements.txt
```
#### **Database Configuration**
Create a `.env` file in the backend directory and add:
```
DATABASE_URL=postgresql://<USERNAME>:<PASSWORD>@<HOST>/<DB_NAME>?sslmode=require
```
Update `settings.py` to use environment variables:
```python
import os
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=os.getenv("DATABASE_URL"))
}
```
#### **Apply Migrations**
```sh
python manage.py makemigrations
python manage.py migrate
```
#### **Start Django Server**
```sh
python manage.py runserver
```

### **3. Frontend Setup (Vite + React)**
#### **Install Dependencies**
```sh
cd frontend
npm install
```
#### **Start Frontend Server**
```sh
npm run dev
```

### **4. WebSocket Server**
#### **Install Daphne for WebSockets**
```sh
pip install daphne
```
#### **Run ASGI Server**
```sh
daphne -b 0.0.0.0 -p 8000 backend.asgi:application
```

---

## **API Documentation**

### **1. Challenges API**
#### **Get All Challenges**
**Endpoint:** `GET /api/challenges/`
**Response:**
```json
[
  {
    "id": 1,
    "title": "FizzBuzz",
    "description": "Write a program that prints numbers from 1 to 100...",
    "difficulty": "beginner",
    "points": 10,
    "category": "Programming Basics"
  }
]
```

#### **Submit Challenge Code**
**Endpoint:** `POST /api/challenges/submit/`
**Request:**
```json
{
  "user_id": 1,
  "challenge_id": 1,
  "code": "print('Hello World')"
}
```
**Response:**
```json
{
  "status": "success",
  "execution_result": "Hello World",
  "timestamp": "2025-03-09T12:34:56Z"
}
```

### **2. WebSocket Endpoints**
#### **Live Submission Updates**
**WebSocket URL:** `ws://localhost:8000/ws/submission/{challenge_id}/`
**Message Format:**
```json
{
  "code": "print('Hello World')"
}
```
**Response Format:**
```json
{
  "status": "Code executed successfully!"
}
```

---

## **Code Style Guidelines**
- **Backend (Django & FastAPI):**
  - Follow **PEP8** conventions.
  - Use **type hints** for better readability.
  - Document functions with **docstrings**.

- **Frontend (React + Vite):**
  - Use **ESLint & Prettier** for formatting.
  - Follow **React functional components** best practices.
  - Use **Tailwind CSS** for styling.

- **Database (NeonDB - PostgreSQL):**
  - Use **snake_case** for table and column names.
  - Maintain **foreign key constraints** properly.
  - Index frequently queried fields for performance.

---

## **Contribution Guide**
- Fork the repository and create a new branch.
- Follow the code style guidelines.
- Submit a **Pull Request (PR)** with a detailed description.

---

## **Future Enhancements**
✅ Add **leaderboard rankings** (weekly/monthly).
✅ Improve **submission history UI**.
✅ Implement **AI-based hints for challenges**.

---

This documentation provides a complete guide for setting up, running, and contributing to the interactive learning platform. 🚀

