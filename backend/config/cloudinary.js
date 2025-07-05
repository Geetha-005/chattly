// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";




// const uploadOnCloudinary=async(filePath)=>{

//       cloudinary.config({ 
//         cloud_name:process.env.CLOUD_NAME, 
//         api_key:process.env.API_KEY, 
//         api_secret:process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
//     });
    


// try{

//     const uploadResult= await cloudinary.uploader.upload(filePath)
//     fs.unlinkSync(filePath);
//     return uploadResult.secure_url
// }
// catch(error){
//     fs.unlinkSync(filePath)
//     console.log(error);

// }

// }

// export default uploadOnCloudinary



import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import path from 'path';

const uploadOnCloudinary = async (filePath) => {
    // Configure Cloudinary
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

    try {
        // Verify file exists before uploading
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath);
        
        // Only try to delete if file exists
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Successfully deleted temp file: ${filePath}`);
            }
        } catch (unlinkError) {
            console.warn(`Failed to delete temp file: ${unlinkError.message}`);
            // Continue even if deletion fails
        }

        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };

    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        
        // Attempt cleanup if file exists
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (cleanupError) {
            console.warn("Cleanup failed:", cleanupError.message);
        }
        
        return null;
    }
};

export default uploadOnCloudinary;