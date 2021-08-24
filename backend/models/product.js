const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    catagory: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphone',
                'Food',
                'Books',
                'Clothes',
                'Beauty/Health'
            ],
            message: 'please select correct category for this product'
        }
    },
    seller: {
        type: String,
        required: [true, 'please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Plese product stock'],
        maxLength: [5, 'stock cannot exceed 5 character'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    review: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            conmment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema)