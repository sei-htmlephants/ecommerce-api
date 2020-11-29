const mongoose = require('mongoose')
const commentSchema = require('./comment')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productClass: {
    type: String,
    enum: ['official', 'market']
    // need to seperate marketplace and e-commerce products
  },
  productCatagory: {
    type: String,
    enum: ['Cameras', 'Prints', 'Accessories']
  },
  productImages: {
    type: String
    // will be image links?
    // take first image as profile, or make another catagory?
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
