import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from '../config/cloudinary.js';

export const CloudinaryUtils = {
    async deleteImageByUrl(url) {
        if (!url || !url.includes('res.cloudinary.com')) {
            return null;
        }

        try {
            const publicId = extractPublicId(url);

            return await cloudinary.uploader.destroy(publicId);

        } catch (error) {
            console.error('Failed to remove old avatar from Cloudinary:', error);
            return null;
        }
    },
};