// 01.api_routes/src/app/api/companies/[id]/push-round/route.js
import { dbConnect } from "../../../../../lib/mongose";
import Company from "../../../../../../models/Company";

const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    // Basic validation
    if (
      !body ||
      typeof body.round === "undefined" ||
      typeof body.type !== "string"
    ) {
      return new Response(
        JSON.stringify({ error: "round and type are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Push the new interview round
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $push: { interviewRounds: { round: body.round, type: body.type } } },
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
    console.error("Error pushing interview round:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
