const Cart = require('../models/CartModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

// Get all carts 'orders' by user id
exports.getAllCartsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const userExists = await User.findById(userId);

        if (!userExists) return res.status(404).json({ message: 'User not found!' });

        const userCarts = await Cart.find({ user: userId }).populate('products.productId');

        return res.json(userCarts);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

// Get cart by id and user id
exports.getCartByIdAndUserId = async (req, res) => {
    try {
        const { cartId, userId } = req.params;
        console.log(req.params);

        const userExists = await User.findById(userId);

        if (!userExists) return res.status(404).json({ message: 'User not found!' });

        const cartExists = await Cart.findOne({ _id: cartId, user: userId }).populate('products.productId');

        if (!cartExists) return res.status(404).json({ message: 'Cart not found!' });

        return res.json(cartExists);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

// Create a new cart 'order'
exports.createCart = async (req, res) => {
    try {
        const { user, totalPrice, products } = req.body;

        const userExists = await User.findById(user);

        if (!userExists) return res.status(404).json({ message: 'User not found!' });

        for (let i = 0; i < products.length; i++) {
            const productExists = await productAvailability(products[i], i);
            if (!productExists.status) return res.status(404).json({ message: productExists.message });
        }

        for (let i = 0; i < products.length; i++) {
            await reduceProductQuantity(products[i]);
        }

        const cart = new Cart({ user, totalPrice, products });

        const newCart = await cart.save();

        return res.status(201).json(newCart);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

async function productAvailability(productData, index) {
    const { productId, quantity } = productData;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) return { message: `Product No.${index + 1} not found!`, status: false };

    if (existingProduct.quantity < quantity) return { message: `Product No.${index + 1} not available!`, status: false };

    return { message: '', status: true };
}

async function reduceProductQuantity(productData) {
    const { productId, quantity } = productData;

    const existingProduct = await Product.findById(productId);

    existingProduct.quantity -= quantity;

    await existingProduct.save();
}