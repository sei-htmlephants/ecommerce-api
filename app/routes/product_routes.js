const express = require('express')
const passport = require('passport')

const Product = require('../models/product')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
router.get('/products', requireToken, (req, res, next) => {
  Product.find()
    .then(products => {
      return products.map(product => product.toObject())
    })
    .then(products => res.status(200).json({ products: products }))
    .catch(next)
})

// SHOW
router.get('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => res.status(200).json({ product: product.toObject() }))
    .catch(next)
})

// CREATE
router.post('/products', requireToken, (req, res, next) => {
  req.body.product.owner = req.user.id

  Product.create(req.body.product)
    .then(product => {
      res.status(201).json({ product: product.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/products/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.product.owner

  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)

      return product.updateOne(req.body.product)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)
      product.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
