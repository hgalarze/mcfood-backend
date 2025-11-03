import { config } from "dotenv";

config();

export const APP_PORT = process.env.APP_PORT || 3001;
export const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
export const API_TOKEN_SECRET = process.env.API_TOKEN_SECRET;