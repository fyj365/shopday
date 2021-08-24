const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
// create new product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
// get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database!',
        count: products.length,
        products
    })
}
// get product detail with specific id => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler('Product not found', 404))
        }
        return res.status(200).json({success: true, product }) 
    }catch(error) {
        return res.status(500).json({success: false, message: error})
    }

}
// update product detail with id => /api/v1/admin/product/update/:id
exports.updateProduct = async (req, res, next) => {
    try{
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({success: false, message: 'product not found'})
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        })
        return res.status(200).json({success: true, product})
    }catch(error) {
        return res.status(500).json({success: false, message: error})
    }
}
// delete product  => /api/v1/admin/product/:id
exports.deleteProduct  = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({success: false, message: 'product not found'})

        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: 'product deleted' }) 
    
    }catch(error){
        return res.status(500).json({success: false, message: error})
    }
}
