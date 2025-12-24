# 🏥 Care.xyz - Baby Sitting & Elderly Care Service Platform

A comprehensive web application providing reliable and trusted care services for children, elderly, and other family members in Bangladesh.

## 🌟 Features

- **Responsive Design**: Mobile, tablet, and desktop supported
- **User Authentication**: Email & Password + Google Social Login
- **Dynamic Booking System**: Duration, Location (Division, District, City, Area), Address input
- **Real-time Cost Calculation**: Automatically calculates based on duration × service charge
- **Booking Management**: Track bookings with status (Pending/Confirmed/Completed/Cancelled)
- **Multiple Care Services**: Baby Care, Elderly Service, Special Needs, Post-operative Care, and more
- **Email Notifications**: Booking confirmation with invoice
- **Role-based Access**: User and Admin roles

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth v4
- **UI Components**: Shadcn UI + Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **Alerts**: SweetAlert2
- **Email**: NodeMailer
- **Date Handling**: date-fns
- **Security**: bcryptjs for password hashing

## 📦 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd carexyz
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (NodeMailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Generate NextAuth Secret**

```bash
# Run this in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. **Run development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder structure.

## 🔧 Development Steps

### ✅ Step 1: Environment Setup & Project Structure

- Environment variables configured
- Folder structure created
- Seed data prepared

### 🔄 Step 2: Database Models & Seeding (Next)

- MongoDB models creation
- Database seeding script
- Connection testing

### 📋 Upcoming Steps

3. Authentication Setup
4. Shadcn Components Installation
5. Homepage Development
6. Service Pages
7. Booking System
8. User Dashboard
9. Email Notifications
10. Final Polish & Deployment

## 🚀 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📚 API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `GET /api/services` - Get all services
- `GET /api/services/[id]` - Get single service
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/reviews` - Get all reviews
- `GET /api/locations` - Get location data

## 🎨 Design System

- **Primary Color**: Neutral theme with care-themed accents
- **Font**: System fonts optimized for readability
- **Spacing**: Consistent 4px/8px grid
- **Components**: Shadcn UI with custom styling

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Input validation
- Environment variable protection

## 📧 Email Configuration

For Gmail:

1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS

## 🌐 Deployment

Deployment instructions will be provided in Step 10.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Development

Built with ❤️ using Next.js and modern web technologies.
