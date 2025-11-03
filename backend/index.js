import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import { APP_PORT, API_TOKEN_SECRET } from "./config.js";
import session from "express-session";
import { userRoute } from "./src/routes/userRoute.js";
import { categoryRoute } from "./src/routes/categoryRoute.js";
import { productRoute } from "./src/routes/productRoute.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(
	cors({
		// Permitimos todas las conexiones de cualquier ip:puerto
		origin: ['http://localhost:3001', 'http://localhost:3000'],
		credentials: true,
		// Decidimos cuales metodos son permitidos
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	})
);

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: API_TOKEN_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 24 * 60 * 60 * 1000 // 24 hours
		}
	})
);

app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

app.listen(APP_PORT, () => {
	console.log(`Server running at http://localhost:${APP_PORT}`);
});
