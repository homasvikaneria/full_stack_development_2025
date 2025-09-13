// 01.api_routes/src/app/api/companies/count/route.js
import { dbConnect } from "../../../../lib/mongose";
import Company from "../../../../../models/Company";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const location = url.searchParams.get("location");

    if (location) {
      // Count only companies at a specific location
      const count = await Company.countDocuments({ location });

      return new Response(
        JSON.stringify({ location, count }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Total number of companies
    const totalCount = await Company.countDocuments();

    // Optional: counts by location
    const countsByLocation = await Company.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } },
      { $project: { _id: 0, location: "$_id", count: 1 } },
    ]);

    return new Response(
      JSON.stringify({
        total: totalCount,
        countsByLocation,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error counting companies:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
