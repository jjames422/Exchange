const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '.'); // Match the baseUrl in jsconfig.json

const updateImportPaths = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');

  const updatedContent = content
    .replace(/from '@components\//g, "from '@/components/")
    .replace(/from '@lib\//g, "from '@/lib/")
    .replace(/from '@app\//g, "from '@/app/")
    .replace(/from '@public\//g, "from '@/public/")
    .replace(/from '@styles\//g, "from '@/styles/")
    .replace(/from '\.\/components\//g, "from '@/components/")
    .replace(/from '\.\/lib\//g, "from '@/lib/")
    .replace(/from '\.\/api\//g, "from '@/api/")
    .replace(/from '\.\/globals.css'/g, "from '@/globals.css'")
    .replace(/from '\.\/public\//g, "from '@/public/")
    .replace(/from '\.\/styles\//g, "from '@/styles/");

  fs.writeFileSync(filePath, updatedContent, 'utf-8');
};

const traverseDirectory = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        traverseDirectory(filePath);
      }
    } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.jsx'))) {
      console.log(`Updating imports in: ${filePath}`);
      updateImportPaths(filePath);
    }
  });
};

traverseDirectory(projectRoot);

console.log('Import paths updated successfully.');
