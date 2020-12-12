const express = require('express')
const passport = require('passport')

const Purchase = require('../models/purchase')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// const stripe = require('stripe')('sk_test_soMKrvSYorSaEaLOwQVmQo27')
// router.use(express.static('.'))
// const YOUR_DOMAIN = 'http://localhost:7165/#'

// router.post('/create-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Cart'
//           },
//           unit_amount: 2000
//         },
//         quantity: 1
//       }
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/checkout-success`,
//     cancel_url: `${YOUR_DOMAIN}/index-products`
//   })
//   res.json({ id: session.id })
// })

// INDEX
router.get('/purchases', requireToken, (req, res, next) => {
  Purchase.find()
    .then(purchases => {
      return purchases.map(purchase => purchase.toObject())
    })
    .then(purchases => res.status(200).json({ purchases: purchases }))
    .catch(next)
})

router.get('/purchases-user', requireToken, (req, res, next) => {
  // console.log(req.user)
  Purchase.find({'owner': req.user.id})
    .then(handle404)
    .then(purchases => {
      return purchases.map(purchase => {
        requireOwnership(req, purchase)
        return purchase.toObject()
      })
    })
    .then(purchases => {
      res.status(200).json({ purchases: purchases })
    })
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
