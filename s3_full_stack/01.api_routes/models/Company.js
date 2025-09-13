// 01.api_routes/models/Company.js
import mongoose from "mongoose";

const SalaryBandSchema = new mongoose.Schema({
  base: Number,
  bonus: Number,
  stock: Number,
});

const HiringCriteriaSchema = new mongoose.Schema({
  cgpa: Number,
});

const InterviewRoundSchema = new mongoose.Schema({
  round: Number,
  type: String,
});

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: String,
    salaryBand: SalaryBandSchema,
    hiringCriteria: HiringCriteriaSchema,
    skills: [String],
    experience: String,
    interviewRounds: [InterviewRoundSchema],
    benefits: [String],
    headcount: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
