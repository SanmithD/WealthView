import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import { Error } from './error.util.js';

const getData = (res) =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    const workbook = xlsx.readFile(join(__dirname, '../data.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const holdings = xlsx.utils.sheet_to_json(sheet);

    if(!holdings) return Error(404, false, 'Server error', res);

    return holdings;
}


export default getData;
