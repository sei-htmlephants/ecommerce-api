const express = require('express')
const passport = require('passport')

const Purchase = require('../models/purchase')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
router.get('/purchases', requireToken, (req, res, next) => {
  Purchase.find()
    .then(purchases => {
      return purchases.map(purchase => purchase.toObject())
    })
    .then(purchases => res.status(200).json({ purchases: purchases }))
    .catch(next)
})

// SHOW
router.get('/purchases/:id', requireToken, (req, res, next) => {
  Purchase.findById(req.params.id)
    .then(handle404)
    .then(purchase => res.status(200).json({ purchase: purchase.toObject() }))
    .catch(next)
})

// CREATE
router.post('/purchases', requireToken, (req, res, next) => {
  req.body.purchase.owner = req.user.id

  Purchase.create(req.body.purchase)
    .then(purchase => {
      res.status(201).json({ purchase: purchase.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/purchases/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.purchase.owner

  Purchase.findById(req.params.id)
    .then(handle404)
    .then(purchase => {
      requireOwnership(req, purchase)
      return purchase.updateOne(req.body.purchase)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/purchases/:id', requireToken, (req, res, next) => {
  Purchase.findById(req.params.id)
    .then(handle404)
    .then(purchase => {
      requireOwnership(req, purchase)
      purchase.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
