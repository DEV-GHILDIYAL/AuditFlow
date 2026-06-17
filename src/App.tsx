import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { PreviewTable } from './components/PreviewTable';
import { Stats } from './components/Stats';
import { parseExcelFile, type ParsedRow } from './utils/excelParser';
import { runAuditForRow, type AuditResult } from './utils/auditEngine';
import { exportAuditResults } from './utils/excelExporter';
import { FileSpreadsheet, Sparkles, RefreshCw } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [sectionCount, setSectionCount] = useState<number>(0);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Compliance Audit Engine States
  const [auditStatus, setAuditStatus] = useState<'idle' | 'running' | 'stopped' | 'completed'>('idle');
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(-1);
  const [currentActivityText, setCurrentActivityText] = useState<string>('');
  const [auditResults, setAuditResults] = useState<Record<number, AuditResult>>({});
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null);

  const stopRequestedRef = useRef<boolean>(false);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsParsing(true);
    setError(null);
    setAuditStatus('idle');
    setAuditResults({});
    setCurrentRowIndex(-1);
    setCurrentActivityText('');
    setEstimatedTimeRemaining(null);

    try {
      const result = await parseExcelFile(file);
      setParsedRows(result.data);
      setSectionCount(result.sectionCount);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to parse the Excel file. Please ensure it follows a valid layout.'
      );
      setParsedRows([]);
      setSectionCount(0);
    } finally {
      setIsParsing(false);
    }
  };

  const handleClear = () => {
    stopRequestedRef.current = true; // Terminate any active audit loop
    setSelectedFile(null);
    setParsedRows([]);
    setSectionCount(0);
    setError(null);
    setAuditStatus('idle');
    setAuditResults({});
    setCurrentRowIndex(-1);
    setCurrentActivityText('');
    setEstimatedTimeRemaining(null);
  };

  const startAudit = async () => {
    if (parsedRows.length === 0 || auditStatus === 'running') return;

    stopRequestedRef.current = false;
    setAuditStatus('running');

    // Find the next row to audit (useful for resumes)
    let startIndex = 0;
    for (let i = 0; i < parsedRows.length; i++) {
      if (!auditResults[i] || auditResults[i].status === 'pending' || auditResults[i].status === 'running') {
        startIndex = i;
        break;
      }
    }

    // Initialize all pending rows in results state if not done yet
    setAuditResults(prev => {
      const next = { ...prev };
      for (let i = startIndex; i < parsedRows.length; i++) {
        if (!next[i]) {
          next[i] = {
            status: 'pending',
            heading: false,
            body: false,
            ctaText: false,
            ctaUrl: false,
          };
        }
      }
      return next;
    });

    const runStartTime = Date.now();
    let processedInRun = 0;

    for (let i = startIndex; i < parsedRows.length; i++) {
      if (stopRequestedRef.current) {
        setAuditStatus('stopped');
        setEstimatedTimeRemaining(null);
        return;
      }

      // Calculate estimated time remaining
      const remainingRows = parsedRows.length - i;
      if (processedInRun > 0) {
        const elapsedSeconds = (Date.now() - runStartTime) / 1000;
        const avgTime = elapsedSeconds / processedInRun;
        setEstimatedTimeRemaining(Math.round(remainingRows * avgTime));
      } else {
        // Fallback default: 1.8 seconds per row (fetch + 1s delay)
        setEstimatedTimeRemaining(Math.round(remainingRows * 1.8));
      }

      setCurrentRowIndex(i);
      const row = parsedRows[i];
      setCurrentActivityText(`Auditing row ${i + 1} of ${parsedRows.length} — ${row.Country || 'Unknown'} / ${row.Language || 'Unknown'}`);

      // Set state to running for current row
      setAuditResults(prev => ({
        ...prev,
        [i]: {
          status: 'running',
          heading: false,
          body: false,
          ctaText: false,
          ctaUrl: false,
        }
      }));

      // Trigger compliance checks
      const result = await runAuditForRow(row);

      // Save results
      setAuditResults(prev => ({
        ...prev,
        [i]: result
      }));

      processedInRun++;

      // Sequential delay of 1000ms between network requests to avoid rate limits
      if (i < parsedRows.length - 1 && !stopRequestedRef.current) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setEstimatedTimeRemaining(null);
    if (stopRequestedRef.current) {
      setAuditStatus('stopped');
    } else {
      setAuditStatus('completed');
    }
  };

  const stopAudit = () => {
    stopRequestedRef.current = true;
    setAuditStatus('stopped');
    setEstimatedTimeRemaining(null);
    
    // Reset the currently checked row status back to pending if it was cut off
    setAuditResults(prev => {
      const next = { ...prev };
      if (currentRowIndex >= 0 && next[currentRowIndex]?.status === 'running') {
        next[currentRowIndex] = {
          status: 'pending',
          heading: false,
          body: false,
          ctaText: false,
          ctaUrl: false,
        };
      }
      return next;
    });
  };

  const handleDownload = () => {
    if (parsedRows.length === 0) return;
    exportAuditResults(parsedRows, auditResults);
  };

  // Re-run compliance checks for a single specific row index
  const handleRetry = async (index: number) => {
    if (auditStatus === 'running') return; // Disable retry action while active scan loop runs

    // Temporarily show row is running
    setAuditResults(prev => ({
      ...prev,
      [index]: {
        status: 'running',
        heading: false,
        body: false,
        ctaText: false,
        ctaUrl: false,
      }
    }));

    const result = await runAuditForRow(parsedRows[index]);

    setAuditResults(prev => ({
      ...prev,
      [index]: result
    }));
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Intro Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-950/20 to-purple-950/20 p-6 rounded-2xl border border-blue-950/40">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight font-outfit text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              Content Audit Module
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-xl">
              AuditFlow inspects content layouts. In Phase 3, we add retry actions, sticky column freezing, AbortController timeouts, and full Excel summary exports.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              Phase 3 Active
            </span>
          </div>
        </div>

        {/* Upload & Stats Controls grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="text-slate-400 h-4.5 w-4.5" />
              <h2 className="text-sm font-semibold text-slate-300">File Ingestion</h2>
            </div>
            <UploadZone
              onFileSelect={handleFileSelect}
              onClear={handleClear}
              selectedFile={selectedFile}
              error={error}
              isParsing={isParsing}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-slate-300">Audit Status & Controls</h2>
            <Stats 
              rowCount={parsedRows.length} 
              sectionCount={sectionCount} 
              auditStatus={auditStatus}
              currentActivityText={currentActivityText}
              results={auditResults}
              estimatedTimeRemaining={estimatedTimeRemaining}
              onStartAudit={startAudit}
              onStopAudit={stopAudit}
              onDownload={handleDownload}
              onReset={handleClear}
            />
          </div>
        </div>

        {/* Parsing Loader */}
        {isParsing && (
          <div className="flex flex-col items-center justify-center p-12 gap-3 text-slate-400">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-xs font-medium">Reading spreadsheet layouts...</p>
          </div>
        )}

        {/* Preview and Compliance Results Table */}
        {!isParsing && (
          <div className="mt-2">
            <PreviewTable 
              rows={parsedRows} 
              results={auditResults} 
              onRetry={handleRetry}
              isMainAuditRunning={auditStatus === 'running'}
            />
          </div>
        )}
      </main>
      
      <footer className="border-t border-darkBorder py-6 text-center text-[10px] text-slate-500 bg-darkCard/20">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 AuditFlow System. Built for automated digital layout and copy compliance.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
