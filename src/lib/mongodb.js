const clientPromise = require('./dbConnect');

const DB_NAME = 'carexyz';

// Get database instance
export async function getDatabase() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Collection getters
export async function getServicesCollection() {
  const db = await getDatabase();
  return db.collection('services');
}

export async function getReviewsCollection() {
  const db = await getDatabase();
  return db.collection('reviews');
}

export async function getLocationsCollection() {
  const db = await getDatabase();
  return db.collection('locations');
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection('users');
}

export async function getBookingsCollection() {
  const db = await getDatabase();
  return db.collection('bookings');
}

export async function getDivisionsCollection() {
  const db = await getDatabase();
  return db.collection('divisions');
}
