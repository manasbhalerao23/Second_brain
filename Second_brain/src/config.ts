import mongoose from "mongoose";

export const JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL as string);


