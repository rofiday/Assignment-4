require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  cors({
    origin: process.env.APP_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  res.status(200).send("test");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
