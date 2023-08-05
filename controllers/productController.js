const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');


const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({}).populate('reviews');
    res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId }).populate('reviews');
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}

const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    res.status(StatusCodes.OK).json(product)
}

const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    const deletedProduct = await product.remove();
    res.status(StatusCodes.OK).json({ msg: `'${deletedProduct.name}' deleted.` })
}

const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No file Uploaded")
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image file');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image small than 1MB');
    }
    const imagePath = path.join(__dirname, `../public/uploads/${req.user.role}/${Date.now()}_${productImage.name}`)
    console.log(imagePath)
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${req.user.role}/${imagePath.split('\\').pop()}` })
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}