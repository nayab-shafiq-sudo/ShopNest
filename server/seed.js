require('dotenv').config()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const connectDB = require('./config/db')
const userModel = require('./models/user.model')
const productModel = require('./models/product.model')

const users = [
  {
    name: 'ShopNest Admin',
    email: 'admin@shopnest.com',
    password: 'Admin@123',
    role: 'admin',
    verified: true,
  },
  {
    name: 'Ali Khan',
    email: 'ali@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Ahmed Raza',
    email: 'ahmed@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Hamza Malik',
    email: 'hamza@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Usman Tariq',
    email: 'usman@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Bilal Ahmed',
    email: 'bilal@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Fatima Noor',
    email: 'fatima@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Hira Malik',
    email: 'hira@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Zain Abbas',
    email: 'zain@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
  {
    name: 'Danish Iqbal',
    email: 'danish@example.com',
    password: 'User@123',
    role: 'user',
    verified: true,
  },
];

const products = [
	{
		name: 'Wireless Headphones',
		description: 'Comfortable over-ear headphones with active noise cancellation and a long-lasting battery.',
		price: 7999,
		category: 'Electronics',
		stock: 25,
		imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
		rating: 4.6,
		reviews: 128,
	},
	{
		name: 'Minimal Leather Backpack',
		description: 'A durable everyday backpack with a padded laptop compartment and organized storage.',
		price: 3499,
		category: 'Fashion',
		stock: 18,
		imageURL: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
		rating: 4.4,
		reviews: 76,
	},
	{
		name: 'Ceramic Coffee Set',
		description: 'Hand-finished ceramic mugs and saucers for a relaxed coffee break at home.',
		price: 1299,
		category: 'Home',
		stock: 40,
		imageURL: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800',
		rating: 4.7,
		reviews: 54,
	},
	{
		name: 'Running Shoes',
		description: 'Lightweight running shoes with cushioned support for everyday training and walks.',
		price: 4599,
		category: 'Sports',
		stock: 32,
		imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
		rating: 4.5,
		reviews: 91,
	},
	{
		name: 'Smart Desk Lamp',
		description: 'Adjustable LED desk lamp with warm and cool light modes for work or study.',
		price: 1899,
		category: 'Electronics',
		stock: 15,
		imageURL: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
		rating: 4.3,
		reviews: 39,
	},
    {
		name: 'Gaming Mouse',
		description: 'Ergonomic gaming mouse with adjustable DPI and responsive tracking.',
		price: 2499,
		category: 'Electronics',
		stock: 22,
		imageURL: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
		rating: 4.4,
		reviews: 69,
	},
	{
		name: 'Yoga Mat',
		description: 'Non-slip exercise mat with comfortable cushioning for yoga and home workouts.',
		price: 1999,
		category: 'Sports',
		stock: 28,
		imageURL: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800',
		rating: 4.6,
		reviews: 52,
	},
    {
		name: 'Classic Denim Jacket',
		description: 'Stylish denim jacket made from durable fabric for casual everyday outfits.',
		price: 4299,
		category: 'Fashion',
		stock: 24,
		imageURL: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
		rating: 4.4,
		reviews: 67,
	},
	{
		name: 'Premium Leather Wallet',
		description: 'Compact leather wallet with multiple card slots and a dedicated cash compartment.',
		price: 1599,
		category: 'Accessories',
		stock: 35,
		imageURL: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
		rating: 4.6,
		reviews: 84,
	},{
		name: 'Bluetooth Portable Speaker',
		description: 'Compact wireless speaker with powerful sound and long battery performance.',
		price: 3299,
		category: 'Electronics',
		stock: 27,
		imageURL: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
		rating: 4.5,
		reviews: 103,
	},
	{
		name: 'Minimal Table Clock',
		description: 'Modern minimalist table clock suitable for bedrooms, offices and study desks.',
		price: 1299,
		category: 'Home',
		stock: 33,
		imageURL: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800',
		rating: 4.2,
		reviews: 34,
	},
	{
		name: 'Sunglasses',
		description: 'Stylish UV-protection sunglasses with a lightweight frame for everyday use.',
		price: 2199,
		category: 'Accessories',
		stock: 26,
		imageURL: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
		rating: 4.5,
		reviews: 77,
	},
]

const seedDatabase = async () => {
	try {
		await connectDB()

		const hashedUsers = await Promise.all(
			users.map(async (user) => ({
				...user,
				password: await bcrypt.hash(user.password, 10),
			}))
		)

		await userModel.deleteMany({})
		await productModel.deleteMany({})
		await userModel.insertMany(hashedUsers)
		await productModel.insertMany(products)

		console.log(`Seeded ${users.length} users and ${products.length} products.`)
		console.log('Admin login: admin@shopnest.com / Admin@123')
		console.log('Customer login: customer@shopnest.com / Customer@123')
	} catch (error) {
		console.error('Seeding failed:', error.message)
		process.exitCode = 1
	} finally {
		await mongoose.disconnect()
	}
}

seedDatabase()
