import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseMT103File } from '@/lib/parseMT103File';

const upload = multer({ dest: path.join(process.cwd(), 'uploads') });

export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const uploadMiddleware = upload.single('file');

export async function POST(req) {
  try {
    await runMiddleware(req, {}, uploadMiddleware);

    if (!req.file) {
      console.error('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = req.file.path;

    try {
      const parsedData = await parseMT103File(filePath);
      fs.unlinkSync(filePath);

      return NextResponse.json({ data: parsedData }, { status: 200 });
    } catch (error) {
      console.error('Error during file processing:', error);
      return NextResponse.json({ error: `File processing failed: ${error.message}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in file upload middleware:', error);
    return NextResponse.json({ error: `Upload middleware error: ${error.message}` }, { status: 500 });
  }
}

