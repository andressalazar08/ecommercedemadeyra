const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//Create new product on database => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async(req,res, next) =>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
});

//Get all products => /api/v1/products
exports.getProducts= catchAsyncErrors(async (req,res,next) => {
        const resPerPage = 8;
        const productCount = await Product.countDocuments();//usamos esta variable para el forntend
        const apiFeatures = new APIFeatures(Product.find(), req.query )
                            .search()
                            .filter()
                            .pagination(resPerPage)
        const products = await apiFeatures.query;

        setTimeout(()=>{
            res.status(200).json({
                success: true,

                // message: "Here goes the products"
                productCount,
                products
            })
        },800)


})

//get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById(req.params.id)
    if (!product){
        //opción 1: utilizar un response en caso de error
        // return res.status(404).json({
        //     success:false,
        //     message: 'Product not found'
        // })
        //opción 2: utilizar el manejador de errores globales
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})


//Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) =>{
    let product = await Product.findById(req.params.id);
    if (!product){
      //opción 1: utilizar un response en caso de error
        // return res.status(404).json({
        //     success:false,
        //     message: 'Product not found'
        // })
        //opción 2: utilizar el manejador de errores globales
        return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        product
    })
})


//Delete product => /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if (!product){
      //opción 1: utilizar un response en caso de error
        // return res.status(404).json({
        //     success:false,
        //     message: 'Product not found'
        // })
        //opción 2: utilizar el manejador de errores globales
        return next(new ErrorHandler('Product not found', 404))
    }
    await product.deleteOne(); //remove the product finded
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
}



//Create new review and update => /api/v1/review
exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    //chequeamos si el autor ha hecho un review en el producto
    const isReviewed = product.reviews.find(
        r=>r.user.toString()=== req.user._id.toString()
        )
    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString()===req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews= product.reviews.length;
    }
    //calculate overall ratings
    product.ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/ product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success: true

    })
})


//Get product reviews => /api/v1/reviews
exports.getProductReviews=catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

//Delete the review by specific id
exports.deleteReview=catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.productId);
    //filtra los reviews excepto el que se envia por quuery
    const reviews = product.reviews.filter(review => review._id.toString()!==req.query.id.toString())
    const numOfReviews = reviews.length;
     //calculate overall ratings
    const ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/ reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,

    })
})

