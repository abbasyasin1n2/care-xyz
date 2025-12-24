import { NextResponse } from 'next/server';
import { getReviewsCollection } from '@/lib/mongodb';

// GET all reviews
export async function GET(request) {
  try {
    const reviewsCollection = await getReviewsCollection();
    const reviews = await reviewsCollection
      .find({})
      .sort({ date: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
