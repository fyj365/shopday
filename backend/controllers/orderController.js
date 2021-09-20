const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');

// create a new order => /api/v1/order/new
exports.newOrder = catchAsynErrors( async (req, res, nex) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(), 
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})
// get a order by Id=> /api/v1/order/:id
exports.getOrder = catchAsynErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('order not found', 404))
    }
    return res.status(200).json({success: true, order }) 
})

// get logged in user orders=> /api/v1/orders
exports.getOrders = catchAsynErrors(async(req, res, next) => {
    const userId = req.user.id;
    const orders = await Order.find({user: userId})
    if(!orders){
        return next(new ErrorHandler('orders not found', 404))
    }
    return res.status(200).json({success: true, orders }) 
})
// get all orders -- admin => /api/v1/admin/orders
exports.getAllOrders = catchAsynErrors(async(req, res, next) => {
    const orders = await Order.find();
    let totalRevenue = 0;
    orders.forEach(function(order){ 
        totalRevenue = totalRevenue + order.totalPrice
    });
    if(!orders){
        return next(new ErrorHandler('orders not found', 404))
    }
    return res.status(200).json({success: true,totalRevenue:totalRevenue,  orders }) 
})
// update process order -- admin=> /api/v1/admin/order/:id
exports.updateOrder = catchAsynErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItems.forEach(async function(item){
        console.log(item.name, item.quantity)
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now();

    order.save();
    return res.status(200).json({success: true}) 
})
async function updateStock(productId, quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({ validateBeforeSave: false });
}
// delete order -- admin=> /api/v1/admin/order/:id
exports.deleteOrder = catchAsynErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('order not found', 404))
    }
    order.delete();
    return res.status(200).json({success: true }) 
})