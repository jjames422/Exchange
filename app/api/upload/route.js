import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import { parseMT103File } from '@/lib/parseMT103File';
import { scheduleFileArchival } from '@/lib/scheduler';

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error in request handling:', error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('File upload failed');
    }
    const filePath = req.file.path;
    const parsedData = await parseMT103File(filePath);
    
    // Schedule file archival
    scheduleFileArchival(filePath);

    // Here you would add the parsed data to the user's fiat wallet
    console.log('Parsed Data:', parsedData);

    res.status(200).json({ message: 'File uploaded and parsed successfully', data: parsedData });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: `Failed to process file: ${error.message}` });
  }
});

export default apiRoute;
