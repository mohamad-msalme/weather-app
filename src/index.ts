import "./env";
import hbs from "hbs";
import GeoCooding from "./routes/geoCoding";
import CurrentWeatherRoute from "./routes/currentWeather";
import { PUBLIC_PATH, VIEWS_PATH, PARTIALS_PATH } from "./constants";
import express, { Request, Response, NextFunction } from "express";

const cookieParser = require("cookie-parser");

const app = express();
hbs.registerPartials(PARTIALS_PATH);
const main = () => {
  app.use(cookieParser("mysecret"));
  app.use(express.static(PUBLIC_PATH));
  app.use(express.json({ type: "application/json" }));
  app.use(express.raw({ type: "application/octet-stream" }));
  app.use(express.text({ type: "text/plain" }));

  app.set("view engine", "hbs");
  app.set("views", VIEWS_PATH);
  // Routes
  app.get("/", (req, res, next) => {
    console.log({ reqApp: req.baseUrl });
    res.render("index", { title: "Home" });
  });
  app.get("/about", (req, res) => {
    console.log({ reqApp: req.baseUrl, matched: req.app.mountpath });

    res.render("about", { title: "about" });
  });
  app.get("/help", (req, res) => {
    res.render("help", { title: "help" });
  });

  app.use("/weather", CurrentWeatherRoute);

  app.use("/geocooding", GeoCooding);

  app.use((req, res, next) => {
    res.render("404", { errorMessage: "Page Not found" });
  });

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.message, err.stack, err.name);
    console.log({ err });
    res.status(500).send("Something broke!");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
};

export default app;

main();
