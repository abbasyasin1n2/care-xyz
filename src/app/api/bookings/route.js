import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getBookingsCollection } from '@/lib/mongodb';

// GET user's bookings
export async function GET(request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bookingsCollection = await getBookingsCollection();
    const bookings = await bookingsCollection
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      bookings: bookings.map(booking => ({
        ...booking,
        _id: booking._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST create new booking
export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to create a booking.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, serviceName, location, durationType, duration, address, totalCost, pricePerUnit } = body;

    // Validation
    if (!serviceId || !serviceName || !location || !durationType || !duration || !address || !totalCost) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!location.division || !location.district || !location.city || !location.area) {
      return NextResponse.json(
        { error: 'Complete location information is required' },
        { status: 400 }
      );
    }

    const bookingsCollection = await getBookingsCollection();
    
    const newBooking = {
      userId: session.user.id || session.user.email,
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      serviceName,
      location,
      durationType,
      duration,
      address,
      totalCost,
      pricePerUnit,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await bookingsCollection.insertOne(newBooking);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        ...newBooking,
        _id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
