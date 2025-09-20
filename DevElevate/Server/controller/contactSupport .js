import contactSupport from "../model/ContactSupport.js"

export const contact_Support_Team = async (req, res) => {
  try {
    let { name, email, message } = req.body;


    const newRequest = new contactSupport({
      name,
      email,
      
      message,
      
    });

    await newRequest.save();

    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
