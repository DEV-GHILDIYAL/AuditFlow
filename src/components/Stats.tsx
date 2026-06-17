import React from 'react';
import { Play, Square, Download, Layers, FileText, CheckCircle2, XCircle, AlertTriangle, RotateCw, Sparkles } from 'lucide-react';
import type { AuditResult } from '../utils/auditEngine';

interface StatsProps {
  rowCount: number;
  sectionCount: number;
  auditStatus: 'idle' | 'running' | 'stopped' | 'completed';
  currentActivityText: string;
  results: Record<number, AuditResult>;
  estimatedTimeRemaining: number | null;
  onStartAudit: () => void;
  onStopAudit: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export const Stats: React.FC<StatsProps> = ({
  rowCount,
  sectionCount,
  auditStatus,
  currentActivityText,
  results,
  estimatedTimeRemaining,
  onStartAudit,
  onStopAudit,
  onDownload,
  onReset,
}) => {
  const resultValues = Object.values(results);
  const completedCount = resultValues.filter(r => r.status !== 'pending' && r.status !== 'running').length;
  
  // Progress Percent
  const progressPercent = rowCount > 0 ? Math.min(Math.round((completedCount / rowCount) * 100), 100) : 0;

  // Checks counts
  const getStatsForCheck = (key: 'heading' | 'body' | 'ctaText' | 'ctaUrl') => {
    const passed = resultValues.filter(r => r.status === 'pass' || (r.status !== 'error' && r.status !== 'skipped' && r[key] === true)).length;
    const failed = resultValues.filter(r => r.status === 'fail' && r[key] === false).length;
    return { passed, failed };
  };

  const headingStats = getStatsForCheck('heading');
  const bodyStats = getStatsForCheck('body');
  const ctaTextStats = getStatsForCheck('ctaText');
  const ctaUrlStats = getStatsForCheck('ctaUrl');

  const errorCount = resultValues.filter(r => r.status === 'error').length;
  const skippedCount = resultValues.filter(r => r.status === 'skipped').length;
  const hasResults = Object.keys(results).length > 0;
  const isRunning = auditStatus === 'running';

  // Determine colors and layout for the summary banner
  const renderSummaryBanner = () => {
    if (auditStatus !== 'completed' && auditStatus !== 'stopped') return null;

    const anyFail = resultValues.some(r => r.status === 'fail');
    const anyErrorOrSkip = resultValues.some(r => r.status === 'error' || r.status === 'skipped');

    if (anyFail) {
      return (
        <div className="flex gap-2.5 p-3 rounded-xl border border-red-500/25 bg-red-500/5 text-red-400 text-xs animate-fadeIn">
          <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Audit Failed</p>
            <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
              Compliance failures detected. Check red-highlighted rows below.
            </p>
          </div>
        </div>
      );
    }
    
    if (anyErrorOrSkip) {
      return (
        <div className="flex gap-2.5 p-3 rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-400 text-xs animate-fadeIn">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Audit Finished with Warnings</p>
            <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
              Check completed. Some pages returned loading errors or were skipped.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-2.5 p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 text-xs animate-fadeIn">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">All Checks Passed</p>
          <p className="text-[10px] text-slate-350 mt-0.5 leading-relaxed">
            Every page parsed met Heading, Body, CTA, and URL validation criteria!
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 p-5 rounded-2xl border border-darkBorder bg-darkCard/60 backdrop-blur-md shadow-xl">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-darkBorder/60">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Rows</p>
            <p className="text-lg font-extrabold font-outfit text-white leading-tight">{rowCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-darkBorder/60">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Sections</p>
            <p className="text-lg font-extrabold font-outfit text-white leading-tight">{sectionCount}</p>
          </div>
        </div>
      </div>

      {/* Progress & Time Remaining Card */}
      {auditStatus !== 'idle' && (
        <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">
              {isRunning ? 'Auditing compliance...' : auditStatus === 'completed' ? 'Audit Complete' : 'Stopped'}
            </span>
            <div className="flex items-center gap-2">
              {isRunning && estimatedTimeRemaining !== null && (
                <span className="text-[10px] text-slate-400 font-medium">
                  ~{estimatedTimeRemaining}s left
                </span>
              )}
              <span className="font-mono font-bold text-blue-400">{progressPercent}%</span>
            </div>
          </div>

          <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-md shadow-blue-500/20"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {isRunning && currentActivityText && (
            <p className="text-[9px] text-slate-400 truncate mt-0.5">
              {currentActivityText}
            </p>
          )}
        </div>
      )}

      {/* Summary colored banner */}
      {renderSummaryBanner()}

      {/* Check counts summary breakdown */}
      {hasResults && (
        <div className="flex flex-col gap-2 pt-1">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Report Aggregates</h4>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <span className="text-[9px] text-slate-500 font-semibold block">Heading Check</span>
              <div className="flex items-center gap-2.5 mt-1 font-mono text-[10px]">
                <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> {headingStats.passed}</span>
                <span className="text-red-400 flex items-center gap-0.5"><XCircle className="h-3 w-3" /> {headingStats.failed}</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <span className="text-[9px] text-slate-500 font-semibold block">Body Check</span>
              <div className="flex items-center gap-2.5 mt-1 font-mono text-[10px]">
                <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> {bodyStats.passed}</span>
                <span className="text-red-400 flex items-center gap-0.5"><XCircle className="h-3 w-3" /> {bodyStats.failed}</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <span className="text-[9px] text-slate-500 font-semibold block">CTA Text Check</span>
              <div className="flex items-center gap-2.5 mt-1 font-mono text-[10px]">
                <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> {ctaTextStats.passed}</span>
                <span className="text-red-400 flex items-center gap-0.5"><XCircle className="h-3 w-3" /> {ctaTextStats.failed}</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
              <span className="text-[9px] text-slate-500 font-semibold block">CTA URL Check</span>
              <div className="flex items-center gap-2.5 mt-1 font-mono text-[10px]">
                <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> {ctaUrlStats.passed}</span>
                <span className="text-red-400 flex items-center gap-0.5"><XCircle className="h-3 w-3" /> {ctaUrlStats.failed}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[9px] font-semibold mt-1">
            {errorCount > 0 && (
              <span className="flex items-center gap-1 text-amber-500 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">
                <AlertTriangle className="h-3 w-3" />
                {errorCount} Errors
              </span>
            )}
            {skippedCount > 0 && (
              <span className="flex items-center gap-1 text-slate-400 bg-slate-500/5 px-1.5 py-0.5 rounded border border-slate-700/30">
                <Sparkles className="h-3 w-3" />
                {skippedCount} Skipped
              </span>
            )}
          </div>
        </div>
      )}

      {/* Button Controls */}
      <div className="flex flex-col gap-2 pt-2 border-t border-darkBorder/40">
        <div className="flex gap-2">
          {isRunning ? (
            <button
              onClick={onStopAudit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-red-650 hover:bg-red-700 text-white shadow-lg shadow-red-600/10"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span>Stop Audit</span>
            </button>
          ) : (
            <button
              onClick={onStartAudit}
              disabled={rowCount === 0 || auditStatus === 'completed'}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border
                ${rowCount === 0 || auditStatus === 'completed'
                  ? 'bg-slate-800 text-slate-500 border-slate-750 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01] shadow-lg shadow-blue-600/15 border-blue-500/20'
                }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{auditStatus === 'stopped' ? 'Resume Audit' : 'Run Audit'}</span>
            </button>
          )}
        </div>

        {/* Download & Reset Section */}
        <div className="flex gap-2 w-full">
          <button
            onClick={onDownload}
            disabled={auditStatus !== 'completed'}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border
              ${auditStatus !== 'completed'
                ? 'bg-slate-800/50 text-slate-600 border-slate-750/30 cursor-not-allowed opacity-80'
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01] border-blue-500/20 shadow-lg shadow-blue-500/10'
              }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Results</span>
          </button>
          
          <button
            onClick={onReset}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-slate-600 text-slate-300"
            title="Reset AuditFlow"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
