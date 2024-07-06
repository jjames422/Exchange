

import multer from 'multer';
import nextConnect from 'next-connect';
import fs from 'fs';
import path from 'path';
import { parseMT103File } from '@/lib/mt103Parser';
import { convertFiatToCrypto } from '@/lib/conversionService';

// Create the upload directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Store files in this directory
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  const filePath = req.file.path;
  const transactionDetails = await parseMT103File(filePath);
  const conversionResult = await convertFiatToCrypto(transactionDetails);
  res.status(200).json({ success: true, result: conversionResult });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so `multer` can handle the files
  },
};
