import { NextResponse } from 'next/server';
import { getServicesCollection } from '@/lib/mongodb';

// GET single service by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const servicesCollection = await getServicesCollection();
    const service = await servicesCollection.findOne({ slug });
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
