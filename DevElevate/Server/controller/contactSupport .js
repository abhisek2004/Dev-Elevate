import contactSupport from "../model/ContactSupport.js"

export const contact_Support_Team = async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;
    const userId =  req.user._id
 
    if (!userId) {
      return res.status(400).json({ error: "User ID (whoSend) is required" });
    }

    const newRequest = new contactSupport({
      name,
      email,
      subject,
      message,
      whoSend: userId,
    });

    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create support request" });
  }
};
