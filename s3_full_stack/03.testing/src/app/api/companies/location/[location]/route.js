// s3_full_stack/03.testing/src/app/api/companies/location/[location]/route.js
import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { location } = params;

    if (!location) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');                // your DB name
    const coll = db.collection('companies');     // your collection name

    // Case-insensitive regex to match location
    const companies = await coll.find({
      location: { $regex: `^${location}$`, $options: 'i' }
    }).toArray();

    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error(`GET /api/companies/by-location/${params.location} error:`, err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
