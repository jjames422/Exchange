import schedule from 'node-schedule';
import fs from 'fs';
import path from 'path';

const archiveDir = path.join(process.cwd(), 'archive');

// Ensure the archive directory exists
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir);
}

export function scheduleFileArchival(filePath) {
  const fileName = path.basename(filePath);
  const archivePath = path.join(archiveDir, fileName);

  // Schedule the file to be moved to the archive directory after 30 days
  schedule.scheduleJob('0 0 1 * *', () => {
    fs.rename(filePath, archivePath, (err) => {
      if (err) {
        console.error('Error archiving the file:', err);
      } else {
        console.log(`File ${fileName} archived successfully.`);
      }
    });
  });
}
