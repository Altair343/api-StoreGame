import { config } from "dotenv";
config();

export default {
    MONGODB_URI:   process.env.MONGODB_URI || "mongodb://localhost/apicompany",
    CLUD_NAME: process.env.CLUD_NAME,
    CLUD_KEY: process.env.CLUD_KEY,
    CLUD_SECRET: process.env.CLUD_SECRET,
    JSON_SECRET: process.env.JSON_SECRET
};
