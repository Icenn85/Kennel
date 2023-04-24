const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const kennelsRouter = require("./routes/api/kennels/v1/kennels.routes");
const petsRouter = require("./routes/api/pets/v1/pets.routes");
const ownersRouter = require("./routes/api/owners/v1/owners.routes");
const { authRouter } = require("./routes/api/owners/v1/auth.routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/kennels", kennelsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/owners/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

module.exports = app;
