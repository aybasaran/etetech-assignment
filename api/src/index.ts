import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { connectToDb } from "./utils/db";

// routes
import CompanyRouter from "./routes/company.route";
import ProductRouter from "./routes/product.route";

const app: Express = express();

const PORT = config.get<number>("port");
const CLIENT_URL = config.get<string>("clientUrl");
const LOGGING_LEVEL = config.get<string>("loggingLevel");

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan(LOGGING_LEVEL));
app.use(cookieParser());

app.use("/api/company", CompanyRouter);
app.use("/api/product", ProductRouter);

connectToDb()
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  });
