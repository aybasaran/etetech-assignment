import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8080,
  mongoDbConfig: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/etetech",
  },
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  loggingLevel: process.env.LOGGING_LEVEL || "dev",
};
