const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

//Create new product on database => /api/v1/admin/product/new

exports.newProduct = async(req,res, next) =>{

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })

}

//Get all products => /api/v1/products
exports.getProducts= async (req,res,next) => {

        const products = await Product.find();


        res.status(200).json({
            success: true,
            count: products.length,
            // message: "Here goes the products"
            products
        })

}

//get single product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) =>{

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

}


//Update product => /api/v1/admin/product/:id

exports.updateProduct = async (req, res, next) =>{

    let product = await Product.findById(req.params.id);

    if (!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
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

}


//Delete product => /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if (!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }

    await product.deleteOne(); //remove the product finded

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })



}