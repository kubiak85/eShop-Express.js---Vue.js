const { check, param } = require('express-validator')
const mongoose = require('mongoose');
const Product = require('../models/Product')
const OrderStatus = require('../models/OrderStatus')
const Order = require('../models/Order')

exports.validate = (method) => {
    switch (method) {
      case 'getProdutsWithStatus': {
        return [ 
          param('statusId')
          .custom(statusId => {
            return OrderStatus.findById(statusId).then(val =>{
              if (!val) 
                return Promise.reject('Statusu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Statusu nie ma w bazie danych')})
          })
        ]
      }
      case 'putOrderStan': {
        return [ 
          param('orderId')
          .custom(orderId => {
            return Order.findById(orderId).then(val =>{
              if (!val) 
                return Promise.reject('Zamówienia nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Zamówienia nie ma w bazie danych')})
          }),

          check('status')
          .exists().withMessage('Status musi istnieć')
          .custom(status => {
            return OrderStatus.findById(status).then(val =>{
              if (!val) 
                return Promise.reject('Statusu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Statusu nie ma w bazie danych')})
          })
          
        ]
      }
      case 'getOrder': {
        return [ 
          param('orderId')
          .custom(orderId => {
            return Order.findById(orderId).then(val =>{
              if (!val) 
                return Promise.reject('Zamówienia nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Zamówienia nie ma w bazie danych')})
          })
        ]
      }
      case 'addOrder': {
        return [ 
          check('userName')
          .exists().withMessage('Nazwa użytkownika musi istnieć')
          .notEmpty().withMessage('Nazwa użytkownika nie może być pusta')
          .custom(name => {
            if(typeof(name) !== 'string')
              throw new Error('Nazwa użytkownika musi być tekstem')
            else
              return true
          }),

          check('userEmail')
          .exists().withMessage('Email użytkownika musi istnieć')
          .notEmpty().withMessage('Email użytkownika nie może być pusta')
          .isEmail().withMessage('Musisz podać prawidłowy adres email'),
          
          check('userPhone')
          .exists().withMessage('Telefon użytkownika  musi istnieć')
          .notEmpty().withMessage('Telefon użytkownika nie może być pusty')
          .isMobilePhone().withMessage('Musisz podać prawidłowy numer telefonu'),

          check('date')
		  .optional()
          .notEmpty().withMessage('Data nie moze pyc pusta')
          .custom(date => {
            if(isNaN(Date.parse(date)))
              throw new Error('Musisz podać poprawną datę')
            else
              return true
          }),

          check('status')
		  .optional()
          .notEmpty().withMessage('Status nie może być  pusty')
          .custom(status => {
            return OrderStatus.findById(status).then(val =>{
              if (!val) 
                return Promise.reject('Statusu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Statusu nie ma w bazie danych')})
          }),

          check('orders')
          .exists().withMessage('Zamówienie musi istnieć')
          .custom(orders => {
            //checkAmount = orders.map((val) => { return val.amount < 0})
            //if(checkAmount.length >= 0 )
              //throw new Error('Któryś produkt ma błędą liczbę sztuk');
            return Product.find().where('_id').in(orders.map(ele => new mongoose.Types.ObjectId(ele.productId))).then(val =>{
              if (val.length !== orders.length) 
                return Promise.reject('Któregoś produktu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Któregoś produktu nie ma w bazie danych')})
          })
        ]
      }
    }
  }