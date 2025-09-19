// full_stack_development_2025/s3_full_stack/03.testing/src/app/api/companies/[id]/route.js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const client = await clientPromise;

    // explicitly choose the right database & collection
    const db = client.db('test');            // <-- your DB
    const coll = db.collection('companies'); // <-- your collection


    const doc = await coll.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/:id error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
