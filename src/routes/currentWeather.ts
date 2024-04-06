import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/current", async (req, res) => {
  const location = req.query.q ?? "12,-11";
  const url = `${process.env.WAETHER_STACK_BASE_URL}current.json?key=${process.env.WEATHER_STACK_KEY}&q=${location}`;
  console.log({ url });
  try {
    const response = await axios.get(url);
    console.log({ response });
    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      data: "Somthing went wrong",
    });
  }
});

export default router;
