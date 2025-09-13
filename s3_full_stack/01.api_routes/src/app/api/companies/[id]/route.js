// src/app/api/companies/[id]/route.js
import { dbConnect } from "../../../../lib/mongose";
import Company from "../../../../../models/Company";

const convertId = (doc) => ({ ...doc, _id: doc._id.toString() });

/** GET /api/companies/[id] */
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const company = await Company.findById(id).lean();
    if (!company) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(convertId(company)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching company:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/** PUT /api/companies/[id] */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return new Response(JSON.stringify({ error: "No fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $set: body },
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
    console.error("Error updating company:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/** DELETE /api/companies/[id] */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedCompany = await Company.findByIdAndDelete(id).lean();
    if (!deletedCompany) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Company deleted successfully",
        deletedId: id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error deleting company:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
