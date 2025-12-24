import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seedDatabase';

export async function GET(request) {
  // Only allow seeding in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Seeding is only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}
