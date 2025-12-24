# Pre-Deployment Checklist for Care.xyz

## ✅ Code Preparation

- [x] All environment variables use `process.env.*`
- [x] No hardcoded URLs (using `NEXT_PUBLIC_SITE_URL`)
- [x] `.env.local` in `.gitignore`
- [x] `.env.example` created with placeholder values
- [x] `vercel.json` configured
- [ ] Code pushed to GitHub repository

## ✅ Environment Variables to Set in Vercel

Copy these from your `.env.local` and paste in Vercel Dashboard:

### Required (All Environments):
```
MONGODB_URI
NEXTAUTH_URL (update to Vercel URL)
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
EMAIL_USER
EMAIL_PASS
EMAIL_HOST
EMAIL_PORT
NEXT_PUBLIC_SITE_URL (update to Vercel URL)
```

## ✅ Post-Deployment Configuration

### 1. Update Google OAuth
- [ ] Go to Google Cloud Console
- [ ] Add redirect URI: `https://your-project.vercel.app/api/auth/callback/google`
- [ ] Add authorized origin: `https://your-project.vercel.app`

### 2. Update MongoDB Atlas
- [ ] Add IP whitelist: `0.0.0.0/0` (or Vercel IPs)
- [ ] Verify connection string works

### 3. Update Environment Variables
- [ ] Replace `NEXTAUTH_URL` with actual Vercel URL
- [ ] Replace `NEXT_PUBLIC_SITE_URL` with actual Vercel URL
- [ ] Redeploy after updating

## ✅ Testing After Deployment

### Authentication
- [ ] Register new account with email/password
- [ ] Login with email/password
- [ ] Login with Google OAuth
- [ ] Logout functionality
- [ ] Session persistence (refresh page while logged in)

### Booking Flow
- [ ] Browse services on homepage
- [ ] Click on service detail page
- [ ] Click "Book Service" (redirects to login if not authenticated)
- [ ] Complete location cascade (Division → District → City → Area)
- [ ] Select duration (days/hours)
- [ ] Enter address
- [ ] Verify cost calculation is correct
- [ ] Submit booking
- [ ] Check if email invoice is received

### My Bookings Page
- [ ] View all bookings
- [ ] Filter by status (All, Pending, Confirmed, Completed, Cancelled)
- [ ] Cancel a booking
- [ ] Verify booking count stats

### Pages & Navigation
- [ ] Homepage loads correctly
- [ ] All services page displays properly
- [ ] Service detail pages work
- [ ] About page loads
- [ ] 404 page shows for invalid routes
- [ ] Navbar links work
- [ ] Footer links work

### SEO & Meta
- [ ] Homepage metadata displays in preview
- [ ] Services page metadata works
- [ ] Service detail pages have correct meta
- [ ] Favicon displays in browser tab
- [ ] Share on Facebook/Twitter shows correct image

## ✅ Performance & Security

- [ ] Build completes without errors
- [ ] No console errors in browser
- [ ] Images load from ImgBB
- [ ] No exposed secrets in client-side code
- [ ] MongoDB connection works
- [ ] Email sending works

## 🚨 Common Issues & Solutions

### Build Fails
**Solution**: Run `pnpm build` locally first to catch errors

### Auth Not Working
**Solution**: Verify `NEXTAUTH_URL` matches deployment URL exactly

### Database Connection Fails
**Solution**: Check MongoDB IP whitelist and connection string

### Emails Not Sending
**Solution**: Verify Gmail app password and SMTP settings

### Images Not Loading
**Solution**: Check `next.config.mjs` has correct image domains

## 📝 Final Steps

- [ ] Verify all environment variables are set
- [ ] Test complete user journey (register → book → view bookings)
- [ ] Check email delivery
- [ ] Verify Google OAuth works
- [ ] Test on mobile device
- [ ] Share link with someone to test

## 🎉 Ready to Deploy!

Once all items are checked, your Care.xyz platform is ready for production!

---

**Deployment Date**: _____________

**Live URL**: _____________

**Notes**: 
_____________________________________________
_____________________________________________
_____________________________________________
