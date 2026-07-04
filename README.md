📘 Abstrabit RAG Assistant
🚀 Full Stack AI Document Q&A System (RAG)
📌 Overview

Abstrabit is a full-stack Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents, organize them into workspaces, and interact with them using natural language queries.

It uses vector embeddings + semantic search + Google Gemini AI to generate context-aware answers from uploaded documents.

🌐 Live Demo
🔗 Frontend (Vercel): https://abstrabit-rag-assistant.vercel.app
⚙️ Backend (Render): https://abstrabit-rag-backend.onrender.com
🔑 Demo Login Credentials (For Evaluation)

Use the following credentials to access the system:

Email: demo@example.com
Password: Abstrabit@123

⚠️ Ensure this user exists in Supabase Authentication.

✨ Key Features
🔐 Secure Authentication using Supabase Auth
📁 Workspace-based document management
📄 PDF upload and text extraction
✂️ Intelligent text chunking for large documents
🧠 Vector embeddings for semantic search
🔍 Retrieval-Augmented Generation (RAG) pipeline
🤖 AI-powered responses using Google Gemini API
💬 Real-time chat interface
☁️ Fully deployed (Frontend + Backend)
🏗️ System Architecture

Frontend (React + Vite)
↓
Backend (Node.js + Express)
↓
Supabase (Auth + Database + Vector Storage)
↓
Google Gemini API (AI Response Generation)

🧰 Tech Stack
Frontend
React.js
Vite
TypeScript
Tailwind CSS
Backend
Node.js
Express.js
Database & Auth
Supabase (PostgreSQL + Authentication + Vector DB)
AI / ML
Google Gemini API (gemini-2.5-flash)
Embedding-based semantic search
Deployment
Vercel (Frontend Hosting)
Render (Backend Hosting)
⚙️ Workflow
User logs in via Supabase Authentication
User creates a workspace
User uploads a PDF document
Backend extracts text from PDF
Text is split into chunks
Embeddings are generated and stored in Supabase
User asks a question
Relevant chunks are retrieved using vector similarity
Gemini generates a context-aware answer
🔐 Environment Variables
Backend (.env)

GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

Frontend (.env)

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://abstrabit-rag-backend.onrender.com

🧪 Local Setup Instructions
1. Clone Repository

git clone https://github.com/ramkeerthikumar/abstrabit-rag-assistant.git

2. Install Frontend Dependencies

cd frontend
npm install
npm run dev

3. Install Backend Dependencies

cd backend
npm install
npm run build
npm run start

📡 API Endpoints
Chat API

POST /api/chat

Upload API

POST /api/upload

🧠 Key Learnings
Built a complete RAG pipeline from scratch
Understood vector embeddings and semantic search
Integrated Google Gemini API for LLM responses
Learned full-stack deployment using Vercel & Render
Worked with Supabase Auth, database, and RLS policies
Debugged real production issues (CORS, RLS, API quota limits)
Improved error handling in distributed systems
⚠️ Known Issues
Gemini API free tier has strict quota limits (may temporarily fail under heavy usage)
First API request may take slightly longer due to cold start behavior
📸 Screenshots (Recommended)

Add these in your repository:

Login Page
Dashboard
Workspace Page
Chat Interface
Document Upload Flow
👨‍💻 Author

Keerthi Kumar M
GitHub: https://github.com/ramkeerthikumar

📌 Final Notes

This project demonstrates a production-ready AI-powered document intelligence system with authentication, vector search, and LLM integration.

🚀 DONE
