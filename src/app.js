const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "L8 CSAT/NPS API is running"
  });
});
app.get("/test-route", (req, res) => {
  res.json({ message: "Route hoat dong" });
});
const surveyRoutes = require("./routes/survey.routes");
app.use("/api/surveys", surveyRoutes);
console.log("Survey routes đã được đăng ký");

module.exports = app;