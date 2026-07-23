import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'temple_data.json');

export function getTempleData() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return null;
    }
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading temple data store:', error);
    return null;
  }
}

export function saveTempleData(data) {
  try {
    const dirPath = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
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
