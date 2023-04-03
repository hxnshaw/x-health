require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const port = 1212;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

//MOUNT ROUTERS
const userRouter = require("./routes/user");
const patientRouter = require("./routes/patient");

app.use("/api/v1/health", userRouter);
app.use("/api/v1/health", patientRouter);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.authenticate();
  console.log(`Database Connected`);
});
