const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','nuts']
    }
})

const Product = mongoose.model('product',productSchema)

module.exports = Product