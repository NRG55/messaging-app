import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'messaging-app/images'; 
        let transformation = [{ width: 1200, height: 1200, crop: 'limit' }];
        
        if (file.fieldname === 'avatar' || file.fieldname === 'chatAvatar') {
            folder = 'messaging-app/avatars';
            transformation = [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }];
        }

        return {
            folder,
            transformation,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        };
    },
});

export default multer({
    storage: cloudinaryStorage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit
    },
});