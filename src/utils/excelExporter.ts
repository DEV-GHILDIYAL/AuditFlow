import * as XLSX from 'xlsx';
import type { ParsedRow } from './excelParser';
import type { AuditResult } from './auditEngine';

/**
 * Appends audit check results, formats them, and creates a dual-sheet Excel export:
 * 1. Compliance Report (original rows + 4 checks)
 * 2. Summary (total Passed, Failed, Errors, and Skipped per check type)
 */
export function exportAuditResults(
  originalRows: ParsedRow[],
  results: Record<number, AuditResult>
): void {
  const resultValues = Object.values(results);

  // Helper to format values for cells
  const getStatusText = (val: boolean | 'skipped' | undefined, status: string | undefined, errorMsg?: string) => {
    if (status === 'skipped' || val === 'skipped') return '⚠️ Skipped';
    if (status === 'error') return `⚠️ Error: ${errorMsg || 'Connection Failed'}`;
    if (status === 'pending' || status === 'running' || status === undefined) return 'Pending';
    return val ? '✅ Pass' : '❌ Fail';
  };

  // 1. Build Compliance Report Sheet Data
  const reportData = originalRows.map((row, idx) => {
    const res = results[idx];
    return {
      Country: row.Country,
      Language: row.Language,
      Url: row.Url,
      Placement: row.Placement,
      Pattern: row.Pattern,
      'Heading copy': row['Heading copy'],
      'Body copy': row['Body copy'],
      'Call to action copy': row['Call to action copy'],
      'Link to': row['Link to'],
      'Heading Check': getStatusText(res?.heading, res?.status, res?.error),
      'Body Check': getStatusText(res?.body, res?.status, res?.error),
      'CTA Text Check': getStatusText(res?.ctaText, res?.status, res?.error),
      'CTA URL Check': getStatusText(res?.ctaUrl, res?.status, res?.error),
    };
  });

  const wsReport = XLSX.utils.json_to_sheet(reportData);

  // Auto-width columns for clean display
  const colHeaders = ['Country', 'Language', 'Url', 'Placement', 'Pattern', 'Heading copy', 'Body copy', 'Call to action copy', 'Link to', 'Heading Check', 'Body Check', 'CTA Text Check', 'CTA URL Check'];
  wsReport['!cols'] = colHeaders.map(col => ({
    wch: Math.max(col.length + 3, 16)
  }));

  // 2. Build Summary Sheet Data
  const getCountsForCheck = (key: 'heading' | 'body' | 'ctaText' | 'ctaUrl') => {
    let passed = 0;
    let failed = 0;
    let errors = 0;
    let skipped = 0;

    resultValues.forEach(r => {
      if (r.status === 'skipped' || r[key] === 'skipped') {
        skipped++;
      } else if (r.status === 'error') {
        errors++;
      } else if (r.status === 'pass' || r[key] === true) {
        passed++;
      } else if (r.status === 'fail' || r[key] === false) {
        failed++;
      }
    });

    return { passed, failed, errors, skipped };
  };

  const headingCounts = getCountsForCheck('heading');
  const bodyCounts = getCountsForCheck('body');
  const ctaTextCounts = getCountsForCheck('ctaText');
  const ctaUrlCounts = getCountsForCheck('ctaUrl');

  const summaryData = [
    {
      'Check Type': 'Heading Check',
      Passed: headingCounts.passed,
      Failed: headingCounts.failed,
      Errors: headingCounts.errors,
      Skipped: headingCounts.skipped,
    },
    {
      'Check Type': 'Body Check',
      Passed: bodyCounts.passed,
      Failed: bodyCounts.failed,
      Errors: bodyCounts.errors,
      Skipped: bodyCounts.skipped,
    },
    {
      'Check Type': 'CTA Text Check',
      Passed: ctaTextCounts.passed,
      Failed: ctaTextCounts.failed,
      Errors: ctaTextCounts.errors,
      Skipped: ctaTextCounts.skipped,
    },
    {
      'Check Type': 'CTA URL Check',
      Passed: ctaUrlCounts.passed,
      Failed: ctaUrlCounts.failed,
      Errors: ctaUrlCounts.errors,
      Skipped: ctaUrlCounts.skipped,
    },
  ];

  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  wsSummary['!cols'] = [
    { wch: 20 }, // Check Type
    { wch: 10 }, // Passed
    { wch: 10 }, // Failed
    { wch: 10 }, // Errors
    { wch: 10 }, // Skipped
  ];

  // 3. Construct Workbook and write out
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsReport, "Compliance Report");
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  XLSX.writeFile(wb, "auditflow_results.xlsx");
}
