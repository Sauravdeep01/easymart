const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected for seeding...');

        // Read products from JSON
        const productsPath = path.join(__dirname, '../client/src/expandedProducts.json');
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

        // Clear existing
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Old data cleared.');

        // Seed Admin User
        await User.create({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            isAdmin: true
        });
        console.log('Admin user seeded.');

        // Insert products
        await Product.insertMany(products);
        console.log(`${products.length} Products seeded successfully!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
