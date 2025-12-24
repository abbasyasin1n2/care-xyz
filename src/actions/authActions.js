'use server';

import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';

export async function registerUser(formData) {
  try {
    const { name, email, password, nid, contact } = formData;

    // Validation
    if (!name || !email || !password || !nid || !contact) {
      return { success: false, error: 'All fields are required' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Password validation (6+ char, 1 uppercase, 1 lowercase)
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { success: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { success: false, error: 'Password must contain at least one lowercase letter' };
    }

    const usersCollection = await getUsersCollection();

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Check if NID already exists
    const existingNID = await usersCollection.findOne({ nid });
    if (existingNID) {
      return { success: false, error: 'This NID is already registered' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      nid,
      contact,
      role: 'user',
      photoURL: null,
      provider: 'credentials',
      createdAt: new Date()
    });

    return {
      success: true,
      message: 'Registration successful',
      userId: result.insertedId.toString()
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Failed to register user' };
  }
}

export async function checkEmailExists(email) {
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email });
    return { exists: !!user };
  } catch (error) {
    console.error('Check email error:', error);
    return { exists: false };
  }
}

export async function getUserByEmail(email) {
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        nid: user.nid,
        contact: user.contact,
        photoURL: user.photoURL
      }
    };
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, error: 'Failed to get user' };
  }
}
