import Experience from "../model/Experience.js";

// Submit a new experience (Public)
export const submitExperience = async (req, res) => {
  try {
    const {
      name,
      email,
      designation,
      rating,
      likedMost,
      howHelped,
      feedback,
      canShow,
      displayPreference,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !designation ||
      !rating ||
      !likedMost ||
      !howHelped ||
      !feedback
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create new experience
    const newExperience = new Experience({
      name,
      email,
      designation,
      rating,
      likedMost,
      howHelped,
      feedback,
      canShow: canShow !== undefined ? canShow : true,
      displayPreference: displayPreference || "anonymous",
      // isApproved will use model default (true) for instant display
    });

    await newExperience.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your experience has been submitted and is pending approval.",
      data: newExperience,
    });
  } catch (err) {
    console.error("Error submitting experience:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit experience",
      error: err.message,
    });
  }
};

// Get all approved experiences (Public)
export const getApprovedExperiences = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // Fetch only approved and showable experiences
    const experiences = await Experience.find({
      isApproved: true,
      canShow: true,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-email -__v"); // Don't expose email to public

    // Filter based on display preference
    const filteredExperiences = experiences.map((exp) => {
      const expObj = exp.toObject();

      if (expObj.displayPreference === "anonymous") {
        return {
          ...expObj,
          name: "Anonymous User",
          designation: "DevElevate User",
        };
      } else if (expObj.displayPreference === "nameOnly") {
        return {
          ...expObj,
          designation: "DevElevate User",
        };
      }

      // nameAndDesignation - show both
      return expObj;
    });

    const total = await Experience.countDocuments({
      isApproved: true,
      canShow: true,
    });

    res.status(200).json({
      success: true,
      data: filteredExperiences,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching approved experiences:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error: err.message,
    });
  }
};

// Get all experiences (Admin only)
export const getAllExperiences = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const experiences = await Experience.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Experience.countDocuments();

    res.status(200).json({
      success: true,
      data: experiences,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching all experiences:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error: err.message,
    });
  }
};

// Approve an experience (Admin only)
export const approveExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isApproved must be a boolean value",
      });
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Experience ${isApproved ? "approved" : "unapproved"} successfully`,
      data: experience,
    });
  } catch (err) {
    console.error("Error approving experience:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update experience",
      error: err.message,
    });
  }
};
