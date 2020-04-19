const { check, param } = require('express-validator')
const Category = require('../models/Category')
const Product = require('../models/Product')

exports.validate = (method) => {
    switch (method) {
      case 'getProduct': {
        return [ 
          param('productId')
          .custom(productId => {
            return Product.findById(productId).then(val =>{
              if (!val) 
                return Promise.reject('Produktu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Produktu nie ma w bazie danych')})
          })
        ]
      }
      case 'putProduct': {
        return [ 
          param('productId')
          .custom(productId => {
            return Product.findById(productId).then(val =>{
              if (!val) 
                return Promise.reject('Produktu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Produktu nie ma w bazie danych')})
          }),

          check('name')
          .optional()
          .notEmpty().withMessage('Nazwa nie może być pusta')
          .custom(name => {
            if(typeof(name) !== 'string')
              throw new Error('Nazwa musi być tekstem')
            else
              return true
            
          }),
          check('description')
          .optional()
          .notEmpty().withMessage('Opis nie może być pusty')
          .custom(name => {
            if(typeof(name) !== 'string')
              throw new Error('Opis musi być tekstem')
            else
              return true
          }),

          
          check('price')
          .optional()
          .notEmpty().withMessage('Cena nie może być pusta')
          .isFloat({ min: 0 }).withMessage('Cena musi być większa, niż 0'),
          
          check('weight')
          .optional()
          .notEmpty().withMessage('Waga musi może być pusta')
          .isFloat({ min: 0 }).withMessage('Waga musi być większa, niż 0'),
          
          check('categoryId')
          .optional()
          .custom(categoryId => {
            return Category.findById(categoryId).then(val => {
              if (!val) 
                return Promise.reject('Kateogrii nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Kateogrii nie ma w bazie danych')})
          })
        ]
      }
      case 'deleteProduct': {
        return [ 
          param('productId')
          .custom(productId => {
            return Product.findById(productId).then(val =>{
              if (!val) 
                return Promise.reject('Produktu nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Produktu nie ma w bazie danych')})
          })
        ]
      }
      case 'addProduct': {
       return [ 
          check('name')
          .exists().withMessage('Nazwa musi istnieć')
          .notEmpty().withMessage('Nazwa nie może być pusta')
          .custom(name => {
            if(typeof(name) !== 'string')
              throw new Error('Nazwa musi być tekstem')
            else
              return true
            
          }),
          check('description')
          .exists().withMessage('Opis musi istnieć')
          .notEmpty().withMessage('Opis nie może być pusty')
          .custom(name => {
            if(typeof(name) !== 'string')
              throw new Error('Opis musi być tekstem')
            else
              return true
          }),

          
          check('price')
          .exists().withMessage('Cena musi istnieć')
          .notEmpty().withMessage('Cena nie może być pusta')
          .isFloat({ min: 0 }).withMessage('Cena musi być większa, niż 0'),
          
          check('weight')
          .exists().withMessage('Waga musi istnieć')
          .notEmpty().withMessage('Waga musi może być pusta')
          .isFloat({ min: 0 }).withMessage('Waga musi być większa, niż 0'),
          
          check('categoryId')
          .custom(categoryId => {
            return Category.findById(categoryId).then(val => {
              if (!val) 
                return Promise.reject('Kateogrii nie ma w bazie danych')
              else 
                return true
            })
            .catch(e => {throw new Error('Kateogrii nie ma w bazie danych')})
          })
         ]   
      }
    }
  }