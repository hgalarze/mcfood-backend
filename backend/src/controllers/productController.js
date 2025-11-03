import {
	getProductsService,
    getProductByIdService,
    getProductsByCategoryIdService,
    getHighlightedProductsService,
    searchProductService,
    createProductService,
    updateProductService,
    patchProductService,
    deleteProductService
} from "../services/productService.js";

export const getProducts = async (req, res) => {
    try {
        const result = await getProductsService();
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

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await getProductByIdService(productId);
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

export const getProductsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const result = await getProductsByCategoryIdService(categoryId);
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

export const createProduct = async (req, res) => {
    try {
        const result = await createProductService(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await updateProductService(productId, req.body);

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

export const patchProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await patchProductService(productId, req.body);

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

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await deleteProductService(productId);
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

export const searchProducts = async (req, res) => {
	try {
		const result = await searchProductService(req.query);
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

export const getHighlightedProducts = async (req, res) => {
    try {
        const maxItems = req.params.maxItems;
        const result = await getHighlightedProductsService(maxItems);
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