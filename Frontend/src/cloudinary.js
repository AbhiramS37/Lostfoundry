import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'lostandfound');

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dj82z7cqr/image/upload',
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
