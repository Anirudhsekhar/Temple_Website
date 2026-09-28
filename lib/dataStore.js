import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Local fallback setup
const IS_VERCEL = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const REPO_DATA_PATH = path.join(process.cwd(), 'data', 'temple_data.json');
const TMP_DATA_PATH = IS_VERCEL ? path.join('/tmp', 'temple_data.json') : REPO_DATA_PATH;

export async function getTempleData() {
  try {
    // If Supabase is configured, fetch from it
    if (supabase) {
      const { data, error } = await supabase
        .from('json_store')
        .select('data')
        .eq('id', 'temple_data')
        .single();
      
      if (!error && data) {
        return data.data;
      }
      // If table doesn't exist or row doesn't exist, we will fallback to local file
      console.log('Supabase read failed or empty, falling back to local file.', error?.message);
    }

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

export async function saveTempleData(data) {
  try {
    // If Supabase is configured, write to it
    if (supabase) {
      const { error } = await supabase
        .from('json_store')
        .upsert({ id: 'temple_data', data: data }, { onConflict: 'id' });
      
      if (!error) {
        return true;
      }
      console.error('Supabase write error:', error.message);
    }

    // Write locally as well/fallback
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

export async function getSection(sectionName) {
  const data = await getTempleData();
  return data ? data[sectionName] : null;
}

export async function updateSection(sectionName, newContent) {
  const data = (await getTempleData()) || {};
  data[sectionName] = newContent;
  return await saveTempleData(data);
}
