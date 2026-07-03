🧠 Multi-Workspace Document Assistant (RAG + Tool Calling)

A full-stack AI-powered document assistant that allows users to upload PDFs, ask questions using Retrieval-Augmented Generation (RAG), and execute actions using tool calling — all within strictly isolated workspaces.

🚀 Features
📄 Document Intelligence (RAG)
Upload PDF documents
Automatic text extraction and chunking
Embedding generation using Google Gemini
Vector storage using Supabase (pgvector)
Semantic search over documents
💬 AI Chat Assistant
Ask questions about uploaded documents
Context-aware answers using retrieved chunks
Honest fallback: says “I don’t know” when context is missing
🧩 Multi-Workspace Support (IMPORTANT)
Multiple workspaces per user
Strict isolation using workspace_id
No cross-workspace data leakage
Each workspace has independent document knowledge
🔧 Tool Calling System
AI can trigger backend actions
Tools:
Save Task
Add Note
Secure server-side execution (LLM cannot directly access DB)
🖥 Dashboard
Workspace switcher
Document list
Chat interface
Tool execution logs (basic support)
🏗 Tech Stack
Frontend
React.js
TypeScript
Backend
Node.js
Express.js
Database
Supabase (PostgreSQL + pgvector extension)
AI Services
Google Gemini (Chat + Embeddings)
⚙️ System Architecture
PDF Upload
   ↓
Text Extraction
   ↓
Chunking
   ↓
Embedding (Gemini)
   ↓
Store in Supabase (vector DB + workspace_id)

-----------------------------------------

User Question
   ↓
Embedding
   ↓
Vector Similarity Search (workspace filtered)
   ↓
Relevant Context Retrieved
   ↓
Gemini LLM generates answer
   ↓
Optional Tool Execution (save_task / add_note)
🔐 Environment Variables

Create a .env file in the backend:

GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
🧪 How to Run Locally
1. Backend
cd backend
npm install
npm run dev
2. Frontend
cd frontend
npm install
npm start
🧪 How to Test the System
📄 Document Upload
Create a workspace
Upload a PDF file
Wait for processing
💬 Chat Testing

Ask questions like:

"Summarize the document"
"What skills are mentioned?"
"What is the candidate experience?"
🧩 Workspace Isolation Test
Upload Document A in Workspace A
Upload Document B in Workspace B
Ask same question in both
Verify no data leakage between workspaces
🔧 Tool Testing

Try prompts like:

"Save task: review resume"
"Add note: important candidate"
🌐 Deployment
Frontend
Vercel / Netlify
Backend
Render / Railway
Database
Supabase Cloud
📌 Key Learnings
Built a full Retrieval-Augmented Generation (RAG) pipeline
Learned vector embeddings and similarity search
Implemented strict multi-tenant workspace isolation
Integrated Google Gemini for embeddings + chat
Designed secure tool calling system with backend validation
Handled real-world issues like vector dimension mismatches and API integration errors
⚠️ Important Design Decisions
Single shared vector database with workspace-based filtering
Strict separation using workspace_id in all queries
Hybrid system: Chat + RAG combined
Server-side tool execution (safe architecture)
Context-based prompting to reduce hallucinations
🧠 AI Features
Retrieval-Augmented Generation (RAG)
Semantic search using embeddings
Function / Tool Calling
Workspace-aware context filtering
Hallucination control using grounding
🔒 Security Considerations
Workspace isolation enforced at database query level
No direct LLM access to database
Tool execution validated in backend
Environment variables hidden from frontend
👨‍💻 Author

Keerthi Kumar M

📌 Project Status

✔ Document upload working
✔ RAG pipeline working
✔ Multi-workspace isolation working
✔ Tool calling implemented
✔ Chat system fully functional
✔ Deployment ready

🏁 FINAL NOTE

This project demonstrates a production-style AI system combining:

LLMs
Vector databases
Multi-tenant architecture
Tool calling
Secure backend orchestration