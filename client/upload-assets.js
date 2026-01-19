import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
// You can either provide values here or set CLOUDINARY_URL in your .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const assetsDir = './src/assets';
const folderName = 'ecommerce_assets'; // Folder name in Cloudinary

async function uploadFiles(dir) {
    const files = fs.readdirSync(dir);
    const mapping = {};

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subMapping = await uploadFiles(filePath);
            Object.assign(mapping, subMapping);
        } else {
            // Check if it's an image
            if (/\.(png|jpg|jpeg|webp|svg|gif)$/i.test(file)) {
                console.log(`Uploading ${file}...`);
                try {
                    const result = await cloudinary.uploader.upload(filePath, {
                        folder: folderName,
                        public_id: path.parse(file).name, // Keep the same name
                        use_filename: true,
                        unique_filename: false,
                    });
                    mapping[file] = result.secure_url;
                    console.log(`Successfully uploaded ${file}: ${result.secure_url}`);
                } catch (error) {
                    console.error(`Error uploading ${file}:`, error.message);
                }
            }
        }
    }
    return mapping;
}

async function main() {
    console.log('Starting Cloudinary Upload...');
    const results = await uploadFiles(assetsDir);

    const outputPath = './src/cloudinary-assets.json';
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nUpload complete! Results saved to ${outputPath}`);
    console.log('\nYou can now use these URLs in your code.');
}

main().catch(console.error);
