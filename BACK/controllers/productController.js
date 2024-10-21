const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');

        return res.json(products);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const productExists = await Product.findById(productId);

        if (!productExists) return res.status(404).json({ message: 'Product not found!' });

        return res.json(productExists);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

exports.getProductsByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId }).populate('category');

        return res.json(products);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, quantity, description, category } = req.body;

        const catExists = await Category.findById(category);

        if (!catExists) return res.status(400).json({ message: 'Category not found!' });

        const newProduct = new Product({ name, price, quantity, description, category });

        await newProduct.save();

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};