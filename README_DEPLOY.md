# Care.xyz - Baby Sitting & Elderly Care Service Platform

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/carexyz)

## 📋 Deployment Instructions

### 1. Click "Deploy to Vercel" button above
### 2. Set the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### 3. After deployment:
- Update Google OAuth redirect URIs
- Configure MongoDB IP whitelist
- Test all features

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✨ Features

- 🔐 **Authentication**: Email/Password + Google OAuth
- 📍 **Location Cascade**: Division → District → City → Area
- ⏰ **Flexible Duration**: Hours or Days booking
- 💰 **Real-time Cost**: Automatic calculation
- 📧 **Email Invoices**: Automatic booking confirmations
- 📱 **Fully Responsive**: Mobile, Tablet, Desktop
- 🎨 **Modern UI**: Shadcn + Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB (Native Driver)
- **Authentication**: NextAuth.js
- **UI**: Shadcn UI + Tailwind CSS
- **Email**: Nodemailer
- **Deployment**: Vercel

## 📦 Local Development

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Fill in your environment variables
4. Install dependencies: `pnpm install`
5. Run development server: `pnpm dev`
6. Open http://localhost:3000

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Project Details](./preojectdetails.md) - Original requirements

## 🔑 Environment Variables

See [.env.example](./.env.example) for all required environment variables.

## 🌐 Live Demo

Visit the live demo at: [Your Deployment URL]

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ for Care.xyz**
