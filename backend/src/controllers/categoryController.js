import {
	getCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    patchCategoryService,
    deleteCategoryService,
    searchCategoryService
} from "../services/categoryService.js";


export const getCategories = async (req, res) => {
    try {
        const result = await getCategoriesService();
        res.status(200).json(result);
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

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await getCategoryByIdService(categoryId);
        res.status(200).json(result);
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

export const createCategory = async (req, res) => {
    try {
        const result = await createCategoryService(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await updateCategoryService(categoryId, req.body);

        return res.status(201).json(result);
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ message: error.message });
        }
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

export const patchCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await patchCategoryService(categoryId, req.body);

        return res.status(201).json(result);
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ message: error.message });
        }
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await deleteCategoryService(categoryId);
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

export const searchCategories = async (req, res) => {
	try {
		const result = await searchCategoryService(req.query);
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