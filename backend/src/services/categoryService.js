import Category from "../models/categoryModel.js";

export const getCategoriesService = async () => {
    const categories = await Category.find();

    if (categories.length === 0) {
        const error = new Error("There are no categories");
        error.statusCode = 204; // Not Content
        throw error;
    }

    return categories;
};

export const getCategoryByIdService = async (categoryId) => {
    const category = await Category.findById(categoryId);

    if (!category) {
        const error = new Error(`There are no category by id ${id}`);
        error.statusCode = 404; // Not Found
        throw error;
    }

    return category;
};

export const createCategoryService = async (categoryData) => {
    const categoryExists = await Category.findOne({ name: categoryData.name });

    if (categoryExists) {
        throw new Error("Category with this name aready exists");
    }

    const newCategory = new Category(categoryData);
    await newCategory.save();

    return { message: "Category created" };
};

export const updateCategoryService = async (categoryId, updateData) => {
    await getCategoryByIdService(categoryId);

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const updatedCategory = await Category.findByIdAndUpdate(
        { _id: categoryId },
        updateData,
        { new: true }
    );

    return updatedCategory;
};

export const patchCategoryService = async (categoryId, updateData) => {
    await getCategoryByIdService(categoryId);

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const patchedCategory = await Category.findByIdAndUpdate(
        { _id: categoryId },
        updateData,
        { new: true }
    );

    return patchedCategory;
};

export const deleteCategoryService = async (categoryId) => {
    // Validar
    await getCategoryByIdService(categoryId);

    await Category.findByIdAndDelete(categoryId);
    return { message: "Category deleted succesfully" };
};

export const deleteUserService = async (userId) => {
    // Validar
    await getUserByIdService(userId);

    await User.findByIdAndDelete(userId);
    return { message: "User deleted succesfully" };
};

export const searchCategoryService = async (params) => {
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
            { name: nameTerms },
            { description: nameTerms },
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
        Category.find(finalFilter).sort(sortObj).skip(skip).limit(sizeNum).lean(),
        Category.countDocuments(finalFilter),
    ]);

    return {
        page: pageNum,
        pageSize: sizeNum,
        total,
        pages: Math.ceil(total / sizeNum),
        items,
    };
};