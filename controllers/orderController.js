const Product = require('../models/Product')
const Order = require('../models/Order')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')


const fakeStringAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue'
    return { client_secret, amount }
}

const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shopping fee');
    }
    let orderItems = []
    let subTotal = 0;
    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id : ${item.product}`)
        }
        const { name, price, image, _id } = dbProduct;
        console.log(price)
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id
        };
        //add item to order
        orderItems.push(singleOrderItem)
        //calculate subtotal
        subTotal += item.amount * price;
    }
    //calculate total
    const total = tax + shippingFee + subTotal
    const paymentIntentId = await fakeStringAPI({
        amount: total,
        currency: 'usd'
    });
    const order = await Order.create({
        orderItems,
        total,
        subTotal,
        tax,
        shippingFee,
        clientSecret: paymentIntentId.client_secret,
        user: req.user.userId
    });
    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.client_secret })
}

const getAllOrders = async (req, res) => {
    const order = await Order.find({})
    res.status(StatusCodes.OK).json({ order, count: order.length })
}

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOne({ _id: orderId });
    console.log(order);
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
    }
    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId })
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const { paymentIntentId } = req.body;

    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
    }
    checkPermissions(req.user, order.user, adminFlag = 1);
    order.paymentIntentId = paymentIntentId
    order.status = 'paid';
    await order.save();
    res.status(StatusCodes.OK).json({ order });
}

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
}