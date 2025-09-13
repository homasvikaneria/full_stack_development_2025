// 01.api_routes/src/app/api/companies/search/route.js
import { dbConnect } from "../../../../lib/mongose";
import Company from "../../../../../models/Company";

const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const city = url.searchParams.get("city");
    const minBase = parseFloat(url.searchParams.get("minBase"));
    const skill = url.searchParams.get("skill");

    // Build Mongo query dynamically
    const query = {};

    if (city) {
      query.location = city;
    }

    if (!isNaN(minBase)) {
      query["salaryBand.base"] = { $gte: minBase };
    }

    if (skill) {
      query.skills = skill; // matches if skill exists in array
    }

    const companies = await Company.find(query).lean();
    const companiesWithId = companies.map(convertId);

    return new Response(JSON.stringify(companiesWithId), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error searching companies:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
