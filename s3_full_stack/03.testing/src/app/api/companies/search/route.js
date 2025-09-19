// full_stack_development_2025/s3_full_stack/03.testing/src/app/api/companies/search/route.js
// 03.testing/src/app/api/companies/search/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const location = url.searchParams.get('location');
    const skill = url.searchParams.get('skill');

    const client = await clientPromise;


    // explicitly select the right DB and collection
    const db = client.db('test');            // <-- your DB
    const coll = db.collection('companies'); // <-- your collection


    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, 'i') };
    if (location) filter.location = { $regex: new RegExp(location, 'i') };
    if (skill) filter['hiringCriteria.skills'] = { $in: [skill] };

    const items = await coll.find(filter).limit(50).toArray();
    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/search error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
