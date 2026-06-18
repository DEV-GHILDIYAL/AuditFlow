import * as XLSX from 'xlsx';

export interface ParsedRow {
  Country: string;
  Language: string;
  Url: string;
  Placement: string;
  Pattern: string;
  'Heading copy': string;
  'Body copy': string;
  'Call to action copy': string;
  'Link to': string;
  [key: string]: string; // Fallback index signature
}

export interface ParseResult {
  data: ParsedRow[];
  sectionCount: number;
}

const REQUIRED_HEADERS = [
  'Country',
  'Language',
  'Url',
  'Placement',
  'Pattern',
  'Heading copy',
  'Body copy',
  'Call to action copy',
  'Link to'
];

/**
 * Checks if a row is completely blank.
 */
function isBlankRow(row: any[]): boolean {
  if (!row || row.length === 0) return true;
  return row.every(cell => cell === undefined || cell === null || String(cell).trim() === '');
}

/**
 * Parses an Excel file targeting specifically the sheet named "Data".
 * Scans Row 1 for headers containing all 9 required columns (case-insensitive).
 * Subsequent rows are parsed as data from Row 2 onwards until a completely blank row is encountered.
 */
export function parseExcelFile(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error('Could not read file data.');
        }

        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets['Data'];

        if (!sheet) {
          throw new Error("No 'Data' sheet found in this workbook.");
        }

        // Convert the sheet to a 2D array, preserving empty cells as empty strings
        const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });

        if (rows.length === 0) {
          throw new Error('The workbook sheet is empty.');
        }

        // Row 1 (index 0) contains the headers
        const headerRow = rows[0];
        const rowStringsLower = headerRow.map(cell => 
          cell !== undefined && cell !== null ? String(cell).trim().toLowerCase() : ''
        );

        const hasAllHeaders = REQUIRED_HEADERS.every(reqHeader => 
          rowStringsLower.includes(reqHeader.toLowerCase())
        );

        if (!hasAllHeaders) {
          throw new Error('Invalid sheet headers. Missing required columns.');
        }

        // Build mapping of lowercase required header -> column index
        const headerIndexMap: Record<string, number> = {};
        REQUIRED_HEADERS.forEach(reqHeader => {
          const targetLower = reqHeader.toLowerCase();
          const index = rowStringsLower.indexOf(targetLower);
          headerIndexMap[targetLower] = index;
        });

        const parsedData: ParsedRow[] = [];

        // Parse from Row 2 (index 1) onwards as data rows
        for (let r = 1; r < rows.length; r++) {
          const row = rows[r];

          if (isBlankRow(row)) {
            // Stop at first completely blank row
            break;
          }

          const dataRow: any = {};
          REQUIRED_HEADERS.forEach(reqHeader => {
            const colIdx = headerIndexMap[reqHeader.toLowerCase()];
            const cellVal = row[colIdx];
            dataRow[reqHeader] = cellVal !== undefined && cellVal !== null ? String(cellVal).trim() : '';
          });

          parsedData.push(dataRow as ParsedRow);
        }

        resolve({
          data: parsedData,
          sectionCount: 1 // Sections no longer exist, hardcode to 1
        });
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
