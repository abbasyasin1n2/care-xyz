import { getDatabase } from './mongodb';
import servicesData from '@/data/services.json';
import reviewsData from '@/data/reviews.json';
import locationsData from '@/data/locations.json';
import divisionsData from '@/data/divisions.json';

export async function seedDatabase() {
  try {
    const db = await getDatabase();

    console.log('🌱 Starting database seeding...');

    // Drop existing collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (collectionNames.includes('services')) {
      await db.collection('services').drop();
      console.log('✅ Dropped services collection');
    }
    if (collectionNames.includes('reviews')) {
      await db.collection('reviews').drop();
      console.log('✅ Dropped reviews collection');
    }
    if (collectionNames.includes('locations')) {
      await db.collection('locations').drop();
      console.log('✅ Dropped locations collection');
    }
    if (collectionNames.includes('divisions')) {
      await db.collection('divisions').drop();
      console.log('✅ Dropped divisions collection');
    }

    // Seed Services
    const servicesCollection = db.collection('services');
    await servicesCollection.insertMany(servicesData);
    console.log(`✅ Inserted ${servicesData.length} services`);

    // Seed Reviews
    const reviewsCollection = db.collection('reviews');
    const reviewsWithDates = reviewsData.map(review => ({
      ...review,
      date: new Date(review.date)
    }));
    await reviewsCollection.insertMany(reviewsWithDates);
    console.log(`✅ Inserted ${reviewsData.length} reviews`);

    // Seed Locations
    const locationsCollection = db.collection('locations');
    await locationsCollection.insertMany(locationsData);
    console.log(`✅ Inserted ${locationsData.length} locations`);

    // Seed Divisions
    const divisionsCollection = db.collection('divisions');
    const divisionsDocuments = divisionsData.map(division => ({ name: division }));
    await divisionsCollection.insertMany(divisionsDocuments);
    console.log(`✅ Inserted ${divisionsData.length} divisions`);

    // Create indexes for better query performance
    await servicesCollection.createIndex({ slug: 1 }, { unique: true });
    await servicesCollection.createIndex({ status: 1 });
    await locationsCollection.createIndex({ division: 1, district: 1 });
    await reviewsCollection.createIndex({ date: -1 });
    console.log('✅ Created indexes');

    console.log('🎉 Database seeding completed successfully!');

    return {
      success: true,
      message: 'Database seeded successfully',
      data: {
        services: servicesData.length,
        reviews: reviewsData.length,
        locations: locationsData.length,
        divisions: divisionsData.length
      }
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
