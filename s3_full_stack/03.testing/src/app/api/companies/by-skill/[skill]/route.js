// s3_full_stack/03.testing/src/app/api/companies/by-skill/[skill]/route.js
import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { skill } = params;

    if (!skill) {
      return NextResponse.json({ error: 'Skill is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');               
    const coll = db.collection('companies');     

    const companies = await coll.find({
      'hiringCriteria.skills': { $regex: skill, $options: 'i' }
    }).toArray();

    return NextResponse.json(companies, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/by-skill/:skill error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
