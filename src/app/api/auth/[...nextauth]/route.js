import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          nid: user.nid,
          contact: user.contact,
          photoURL: user.photoURL
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        const usersCollection = await getUsersCollection();
        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user from Google
          await usersCollection.insertOne({
            email: user.email,
            name: user.name,
            photoURL: user.image,
            role: 'user',
            provider: 'google',
            googleId: account.providerAccountId,
            createdAt: new Date()
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.nid = user.nid;
        token.contact = user.contact;
        token.photoURL = user.photoURL;
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.nid = token.nid;
        session.user.contact = token.contact;
        session.user.photoURL = token.photoURL;
        // Ensure image is available (NextAuth uses 'image' for OAuth providers)
        if (!session.user.image && token.picture) {
          session.user.image = token.picture;
        }
        if (!session.user.image && token.photoURL) {
          session.user.image = token.photoURL;
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
