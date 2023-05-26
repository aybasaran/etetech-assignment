import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8080,
  mongoDbConfig: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/etetech",
  },
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  loggingLevel: process.env.LOGGING_LEVEL || "dev",
  jwtSecret:
    process.env.JWT_SECRET ||
    "854ca68f76dd3752406a290f74e8d9f63bbccaa56776ba11328a0f818e7668f64db3835ab34e810b0326fadce52defe1804243a4ce73d47afab68f9e2a372186",
};
