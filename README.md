<div align="center">

# 🩺 Care.xyz

### Professional Baby Sitting & Elderly Care Service Platform

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://carexyz-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Native-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**[Live Demo](https://carexyz-five.vercel.app)** | **[Report Bug](https://github.com/abbasyasin1n2/care-xyz/issues)** | **[Request Feature](https://github.com/abbasyasin1n2/care-xyz/issues)**

---

</div>

## 📖 About The Project

Care.xyz is a comprehensive web application providing reliable and trusted care services for children, elderly, and special needs family members across Bangladesh. Users can easily find and hire professional caregivers with flexible scheduling, transparent pricing, and secure booking management.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - Email/Password + Google OAuth
- 📍 **Smart Location Selection** - 4-level cascade (Division → District → City → Area)
- ⏰ **Flexible Scheduling** - Book by hours or days
- 💰 **Real-time Pricing** - Instant cost calculation
- 📧 **Email Invoices** - Automatic booking confirmations
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI** - Built with Shadcn UI components

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Email/Password authentication with secure password hashing
- Google OAuth 2.0 integration
- Session management with NextAuth
- Protected routes with middleware
- Role-based access control (User/Admin)

### 📋 Booking System
- **Dynamic Location Cascade**: Division → District → City → Area selection
- **Duration Selection**: Choose hours or days
- **Real-time Cost Calculation**: Automatic price updates
- **Booking Status Tracking**: Pending, Confirmed, Completed, Cancelled
- **My Bookings Dashboard**: View and manage all bookings
- **Cancel Functionality**: Easy booking cancellation

### 🏥 Services
- Home Nursing Service
- Special Needs Child Care
- Elderly Companion Care
- Post-operative Care
- Adult with Disabilities Care
- Baby Care Service
- Nanny Care Service

### 📧 Email System
- Professional HTML invoice emails
- Booking confirmation with complete details
- Location and cost breakdown
- Automatic delivery via NodeMailer

### 🎨 User Interface
- Modern, clean design with Shadcn UI
- Smooth animations with Framer Motion
- Auto-rotating hero slider with Embla Carousel
- Service cards with pricing
- Review/testimonial section
- Mobile-first responsive design

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 (App Router, Turbopack)
- **UI Library**: Shadcn UI v3.6.2 (new-york style)
- **Styling**: Tailwind CSS v4.0.0
- **Animations**: Framer Motion v12.23.26
- **Icons**: React Icons v5.5.0
- **Form Validation**: Custom validators
- **Notifications**: SweetAlert2 v11.26.17

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB (Native Driver v7.0.0)
- **Authentication**: NextAuth v4.24.13
- **Password Hashing**: bcryptjs v3.0.3
- **Email**: NodeMailer v6.9.16

### DevOps & Tools
- **Package Manager**: pnpm v10.20.0
- **Version Control**: Git & GitHub
- **Deployment**: Vercel
- **Date Handling**: date-fns v4.1.0

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email service
- Google OAuth credentials (optional)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abbasyasin1n2/care-xyz.git
cd care-xyz
```

### 2️⃣ Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# NextAuth (Authentication)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here_generate_using_openssl

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Generate NextAuth Secret:**
```bash
openssl rand -hex 32
```

### 4️⃣ Set Up MongoDB

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database named `carexyz`
4. Add your IP to the whitelist
5. Copy the connection string to `MONGODB_URI`

### 5️⃣ Set Up Gmail for Email Service

1. Enable 2-factor authentication on Gmail
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the app password for `EMAIL_PASS`

### 6️⃣ Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret

### 7️⃣ Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

3. **Update Environment Variables**
   - Set `NEXTAUTH_URL` to your Vercel URL
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL
   - Update Google OAuth redirect URIs

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📁 Project Structure

```
carexyz/
├── public/
│   └── assets/          # Images and static files
├── src/
│   ├── actions/         # Server actions
│   │   └── authActions.js
│   ├── app/             # Next.js app router
│   │   ├── api/         # API routes
│   │   ├── about/       # About page
│   │   ├── booking/     # Booking pages
│   │   ├── login/       # Login page
│   │   ├── my-bookings/ # User dashboard
│   │   ├── register/    # Registration page
│   │   ├── services/    # Services pages
│   │   ├── layout.js    # Root layout
│   │   ├── page.js      # Homepage
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── booking/     # Booking components
│   │   ├── shared/      # Shared components
│   │   └── ui/          # Shadcn UI components
│   ├── data/            # JSON data files
│   ├── lib/             # Utility libraries
│   │   ├── auth.js      # Auth helpers
│   │   ├── dbConnect.js # MongoDB connection
│   │   ├── email.js     # Email service
│   │   ├── mongodb.js   # Collection getters
│   │   └── utils.js     # Utilities
│   └── utils/           # Validators
├── .env.example         # Environment template
├── .env.local           # Local environment (not committed)
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

---

## 🎯 Usage

### For Users

1. **Browse Services**
   - Visit homepage to see available services
   - Click on any service for details

2. **Book a Service**
   - Click "Book Service" button
   - Login or register if not authenticated
   - Select location (Division → District → City → Area)
   - Choose duration (hours/days)
   - Enter address
   - Review cost and confirm booking

3. **Manage Bookings**
   - Go to "My Bookings" from navbar
   - View all bookings with status
   - Filter by status (Pending, Confirmed, etc.)
   - Cancel bookings if needed

4. **Receive Confirmation**
   - Check email for booking invoice
   - Invoice includes all booking details

---

## 📸 Screenshots

### Homepage
![Homepage](https://i.ibb.co.com/7dyMfvwb/Screenshot-2025-12-24-142349.png)

### Services Page
![Services](https://i.ibb.co.com/pB1m8H71/Screenshot-2025-12-24-142440.png)

---

## 🔑 Key Features Implementation

### 1. Authentication Flow
- User registers with NID validation (Bangladesh format)
- Password strength indicator
- Email verification through checkEmailExists
- Auto-login after registration
- Persistent sessions with NextAuth

### 2. Location Cascade
- Dynamic dropdown population
- API-driven location data
- 4-level hierarchy enforcement
- Real-time district/city/area filtering

### 3. Booking Process
1. Service selection
2. Authentication check
3. Location selection
4. Duration input (with smart UX)
5. Real-time cost calculation
6. Booking confirmation
7. Email invoice delivery

### 4. Email Invoice
- Professional HTML template
- Booking details (ID, service, duration, location)
- Cost breakdown
- Company branding with logo
- "View My Bookings" CTA button

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abbas Yasin**
- GitHub: [@abbasyasin1n2](https://github.com/abbasyasin1n2)
- Email: abbasyasin1n2@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform
- [NextAuth](https://next-auth.js.org/) - Authentication

---

## 📞 Support

For support, email abbasyasin1n2@gmail.com or open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for Care.xyz**

⭐ Star this repository if you find it helpful!

</div>

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
