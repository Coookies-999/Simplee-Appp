import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"
dotenv.config()


    // console.log(process.env.CLOUDINARY_API_KEY);
    
    
    

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    //our strategy is we will get the file path and store that in our local server then we will give that file path to the cloudinary function to upload that
    
  const uploadOnCloudinary = async(localFilePath)=>{
            try {
                if(!localFilePath) return null
                //upload on cloudinary
              const response = await  cloudinary.uploader.upload(localFilePath,{
                    resource_type:"auto"     // it will detect automatically what type of file is e.g img,video etc...
                })
                //file has been uploaded successfully
                console.log(response); //inside the response there is an option to access the uploaded url , so we are returning whole response user will take whatever he needs
                
                return response
            } catch (error) {
                fs.unlinkSync(localFilePath)  //if the file uploading failed then it will remove the file from temporary server
                console.log(error);
                
                return null
            }
  }

  export {uploadOnCloudinary}