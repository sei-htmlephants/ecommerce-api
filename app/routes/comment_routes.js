
const express = require('express')
const passport = require('passport')

// const Comment = require('../models/comment')
const Product = require('../models/product')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Create Comment on product
router.post('/comments', requireToken, (req, res, next) => {
  req.body.comment.owner = req.user.id

  const commentData = req.body.comment

  const productId = commentData.productId

  Product.findById(productId)
    .then(handle404)
    .then(product => {
      product.comments.push(commentData)
      return product.save()
    })
    .then(product => res.status(201).json({ product }))
    .catch(next)
})

// Delete Comment on product
router.delete('/comments/:id', requireToken, (req, res, next) => {
  const commentId = req.params.id
  const productId = req.body.comment.productId

  Product.findById(productId)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)
      product.comments.id(commentId).remove()

      return product.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update Comment on product
router.patch('/comments/:id', requireToken, (req, res, next) => {
  const commentId = req.params.id
  const commentData = req.body.comment
  const productId = commentData.productId

  Product.findById(productId)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)
      const comment = product.comments.id(commentId)
      comment.set(commentData)

      return product.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
