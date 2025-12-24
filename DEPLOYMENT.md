# Deployment Guide for Care.xyz

## Prerequisites
- Vercel account
- MongoDB Atlas account (database already set up)
- Google OAuth credentials
- Gmail app password for email service

## Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure `.env.local` is in `.gitignore` (it should be by default)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration

### Option B: Deploy via CLI
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 3: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

### Required Environment Variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string_from_env_local

# NextAuth
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_from_env_local

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_from_env_local
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_env_local

# Email
EMAIL_USER=your_email_from_env_local
EMAIL_PASS=your_email_password_from_env_local
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

**⚠️ COPY VALUES FROM YOUR `.env.local` FILE - DO NOT COMMIT REAL SECRETS TO GITHUB!**

**⚠️ IMPORTANT:** 
- Replace `your-project-name.vercel.app` with your actual Vercel deployment URL
- Set all environment variables for "Production", "Preview", and "Development" environments

## Step 4: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "Credentials" → Edit your OAuth 2.0 Client ID
4. Add Authorized redirect URIs:
   ```
   https://your-project-name.vercel.app/api/auth/callback/google
   ```
5. Add Authorized JavaScript origins:
   ```
   https://your-project-name.vercel.app
   ```

## Step 5: Configure MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Navigate to "Network Access"
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IP ranges for better security

## Step 6: Redeploy

After setting environment variables:
1. Go to Vercel Dashboard → Deployments
2. Click "..." on the latest deployment → "Redeploy"
3. Or push a new commit to trigger automatic deployment

## Step 7: Verify Deployment

Test the following:
- ✅ Homepage loads correctly
- ✅ Services page displays all services
- ✅ Service detail pages work
- ✅ User registration with email/password
- ✅ Google OAuth login
- ✅ Location cascade in booking form
- ✅ Create a booking
- ✅ Check if email invoice is sent
- ✅ View My Bookings page
- ✅ Cancel a booking

## Troubleshooting

### Build Errors
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Run `pnpm build` locally to test

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check Google OAuth redirect URIs
- Ensure `NEXTAUTH_SECRET` is set

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string in `MONGODB_URI`
- Ensure database name is "carexyz"

### Email Not Sending
- Verify Gmail app password is correct
- Check if EMAIL_HOST and EMAIL_PORT are set correctly
- Test email locally first

## Performance Optimization

### After Deployment:
1. Enable Vercel Analytics (optional)
2. Set up custom domain (optional)
3. Configure caching headers if needed

## Security Checklist
- ✅ All secrets in environment variables (not in code)
- ✅ `.env.local` in `.gitignore`
- ✅ MongoDB IP whitelist configured
- ✅ Google OAuth restricted to your domain
- ✅ NextAuth secret is strong and unique

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update environment variables:
   - `NEXTAUTH_URL=https://yourdomain.com`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
5. Update Google OAuth redirect URIs to use custom domain
6. Redeploy

## Monitoring

- Check Vercel deployment logs for errors
- Monitor MongoDB Atlas for connection issues
- Test booking flow and email delivery regularly

---

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] All environment variables set in Vercel
- [ ] Google OAuth redirect URIs updated
- [ ] MongoDB IP whitelist configured
- [ ] Deployment successful
- [ ] Homepage accessible
- [ ] Authentication working (email & Google)
- [ ] Booking creation working
- [ ] Email invoice sending
- [ ] My Bookings page working

---

**Your Care.xyz platform is now live! 🚀**
