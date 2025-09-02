import { Job } from "../models/jobmodel.js";
import mongoose from "mongoose";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      budget,
      duration,
      location,
      jobType,
      position,
    } = req.body;

    const userId = req.id;

    // validation
    if (
      !title ||
      !description ||
      !requirements ||
      !budget ||
      !duration ||
      !location ||
      !jobType ||
      !position
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // comma separated
      budget, // store budget as number
      duration, // e.g. "2 hours" / "1 day"
      location,
      jobType, // microjob category
      position,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();
    let query = {};

    if (keyword && keyword.length > 0) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query)
      .populate("company")
      .populate("created_by", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing Job ID",
        success: false,
      });
    }

    const job = await Job.findById(id)
      .populate("applications")
      .populate("created_by", "fullname email phoneNumber"); // <-- use 'name', not 'fullname'

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
