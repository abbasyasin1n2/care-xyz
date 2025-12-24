import { NextResponse } from 'next/server';
import { getServicesCollection } from '@/lib/mongodb';

// GET all services
export async function GET(request) {
  try {
    const servicesCollection = await getServicesCollection();
    const services = await servicesCollection.find({ status: 'active' }).toArray();
    
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
