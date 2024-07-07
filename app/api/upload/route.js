import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { parseMT103File } from '@/lib/parseMT103File';
import { updateFiatWallet } from '@/lib/db';
import { scheduleFileArchival } from '@/lib/scheduler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads');

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the file:', err);
      return res.status(500).json({ error: 'Error parsing the file.' });
    }

    const file = files.file;
    if (file) {
      const filePath = path.join(uploadDir, file.newFilename);
      try {
        const parsedData = await parseMT103File(filePath);
        await updateFiatWallet(parsedData);
        scheduleFileArchival(filePath);
        res.status(200).json({ message: 'File uploaded and processed successfully.' });
      } catch (error) {
        console.error('Error processing the file:', error);
        res.status(500).json({ error: 'Error processing the file.' });
      }
    } else {
      res.status(400).json({ error: 'No file uploaded.' });
    }
  });
}
