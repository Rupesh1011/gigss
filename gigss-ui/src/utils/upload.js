import axios from 'axios';

const upload = async (file) => {

  if (!file) {
    console.error('No file provided for upload');
    return;
  }

  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'fiverr'); // Ensure this upload preset exists in your Cloudinary account

  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dal4bbjfo/image/upload', data);

    const { url } = res.data;
    return url;
    
  } catch (err) {
    console.error(err);
  }
};

export default upload;
