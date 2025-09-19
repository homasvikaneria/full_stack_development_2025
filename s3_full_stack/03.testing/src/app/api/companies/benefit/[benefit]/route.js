// s3_full_stack/03.testing/src/app/api/companies/benefit/[benefit]/route.js
// s3_full_stack/03.testing/src/app/api/companies/benifit/[benifit]/route.js
import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { benefit } = params;

    if (!benefit) {
      return NextResponse.json({ error: 'Benefit is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');               
    const coll = db.collection('companies');     

    // Case-insensitive regex to match benefit in the 'benefits' array
    const companies = await coll.find({
      'benefits': { $regex: benefit, $options: 'i' }
    }).toArray();

    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/benefit/:benefit error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
