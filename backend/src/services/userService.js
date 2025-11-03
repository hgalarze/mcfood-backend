import { API_TOKEN_SECRET } from "../../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const getUsersService = async () => {
	const users = await User.find();

	if (users.length === 0) {
		const error = new Error("There are no users");
		error.statusCode = 204; // Not Content
		throw error;
	}

	return users;
};

export const getUserByIdService = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		const error = new Error(`There are no user by id ${id}`);
		error.statusCode = 404; // Not Found
		throw error;
	}

	return user;
};

export const createUserService = async (userData) => {
	const userExists = await User.findOne({ email: userData.email });

	if (userExists) {
		throw new Error("User with this email aready exists");
	}
	// Creamos el user
	const newUser = new User(userData);
	// Save
	await newUser.save();

	return { message: "User created" };
};

export const updateUserService = async (userId, updateData) => {
	await getUserByIdService(userId);

	// new true devuelve el documento modificado y actualizado
	// Si no lo pones te devuelve el documento viejo
	const updatedUser = await User.findByIdAndUpdate(
		{ _id: userId },
		updateData,
		{ new: true }
	);

	return updatedUser;
};

export const patchUserService = async (userId, updateData) => {
	await getUserByIdService(userId);

	// new true devuelve el documento modificado y actualizado
	// Si no lo pones te devuelve el documento viejo
	const patchedUser = await User.findByIdAndUpdate(
		{ _id: userId },
		updateData,
		{ new: true }
	);

	return patchedUser;
};

export const deleteUserService = async (userId) => {
	// Validar
	await getUserByIdService(userId);

	await User.findByIdAndDelete(userId);
	return { message: "User deleted succesfully" };
};

export const searchUsersService = async (params) => {
	const {
		query,
		page = 1,
		pageSize = 20,
		sort = "createdAt:desc",
	} = params ?? {};

	// --- Utils ---------------------------------------------------------------
	const q = typeof query === "string" ? query.trim() : "";
	const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	// contains case-insensitive; “foo bar” => /foo.*bar/i
	const containsRegex = (s) =>
		new RegExp(escapeRegex(s).replace(/\s+/g, ".*"), "i");

	// “todos los términos presentes” (orden libre) para nombres/apellidos
	const allTermsRegex = (s) => {
		const terms = s
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.map((t) => `(?=.*${escapeRegex(t)})`)
			.join("");
		return new RegExp(`^${terms}.*$`, "i");
	};

	// Fuzzy teléfonos: “123 45-67” => /1\D*2\D*3\D*4\D*5\D*6\D*7/i
	const phoneRegex = (s) => {
		const digits = (s.match(/\d/g) || []).join("");
		return digits ? new RegExp(digits.split("").join("\\D*"), "i") : null;
	};

	// --- Filtro fuzzy por `query` --------------------------------------------
	let finalFilter = {};
	if (q) {
		const nameTerms = allTermsRegex(q);
		const pr = phoneRegex(q);

		const or = [
			{ email: containsRegex(q) },
			{ firstName: nameTerms },
			{ lastName: nameTerms },
			{ address: containsRegex(q) },
		];

		if (pr) or.push({ phone: pr });

		finalFilter = { $or: or };
	}

	// --- Orden / Paginación --------------------------------------------------
	const [sortField, sortDir] = String(sort).split(":");
	const sortObj = { [sortField || "createdAt"]: sortDir === "asc" ? 1 : -1 };

	const pageNum = Math.max(parseInt(String(page), 10) || 1, 1);
	const sizeNum = Math.min(Math.max(parseInt(String(pageSize), 10) || 20, 1), 100);
	const skip = (pageNum - 1) * sizeNum;

	// --- Query ---------------------------------------------------------------
	const [items, total] = await Promise.all([
		User.find(finalFilter).sort(sortObj).skip(skip).limit(sizeNum).lean(),
		User.countDocuments(finalFilter),
	]);

	return {
		page: pageNum,
		pageSize: sizeNum,
		total,
		pages: Math.ceil(total / sizeNum),
		items,
	};
};


export const validateUserService = async (email, password) => {

	// Validar que ambos campos existan y sean correctos
	if (!(email && password)) {
		const error = new Error("There's a missing field");
		error.statusCode = 400;
		throw error;
	}

	// El email es unico y es un identificador de usuario
	const userFound = await User.findOne({ email });

	if (!userFound) {
		const error = new Error("User or password are incorrect");
		error.statusCode = 400;
		throw error;
	}

	// Comparamos la password que llega contra la guardada en la db
	// Toma la contraseña del cliente la encripta y la compara contra la guardada (encriptada)
	if (!bcrypt.compareSync(password, userFound.passwordHash)) {
		const error = new Error("User or password are incorrect");
		error.statusCode = 400;
		throw error;
	}

	// Generamos el payload
	// Es la informacion que guardamos en el token
	const payload = {
		userId: userFound._id,
		userEmail: userFound.email,
	};

	// El token debe ser firmado para tener validez
	// Firma tiene: 1. payload, 2. "secret", 3. duracion
	const token = jwt.sign(payload, API_TOKEN_SECRET, { expiresIn: "1h" });

	return { message: "Logged in", token };
};
