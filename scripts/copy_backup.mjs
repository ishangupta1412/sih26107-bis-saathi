import fs from 'fs';
import path from 'path';
import os from 'os';

const source = 'C:\\Users\\Ishan Gupta\\Desktop\\BIS_AI_Saathi_Complete_Backup.zip';
const home = os.homedir();

const destinations = [
  path.join(home, 'Downloads', 'BIS_AI_Saathi_Complete_Backup.zip'),
  path.join(home, 'OneDrive', 'Desktop', 'BIS_AI_Saathi_Complete_Backup.zip'),
  path.join(home, 'OneDrive', 'Desktop', 'BIS AI Saathi'),
  path.join(home, '.gemini', 'antigravity', 'scratch', 'bisassist', 'public', 'BIS_AI_Saathi_Complete_Backup.zip'),
  path.join(home, '.gemini', 'antigravity', 'brain', 'ad8e2066-f5e3-4f09-a86f-9fe4b4378f47', 'BIS_AI_Saathi_Complete_Backup.zip'),
];

console.log('Source zip exists:', fs.existsSync(source));

for (const dest of destinations) {
  try {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log('Copied to:', dest);
    }
  } catch (err) {
    console.error('Error copying to', dest, err.message);
  }
}
