import { config } from "dotenv";
config();

export default {
    MONGODB_URI:   process.env.MONGODB_URI || "mongodb://localhost/apicompany",
    cloud_name: process.env.CLUD_NAME,
    api_key: process.env.CLUD_KEY,
    api_secret: process.env.CLUD_SECRET,
    JSON_SECRET: process.env.JSON_SECRET
};
