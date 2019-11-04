const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId:{
        type:String, required:true, unique:true
    },
    title:{
        type:String, required:true
    },
    nature:{
        type:String, default:'used'
    },
    description:{
        type:String,required:true, default:'No description for the product'
    },
    image:{
        type:String, required:true
    },
    price:{
        type:Number, required:true
    },
    priceNegotiable:{
        type:Boolean, default:'yes'
    },
    reporter:{
        type:String, required:true
    },
    tags:[]


});

productSchema.pre('save', function(next){

    // if(this.tags.filter((e)=>{
    //     if(this.tags.indexOf(e)==-1){
    //         this.tags.push('Others')
    //         console.log(this.tags[0]);
    //     }
    // }))
    // this.tags.forEach(e => {
    //     if(e.indexOf==-1){
    //         this.tags.push('Others')
        
    //     }else{
            
    //     }
    // });

//    this.tags.map((e)=>{
//        console.log(e);
//        if(e==null||""||undefined){
//            this.tags.push('Others')
//            console.log(this.tags);
//        }
//    })

   return next();





  
})
module.exports = mongoose.model('ProductSchema',productSchema)