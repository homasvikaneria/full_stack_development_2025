// 01.api_routes/src/app/api/companies/route.js
import { dbConnect } from "../../../lib/mongose";
import Company from "../../../../models/Company";

// Helper to safely convert _id to string
const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

export async function GET(req) {
  try {
    await dbConnect();

    // Optional pagination query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10; // default limit

    const companies = await Company.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const companiesWithId = companies.map(convertId);

    return new Response(JSON.stringify(companiesWithId), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching companies:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 🆕 Add this POST handler:
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // Basic validation
    if (!body.name || !body.location) {
      return new Response(JSON.stringify({ error: "name and location are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create new company doc
    const newCompany = await Company.create(body);

    // Convert to plain object and string _id
    const companyPlain = newCompany.toObject();
    const companyWithId = convertId(companyPlain);

    return new Response(JSON.stringify(companyWithId), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating company:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
