import mongoose, { Mongoose } from "mongoose";
import Product from "../models/productModel.js";

export const getProductsService = async () => {
    const products = await Product.find();

    if (products.length === 0) {
        const error = new Error("There are no products");
        error.statusCode = 204; // Not Content
        throw error;
    }

    return products;
};

export const getProductByIdService = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        const error = new Error(`There are no product by id ${productId}`);
        error.statusCode = 404; // Not Found
        throw error;
    }

    return product;
};

export const getProductsByCategoryIdService = async (categoryId) => {
    const products = await Product.find({ category: categoryId });

    if (!products) {
        const error = new Error(`There are no products by category id ${categoryId}`);
        error.statusCode = 404; // Not Found
        throw error;
    }

    return products;
};

export const createProductService = async (productData) => {
    const productExists = await Product.findOne({ name: productData.name });

    if (productExists) {
        throw new Error("Product with this name aready exists");
    }

    const newProduct = new Product(
        {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            imageUrl: productData.imageUrl,
            highlighted: productData.highlighted,
            category: productData.categoryId
        }
    );
    await newProduct.save();

    return { message: "Product created" };
};

export const updateProductService = async (productId, updateData) => {
    await getProductByIdService(productId);

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: productId},
        {
            name: updateData.name,
            description: updateData.description,
            price: updateData.price,
            stock: updateData.stock,
            imageUrl: updateData.imageUrl,
            highlighted: updateData.highlighted,
            category: updateData.categoryId
        },
        { new: true }
    );

    return updatedProduct;
};

export const patchProductService = async (productId, updateData) => {
    await getProductByIdService(productId);

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const patchedproduct = await Product.findByIdAndUpdate(
        { _id: productId },
        {
            name: updateData.name,
            description: updateData.description,
            price: updateData.price,
            stock: updateData.stock,
            imageUrl: updateData.imageUrl,
            highlighted: updateData.highlighted,
            category: updateData.categoryId
        },
        { new: true }
    );

    return patchedproduct;
};

export const deleteProductService = async (productId) => {
    // Validar
    await getProductByIdService(productId);

    await Product.findByIdAndDelete(productId);
    return { message: "Product deleted succesfully" };
};

export const searchProductService = async (params) => {
    const {
        query,
        page = 1,
        pageSize = 20,
        sort = "createdAt:desc",
    } = params ?? {};

    // --- Utils ---------------------------------------------------------------
    const q = typeof query === "string" ? query.trim() : "";
    const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // “todos los términos presentes” (orden libre) para name/description
    const allTermsRegex = (s) => {
        const terms = s
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((t) => `(?=.*${escapeRegex(t)})`)
            .join("");
        return new RegExp(`^${terms}.*$`, "i");
    };

    // --- Filtro fuzzy por `query` --------------------------------------------
    let finalFilter = {};
    if (q) {
        const nameTerms = allTermsRegex(q);

        const or = [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } }
        ];

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
        Product.find(finalFilter).sort(sortObj).skip(skip).limit(sizeNum).lean(),
        Product.countDocuments(finalFilter),
    ]);
    
    return {
        page: pageNum,
        pageSize: sizeNum,
        total,
        pages: Math.ceil(total / sizeNum),
        items,
    };
};

export const getHighlightedProductsService = async (maxItems) => {
    const products = await Product.find({ highlighted: true }).limit(parseInt(maxItems));

    if (!products) {
        const error = new Error(`There are no products highlighted`);
        error.statusCode = 404; // Not Found
        throw error;
    }

    return products;
};