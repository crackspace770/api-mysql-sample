import multer from 'multer';

const storage = multer.memoryStorage(); // Use diskStorage if needed
const upload = multer({ storage });

export default upload;  // Exporting upload as default
