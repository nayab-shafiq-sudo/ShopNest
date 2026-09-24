const productModel = require('../models/product.model')
const cloudinary = require('../config/cloudinary')


const getProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({})
        res.status(200).json({allProducts})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

const createProducts = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        if (!name || !price || !category || !stock) {
        return res.status(400).json({ message: 'Provide all required fields' })
        }

        let imageURL;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imageURL = result.secure_url
        }
        const product = await productModel.create({
            name, description, price, category, stock, imageURL
        })
        return res.status(201).json({message:'Product created', product})
    } catch (error) {
        console.error('CREATE PRODUCT ERROR:', error)
        res.status(500).json({message:'Server Error'})
    }
}

const getProductById = async (req, res) => {
    try {
        const getProduct = await productModel.findById(req.params.id)
        if (!getProduct) {
            res.status(404).json({message:'No product found'})
            return
        }
        res.status(200).json(getProduct)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        const product = await productModel.findById(req.params.id)
        if (product) {
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                product.imageURL = result.secure_url
            }
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({message: 'product not found'})
        }
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({message: 'product removed succesfully'})
        } else {
            res.status(404).json({message:'product not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


module.exports = { getProducts, createProducts, getProductById, updateProduct, deleteProduct }