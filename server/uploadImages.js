import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assetsDir = path.join(__dirname, '../client/src/assets');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            // Only include image files
            if (/\.(png|jpe?g|gif|svg|webp)$/i.test(file)) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

async function uploadImages() {
    try {
        if (!fs.existsSync(assetsDir)) {
            console.error(`Directory not found: ${assetsDir}`);
            return;
        }

        const files = getFiles(assetsDir);
        console.log(`Found ${files.length} images in ${assetsDir}`);

        const results = [];

        for (const filePath of files) {
            const relativePath = path.relative(assetsDir, filePath).replace(/\\/g, '/');
            const fileName = path.basename(filePath);

            console.log(`Uploading ${relativePath}...`);
            try {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'ecommerce_assets',
                    public_id: path.parse(fileName).name,
                });
                console.log(`Successfully uploaded ${fileName}: ${result.secure_url}`);
                results.push({
                    localPath: `/src/assets/${relativePath}`,
                    cloudinaryUrl: result.secure_url
                });
            } catch (error) {
                console.error(`Failed to upload ${fileName}:`, error.message);
            }
        }

        console.log('\n--- Final Mapping (Copy these) ---');
        console.log(JSON.stringify(results, null, 2));

        // Let's also write this to a file for easier access
        fs.writeFileSync(path.join(__dirname, 'upload_results.json'), JSON.stringify(results, null, 2));
        console.log('\nResults saved to server/upload_results.json');
    } catch (error) {
        console.error('Error during upload process:', error);
    }
}

uploadImages();
