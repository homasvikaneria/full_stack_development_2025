// s3_full_stack/03.testing/src/app/api/companies/count/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name');
    const location = searchParams.get('location');
    const skill = searchParams.get('skill');

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (skill) {
      filter['hiringCriteria.skills'] = { $regex: skill, $options: 'i' };
    }

    const client = await clientPromise;
    const db = client.db('test');            
    const coll = db.collection('companies'); 

    const total = await coll.countDocuments(filter);

    return NextResponse.json({ total }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/count error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
