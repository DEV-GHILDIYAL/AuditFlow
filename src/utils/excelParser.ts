import * as XLSX from 'xlsx';

export interface ParsedRow {
  Country: string;
  Language: string;
  Placement: string;
  Pattern: string;
  'Heading copy': string;
  'Body copy': string;
  'Call to action copy': string;
  'Link to website': string;
  [key: string]: string; // Fallback index signature
}

export interface ParseResult {
  data: ParsedRow[];
  sectionCount: number;
}

const REQUIRED_HEADERS = [
  'Country',
  'Language',
  'Placement',
  'Pattern',
  'Heading copy',
  'Body copy',
  'Call to action copy',
  'Link to website'
];

/**
 * Checks if a row is completely blank.
 */
function isBlankRow(row: any[]): boolean {
  if (!row || row.length === 0) return true;
  return row.every(cell => cell === undefined || cell === null || String(cell).trim() === '');
}

/**
 * Parses an Excel file with irregular structure.
 * Scans top-to-bottom for the header row containing all 8 required columns (case-insensitive).
 * Subsequent rows are parsed as data until a blank row is met.
 * Continues scanning for additional header rows and sections.
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
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        if (!sheet) {
          throw new Error('The workbook contains no sheets.');
        }

        // Convert the sheet to a 2D array, preserving empty cells as empty strings
        const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });

        const parsedData: ParsedRow[] = [];
        let sectionCount = 0;
        let isParsingData = false;
        
        // Maps lowercased required header to its index in the current header row
        let headerIndexMap: Record<string, number> = {};

        for (let r = 0; r < rows.length; r++) {
          const row = rows[r];

          if (!isParsingData) {
            // Scan for header row containing all REQUIRED_HEADERS (case-insensitive)
            const rowStringsLower = row.map(cell => 
              cell !== undefined && cell !== null ? String(cell).trim().toLowerCase() : ''
            );

            const hasAllHeaders = REQUIRED_HEADERS.every(reqHeader => 
              rowStringsLower.includes(reqHeader.toLowerCase())
            );

            if (hasAllHeaders) {
              // Found a header row! Build mapping of lowercase required header -> column index
              headerIndexMap = {};
              REQUIRED_HEADERS.forEach(reqHeader => {
                const targetLower = reqHeader.toLowerCase();
                const index = rowStringsLower.indexOf(targetLower);
                headerIndexMap[targetLower] = index;
              });

              isParsingData = true;
              sectionCount++;
            }
          } else {
            // Currently parsing data rows for a section
            if (isBlankRow(row)) {
              // A blank row ends the current section's data rows
              isParsingData = false;
              headerIndexMap = {};
            } else {
              // Map the row data back to the original casing of the REQUIRED_HEADERS
              const dataRow: any = {};
              REQUIRED_HEADERS.forEach(reqHeader => {
                const colIdx = headerIndexMap[reqHeader.toLowerCase()];
                const cellVal = row[colIdx];
                dataRow[reqHeader] = cellVal !== undefined && cellVal !== null ? String(cellVal).trim() : '';
              });

              parsedData.push(dataRow as ParsedRow);
            }
          }
        }

        resolve({
          data: parsedData,
          sectionCount
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
