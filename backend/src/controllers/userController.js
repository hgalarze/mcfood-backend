import {
	getUserByIdService,
	getUsersService,
	createUserService,
	updateUserService,
	patchUserService,
	deleteUserService,
    searchUsersService,
	validateUserService,
} from "../services/userService.js";

export const getUsers = async (req, res) => {
	try {
		const users = await getUsersService();
		res.status(200).json(users);
	} catch (error) {
		if (error.statusCode === 204) {
			return res.sendStatus(error.statusCode);
		}

		return res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

export const getUserById = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await getUserByIdService(userId);
		res.status(200).json(user);
	} catch (error) {
		if (error.statusCode === 204) {
			return res.sendStatus(error.statusCode);
		}

		return res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

export const createUser = async (req, res) => {
	try {
		const response = await createUserService(req.body);
		res.status(201).json(response);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		// Siempre que editamos necesitamos el id y los nuevos datos
		const updatedUser = await updateUserService(userId, req.body);

		return res.status(201).json(updatedUser);
	} catch (error) {
		if (error.statusCode === 404) {
			return res.status(404).json({ message: error.message });
		}
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const patchUser = async (req, res) => {
	try {
		const userId = req.params.id;
		// Siempre que editamos necesitamos el id y los nuevos datos
		const patchedUser = await patchUserService(userId, req.body);

		return res.status(201).json(patchedUser);
	} catch (error) {
		if (error.statusCode === 404) {
			return res.status(404).json({ message: error.message });
		}
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		// Obtenemos x el path param el id
		// api/user/delete/:id
		const userId = req.params.id;
		const result = await deleteUserService(userId);
		return res.status(200).json(result);
	} catch (error) {
		if (error.statusCode === 404) {
			return res
				.status(error.statusCode)
				.json({ message: error.message });
		}
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const searchUsers = async (req, res) => {
	try {
		const result = await searchUsersService(req.query);
		res.json(result);
	} catch (error) {
		if (error.statusCode === 404) {
			return res
				.status(error.statusCode)
				.json({ message: error.message });
		}
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const validate = async (req, res) => {
	try {
		const { email, password } = req.body;
		const result = await validateUserService(email, password);

		if (!result?.token) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		res.cookie("authtoken", result.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		return res.status(200).json(result);
	} catch (error) {
		if (error.statusCode === 400) {
			return res
				.status(error.statusCode)
				.json({ message: error.message });
		}
		return res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};
