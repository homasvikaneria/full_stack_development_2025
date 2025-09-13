// 01.api_routes/src/app/api/companies/[id]/add-benefits/route.js
import { dbConnect } from "../../../../../lib/mongose";
import Company from "../../../../../../models/Company";

const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    if (!body.benefit) {
      return new Response(JSON.stringify({ error: "benefit is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use $addToSet to avoid duplicates; replace with $push if you want duplicates
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $addToSet: { benefits: body.benefit } },
      { new: true, lean: true }
    );

    if (!updatedCompany) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(convertId(updatedCompany)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error adding benefit:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
