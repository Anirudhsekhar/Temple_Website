import fs from 'fs';
import path from 'path';

// On Vercel, process.cwd() is read-only. We must write to /tmp.
const IS_VERCEL = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const REPO_DATA_PATH = path.join(process.cwd(), 'data', 'temple_data.json');
const TMP_DATA_PATH = IS_VERCEL ? path.join('/tmp', 'temple_data.json') : REPO_DATA_PATH;

export function getTempleData() {
  try {
    // 1. Try to read from the writable location first (has latest changes)
    if (fs.existsSync(TMP_DATA_PATH)) {
      const data = fs.readFileSync(TMP_DATA_PATH, 'utf8');
      return JSON.parse(data);
    }
    // 2. Fallback to the original repo data if no changes have been made yet
    if (fs.existsSync(REPO_DATA_PATH)) {
      const data = fs.readFileSync(REPO_DATA_PATH, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error reading temple data store:', error);
    return null;
  }
}

export function saveTempleData(data) {
  try {
    const dirPath = path.dirname(TMP_DATA_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(TMP_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to temple data store:', error);
    return false;
  }
}

export function getSection(sectionName) {
  const data = getTempleData();
  return data ? data[sectionName] : null;
}

export function updateSection(sectionName, newContent) {
  const data = getTempleData() || {};
  data[sectionName] = newContent;
  return saveTempleData(data);
}
