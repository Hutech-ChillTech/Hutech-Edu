import { Request, Response, NextFunction } from "express";
import cloudinary from "../configs/cloudinary";

export const getUploadSignature = (req: Request, res: Response, next: NextFunction) => {

    const cloud_secret = process.env.CLOUDINARY_CLOUD_SECRET || '';
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const params = {
            timestamp: timestamp,
            folder: 'course-videos',
        };

        const signature = cloudinary.utils.api_sign_request(params, cloud_secret);

        res.json({
            signature,
            timestamp,
            apiKey: process.env.CLOUDINARY_CLOUD_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to generate upload signature',
        });
    }
}
