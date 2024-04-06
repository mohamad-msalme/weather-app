import axios from "axios";
import express from "express";

const router = express.Router();
async function performGeocoding(query: string, res: express.Response) {
  const url = `${process.env.GEO_CODING_BASE_URL}v1/json?q=${query}&key=0d4def8e86fa48f9906879cc958ba26e`;
  console.log({ url });
  try {
    const response = await axios.get(url);
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(500).json({ data: "Something went wrong" });
  }
}

router.get("/reverse", async (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lng;
  const query = encodeURIComponent(`${latitude},${longitude}`);
  await performGeocoding(query, res);
});

router.get("/forward", async (req, res) => {
  const city = req.query.city;
  const country = req.query.country;
  const query = encodeURIComponent(`${city}, ${country}`);
  console.log({ query });
  await performGeocoding(query, res);
});

export default router;
