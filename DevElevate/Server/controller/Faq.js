import FAQ from "../model/Faq.js"

export const postFaq = async (req, res) => {
  try {
    let { name, email, message } = req.body;


    const newRequest = new FAQ({
      name,
      email,
      message,
    });

    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:err.message });
  }
};

export const getFaq = async (req ,res) => {
  try {
    const faqs = await FAQ.find();

    return res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
