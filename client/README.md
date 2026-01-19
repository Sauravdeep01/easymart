# React + Vite E-Commerce

This project is a modern e-commerce platform built with React and Vite.

## 🚀 Cloudinary Asset Upload Guide

If you want to move your static images from `src/assets` to Cloudinary for better performance and easier management, follow these steps:

### 1. Prerequisites
- A [Cloudinary](https://cloudinary.com/) account.
- Your Cloudinary Cloud Name, API Key, and API Secret (Found in the Cloudinary Dashboard).

### 2. Setup Dependencies
In the `client` directory, install the required packages:
```bash
npm install cloudinary dotenv
```

### 3. Configure Environment Variables
Create a `.env` file in the `client` directory (or update the existing one) with your credentials:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Upload Assets
Run the provided upload script to upload everything in `src/assets` to Cloudinary:
```bash
node upload-assets.js
```
This script will:
- Search for all images in `src/assets`.
- Upload them to a folder named `ecommerce_assets` in your Cloudinary account.
- Generate a `src/cloudinary-assets.json` file containing the mapping of original filenames to Cloudinary URLs.

### 5. Using the New URLs
After running the script, you can import the generated JSON and use the URLs in your components:

```javascript
import cloudinaryAssets from '../cloudinary-assets.json';

// Example usage
<img src={cloudinaryAssets['NavbarLogo.png']} alt="Logo" />
```

---

## Development

### Getting Started
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Build for production: `npm run build`

## Features
- Dynamic Homepage with Carousels
- Featured Products Section
- Responsive Navigation Bar
- Modern UI with Tailwind CSS
