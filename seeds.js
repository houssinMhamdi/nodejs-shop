const mongoose = require('mongoose')
const Product = require('./models/product')

const URL_DB = 'mongodb://localhost:27017/farmStand'

mongoose.connect(URL_DB)

const p = new Product({
    name:'tomato',
    price:2,
    category:'vegetable'
})
p.save().then(p=>{
    console.log(p);
}).catch(err=>{console.log(err);})