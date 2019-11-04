const express = require('express');
const Router = express.Router();
const appConfig = require('../config/appConfig');
const productController = require('../controllers/productController');
const multer = require('multer');
const productSchema = require('../models/product');
const storage = multer.diskStorage({
    destination: function(req,image,cb){
      cb(null,'./uploads/');
    },
    filename: function(req,image,cb){
      cb(null,new Date().toISOString().replace(/[\/\\:]/g, "_") + image.originalname);
    }
  });

  const fileFilter = (req, image,cb)=>{
    if(image.mimetype ==='image/jpeg'|| image.mimetype ==='image/png'){
      cb(null, true);
    }else{   
    cb(null, false);
    }
  
  }
  const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024*5
  },
  fileFilter:fileFilter
  });



module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/products`;


    app.post(`${baseUrl}/create`, upload.single('image'), productController.createProduct );
    app.get(`${baseUrl}/all`,  productController.getAllProducts );
    app.get(`${baseUrl}/tags`, productController.getAlltags);
    app.get(`${baseUrl}/add-to-cart/:id`, productController.addToCard);
    app.get(`${baseUrl}/cart/:id`, productController.getProductById);

    
}