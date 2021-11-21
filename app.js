const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Product = require('./models/product')

const URL_DB = 'mongodb://localhost:27017/farmStand'

mongoose.connect(URL_DB)

app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))



let categories = ['fruit','vegetable','nuts']

app.get('/',async(req,res,next)=>{
    const {category} = req.query
    if (category) {
        const products = await Product.find({category})
        res.render('products/index',{products,category})
    }else{
        const products = await Product.find({})
        res.render('products/index',{products,category:'All'})
    }
   
})

app.get('/products/new',(req,res,next)=>{
    res.render('products/new',{categories})
})

app.post('/products',async(req,res,next)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})



app.get('/products/:id',async(req,res,next)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/show',{product})
})

app.get('/products/:id/edit',async(req,res,next)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit',{product,categories})
})

app.put('/products/:id',async(req,res,next)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body,
        {runValidators:true,new:true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id',async(req,res,next)=>{
    const {id} = req.params
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.redirect('/')
})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server run in Port ${PORT}`);
})