// s3_full_stack/03.testing/src/app/api/companies/headcount-range/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const min = parseInt(url.searchParams.get('min')) || 0;  
    const max = parseInt(url.searchParams.get('max'));      
    const filter = {
      headcount: {
        $gte: min, 
        ...(max ? { $lte: max } : {}), 
      },
    };

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test');                  
    const coll = db.collection('companies');       

    // Fetch companies matching the filters
    const companies = await coll.find(filter).toArray();

    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/headcount-range error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
