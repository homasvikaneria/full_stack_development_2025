// 01.api_routes/src/app/api/companies/paginate/route.js
import { dbConnect } from "../../../../lib/mongose";
import Company from "../../../../../models/Company";

const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Fetch total count for meta info
    const total = await Company.countDocuments();

    const companies = await Company.find({})
      .skip(skip)
      .limit(limit)
      .lean();

    const companiesWithId = companies.map(convertId);

    // Add metadata
    const responseBody = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: companiesWithId,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching paginated companies:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
