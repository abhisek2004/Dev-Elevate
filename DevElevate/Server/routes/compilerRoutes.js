import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  let { source_code, language_id, stdin, is_base64 } = req.body;
  if (is_base64) {
    source_code = Buffer.from(source_code, "base64").toString("utf-8");
  }
  try {
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "content-type": "application/json",
        },
      }
    );
    const result = submission.data;
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
