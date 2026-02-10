# HAWESCENT - Halal Wedlock Centre

**Hawescent** is a modern, faith-based platform dedicated to promoting pious marriage and family stability. Built with Islamic values at its core, it provides a secure and dignified environment for individuals to find compatible life partners under the guidance of Shariah principles.

## 🌟 Key Features

- **Gender-Specific Registration**: Tailored onboarding for Brothers and Sisters.
- **AI-Powered Matchmaking**: Transparent compatibility scoring (0-100%) based on Sect, Level of Practice, Marital Status, and Age.
- **Admin Dashboard**: Real-time moderation tools for profile approval and managed matchmaking.
- **Shariah Compliant**: Designed to involve guardians (Wali/Mahram) and maintain high moral standards.
- **Automated Notifications**: Real-time alerts via n8n integration.

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Vanilla CSS (Premium Aesthetics)
- **Icons**: Lucide React
- **Backend/DB**: Supabase (PostgreSQL with RLS)
- **Automation**: n8n Webhooks

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone [YOUR_REPO_URL]
cd hawescent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 4. Run Development Server
```bash
npm run dev
```

## 🛡️ Security & Privacy
Hawescent prioritizes user privacy and data security through Supabase Row Level Security (RLS) policies, ensuring that sensitive information is only accessible to authorized personnel and the users themselves.

---
*Built with ❤️ for the Ummah.*
