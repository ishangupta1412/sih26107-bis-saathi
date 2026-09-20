import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const home = os.homedir();
const srcDir = 'C:\\Users\\Ishan Gupta\\.gemini\\antigravity\\scratch\\bisassist';
const desktopDir = path.join(home, 'Desktop', 'BIS AI Saathi');
const oneDriveDesktopDir = path.join(home, 'OneDrive', 'Desktop', 'BIS AI Saathi');

console.log('Synchronizing folder contents...');
try {
  execSync(`robocopy "${srcDir}" "${desktopDir}" /E /XD node_modules .next /XF .git`, { stdio: 'ignore' });
} catch (e) {}

try {
  if (fs.existsSync(path.join(home, 'OneDrive', 'Desktop'))) {
    execSync(`robocopy "${srcDir}" "${oneDriveDesktopDir}" /E /XD node_modules .next /XF .git`, { stdio: 'ignore' });
  }
} catch (e) {}

const zipDest1 = path.join(home, 'Desktop', 'BIS_AI_Saathi_Complete_Backup.zip');
const zipDest2 = path.join(home, 'OneDrive', 'Desktop', 'BIS_AI_Saathi_Complete_Backup.zip');
const zipDest3 = path.join(home, 'Downloads', 'BIS_AI_Saathi_Complete_Backup.zip');
const zipDest4 = path.join(srcDir, 'public', 'BIS_AI_Saathi_Complete_Backup.zip');

console.log('Generating fresh master zip file...');
execSync(`powershell -Command "Compress-Archive -Path '${desktopDir}\\*' -DestinationPath '${zipDest1}' -Force"`);

if (fs.existsSync(path.dirname(zipDest2))) {
  fs.copyFileSync(zipDest1, zipDest2);
  console.log('Updated OneDrive Desktop zip:', zipDest2);
}
if (fs.existsSync(path.dirname(zipDest3))) {
  fs.copyFileSync(zipDest1, zipDest3);
  console.log('Updated Downloads zip:', zipDest3);
}
if (fs.existsSync(path.dirname(zipDest4))) {
  fs.copyFileSync(zipDest1, zipDest4);
  console.log('Updated Public web zip:', zipDest4);
}

console.log('SUCCESS: All folders and zip archives updated with the latest code!');
