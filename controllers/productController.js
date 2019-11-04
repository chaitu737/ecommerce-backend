const shortId= require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerlib');
const time= require('../libs/timeLib');
const ProductModel = require('../models/product');
const check = require('../libs/checklib');
const Cart = require('../models/cart');

let getAllProducts = (req,res)=>{
     let search = JSON.parse(req.query.tags);
     console.log(search);
     ProductModel.find({'tags':{$in:search}})
     
    .count((err, result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'ProductController: getAllProducts', 10)
            let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
            res.send(apiResponse)
          }else if(check.isEmpty(result)){
            logger.info('No Issue Found', 'ProductController: getAllProducts')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
               res.send(apiResponse)
  }else{
      let count = result
      let pageNumber =parseInt(req.query.pageIndex)
      let nPerPage =parseInt(req.query.pageSize)
    //   let key = req.query.sort.split('.')[0]
    // let order = parseInt(req.query.sort.split('.')[1])
    ProductModel.find({'tags':{$in:search}})
    .select(' -__v -_id')
    .skip(pageNumber > 0 ? ((pageNumber) * nPerPage) : 0)
    .limit(nPerPage)
    .lean()
    .exec((err, result)=>{
        if(err){
            console.log(err)
                            logger.error(err.message, 'ProductController: getAllProducts', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Products found', 'ProductController: getAllProducts')
            let apiResponse = response.generate(true, 'No Tags found', 404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'All Products Details Found', 200, result);
            apiResponse.count = count
            res.send(apiResponse);
        }
    })


  }
    })
};

let getProductById = (req,res)=>{
    ProductModel.findOne({ productId: req.params.id })
    .exec((err, result) => {
   
           if (err) {
               console.log(err)
               logger.error(err.message, 'ProductController: getSingleProduct', 10)
               let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
               res.send(apiResponse)
           } else if (check.isEmpty(result)) {
               logger.info('No Book Found', 'ProductController:getSingleProduct')
               let apiResponse = response.generate(true, 'No Product Found', 404, null)
               res.send(apiResponse)
           } else {
               let apiResponse = response.generate(false, 'Product Details Found', 200, result)
               res.send(apiResponse)
           }
       })
}

let createProduct = (req,res)=>{

let tagArray = JSON.parse(JSON.stringify(req.body.tags));

    if(req.file){
        let fileName = req.file.path
        let newProduct = new ProductModel({
            productId:shortId.generate(),
            title:req.body.title,
            price:req.body.price,
            pricenegotiable:req.body.pricenegotiable,
            reporter:req.body.reporter,
            tags:tagArray,
            image:req.file.filename,
            createdOn:time.now()
    })
       newProduct.save((err, newProduct)=>{
           if(err){
            console.log(err)
            logger.error(err.message, 'ProductController: createProduct', 10)
            let apiResponse = response.generate(true, 'Failed to create new Product', 500, null)
            res.send(apiResponse)
           }else{
            
            
            let apiResponse = response.generate(false, 'Product Created successfully', 200, newProduct)
            res.send(apiResponse)
           }
       })
    }else{
        let apiResponse = response.generate(true, 'Please make sure you have selected an Image', 500, null)
        res.send(apiResponse)

    }
}


let getAlltags = (req,res)=>{
    ProductModel.distinct("tags").sort()
    .exec((err,result)=>{
        
        if(err){
            console.log(err)
                            logger.error(err.message, 'ProductController: getAllProducts', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Tags Details', 500, null)
                            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No Tags found', 'ProductController: getAllProducts')
            let apiResponse = response.generate(true, 'No Tags found', 404, null)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(false, 'All Tags Found', 200, result);
            
            res.send(apiResponse);
        }

    })
}


let addToCard = (req,res)=>{
    
    var cart = new Cart(req.session.cart?req.session.cart:{items:{}});
    ProductModel.findOne({productId:req.params.id},function(err,product){ 
        console.log(req.params.id);
        if(err){
            res.send(err);
        }
    
        
        cart.add(product, product.productId);
        req.session.cart = cart;
        res.send(req.session.cart);
        console.log(req.session.cart);
    })
}

module.exports = {
    getAllProducts:getAllProducts,
    createProduct:createProduct,
    getAlltags:getAlltags,
    addToCard:addToCard,
    getProductById:getProductById
}