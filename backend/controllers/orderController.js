const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');


//create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    //crea un nuevo documento en la bd
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



// Get single order  => /api/v1/order/:id

exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler('No order found with this Id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// Get logged in user  orders  => /api/v1/orders/me

exports.myOrders = catchAsyncErrors(async(req, res, next)=>{

    const orders = await Order.find({
        user:req.user.id
    })

    res.status(200).json({
        success: true,
        orders
    })
})


// Get all orders in the system by ADMIN role => /api/v1/admin/orders

exports.allOrders = catchAsyncErrors(async(req, res, next)=>{

    const orders = await Order.find()

    let totalAmount =0;

    //se acumula el valor total de las ordenes para consulta
    orders.forEach(or=>{
        totalAmount += or.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})



// Update / process order ADMIN role => /api/v1/admin/orders

exports.updateProcessOrders = catchAsyncErrors(async(req, res, next)=>{

    const orders = await Order.findById(req.params.id)

    if(orders.orderStatus==='Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    orders.orderItems.forEach(async item =>{
        await updateStock(item.product, item.quantity)
    })

    orders.orderStatus = req.body.orderStatus
    orders.delieverAt = Date.now()

    await orders.save()

    res.status(200).json({
        success: true,

    })
})


async function updateStock(id, quantity){
    const product =await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave:false});
}