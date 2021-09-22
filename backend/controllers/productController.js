const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');

const CatchAsynErrors = require('../middlewares/catchAsynErrors');

const APIFeatures = require('../utils/apiFeatures');

// create new product => /api/v1/admin/product/new
exports.newProduct = CatchAsynErrors (async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})
// get all products => /api/v1/products
exports.getProducts = CatchAsynErrors(async (req, res, next) => {
    const perPage = 2;
    const productsTotal = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginaiton(perPage);
    const products = await apiFeatures.query;
 
    res.status(200).json({
        success: true,
        count: products.length,
        totalProducts:productsTotal,
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

// create new review => /api/v1/review
exports.createProductReview = CatchAsynErrors( async (req, res, next) => {

    const { rating, comment, productId} = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )
    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false});

    res.status(200).json({success: true})

})
// display all reviews=> /api/v1/reviews
exports.displayProductReviews = CatchAsynErrors( async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    res.status(200).json({success: true, reviews: product.reviews})


})
// delete review=> /api/v1/review
exports.deleteProductReview = CatchAsynErrors( async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.reviewId.toString());
    const numOfReviews = reviews.length;
    const rating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {reviews,numOfReviews, rating}, {new: true, runValidators: true, useFindAndModify: false});
    res.status(200).json({success: true, reviews: reviews})


})