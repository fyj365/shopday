const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');

const CatchAsynErrors = require('../middlewares/catchAsynErrors')

// create new product => /api/v1/admin/product/new
exports.newProduct = CatchAsynErrors (async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})
// get all products => /api/v1/products
exports.getProducts = CatchAsynErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database!',
        count: products.length,
        products
    })
})
// get product detail with specific id => /api/v1/product/:id
exports.getSingleProduct = CatchAsynErrors (async (req, res, next) => {

        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler('Product not found', 404))
        }
        return res.status(200).json({success: true, product }) 

})
// update product detail with id => /api/v1/admin/product/update/:id
exports.updateProduct = CatchAsynErrors (async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if(!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        })
        return res.status(200).json({success: true, product})

})
// delete product  => /api/v1/admin/product/:id
exports.deleteProduct  = CatchAsynErrors (async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return next(new ErrorHandler('Product not found', 404))

        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: 'product deleted' }) 
        
})
