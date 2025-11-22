import express from "express";
import Subscriber from "../model/Subscriber.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(200).json({ message: "Already subscribed" });
    }
    await Subscriber.create({ email });
    res.json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
