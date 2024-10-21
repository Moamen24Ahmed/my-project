const Category = require('../models/CategoryModel');

// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.find();

//         return res.json(products);
//     } catch (error) {
//         return res.status(404).json({ message: error.message });
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const { productId } = req.params;

//         const productExists = await Product.findById(productId);

//         if (!productExists) return res.status(404).json({ message: 'Product not found!' });

//         return res.json(productExists);
//     } catch (error) {
//         return res.status(404).json({ message: error.message });
//     }
// };

// exports.getProductsByCategoryId = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         const products = await Product.find({ category: categoryId });

//         return res.json(products);
//     } catch (error) {
//         return res.status(404).json({ message: error.message });
//     }
// };

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        let catExists = await Category.findOne({ name });

        if (catExists) return res.status(400).json({ message: 'Category already exists!' });

        catExists = new Category({ name });

        await catExists.save();

        return res.status(201).json(catExists);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};