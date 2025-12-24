import { NextResponse } from 'next/server';
import { getLocationsCollection, getDivisionsCollection } from '@/lib/mongodb';

// GET locations data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // divisions, districts, cities, areas
    const division = searchParams.get('division');
    const district = searchParams.get('district');

    if (type === 'divisions') {
      const divisionsCollection = await getDivisionsCollection();
      const divisions = await divisionsCollection.find({}).toArray();
      return NextResponse.json({ 
        success: true, 
        data: divisions.map(d => d.name) 
      });
    }

    const locationsCollection = await getLocationsCollection();

    if (type === 'districts' && division) {
      const districts = await locationsCollection
        .find({ division })
        .project({ district: 1, _id: 0 })
        .toArray();
      const uniqueDistricts = [...new Set(districts.map(d => d.district))];
      return NextResponse.json({ success: true, data: uniqueDistricts });
    }

    if (type === 'cities' && division && district) {
      const cities = await locationsCollection
        .find({ division, district })
        .project({ city: 1, _id: 0 })
        .toArray();
      const uniqueCities = [...new Set(cities.map(c => c.city))];
      return NextResponse.json({ success: true, data: uniqueCities });
    }

    if (type === 'areas' && division && district) {
      const location = await locationsCollection.findOne({ division, district });
      return NextResponse.json({ 
        success: true, 
        data: location?.areas || [] 
      });
    }

    // Return all locations
    const locations = await locationsCollection.find({}).toArray();
    return NextResponse.json({ success: true, locations });
    
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
