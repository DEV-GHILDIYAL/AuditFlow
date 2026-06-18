import React from 'react';
import type { ParsedRow } from '../utils/excelParser';
import type { AuditResult } from '../utils/auditEngine';
import { Database, Link2, Eye, RotateCw } from 'lucide-react';

interface PreviewTableProps {
  rows: ParsedRow[];
  results: Record<number, AuditResult>;
  onRetry: (index: number) => void;
  isMainAuditRunning: boolean;
}

export const PreviewTable: React.FC<PreviewTableProps> = ({
  rows,
  results,
  onRetry,
  isMainAuditRunning,
}) => {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-darkBorder bg-darkCard/40 text-slate-400 text-center">
        <div className="p-4 rounded-full bg-slate-800/50 mb-3 text-slate-500">
          <Database className="h-8 w-8" />
        </div>
        <p className="font-semibold text-slate-300">No data parsed yet</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Once you upload an Excel sheet, the parsed audit rows will be displayed in this preview table.
        </p>
      </div>
    );
  }

  const renderBadge = (checkVal: boolean | 'skipped', rowResult: AuditResult | undefined) => {
    if (!rowResult) {
      return <span className="text-slate-600 font-mono">—</span>;
    }
    
    const { status, error } = rowResult;

    if (status === 'pending') {
      return <span className="text-slate-500 font-mono text-[11px]">—</span>;
    }
    if (status === 'running') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Checking
        </span>
      );
    }
    if (status === 'skipped' || checkVal === 'skipped') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          ⚠️ Skipped
        </span>
      );
    }
    if (status === 'error') {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 cursor-help"
          title={error || 'Fetch or parsing failed'}
        >
          ⚠️ Error
        </span>
      );
    }
    
    return checkVal ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
        ✅ Pass
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/25">
        ❌ Fail
      </span>
    );
  };

  // Helper to retrieve row highlights and cell background alignments
  const getRowVisuals = (rowResult: AuditResult | undefined) => {
    const baseRowClass = 'transition-colors duration-150 group';
    
    if (!rowResult || rowResult.status === 'pending') {
      return {
        rowClass: `${baseRowClass} hover:bg-slate-800/30 text-slate-350`,
        cellBgClass: 'bg-[#080d16] group-hover:bg-[#121926]',
      };
    }
    if (rowResult.status === 'running') {
      return {
        rowClass: `${baseRowClass} bg-blue-500/5 hover:bg-blue-500/10 text-slate-200`,
        cellBgClass: 'bg-[#0b1222] group-hover:bg-[#131d33]',
      };
    }
    if (rowResult.status === 'skipped') {
      return {
        rowClass: `${baseRowClass} bg-amber-500/5 hover:bg-amber-500/10 text-amber-200 border-l-2 border-l-amber-500/50`,
        cellBgClass: 'bg-[#0d1016] group-hover:bg-[#191920]',
      };
    }
    if (rowResult.status === 'error') {
      return {
        rowClass: `${baseRowClass} bg-amber-500/5 hover:bg-amber-500/10 text-amber-200 border-l-2 border-l-amber-500/50`,
        cellBgClass: 'bg-[#0d1016] group-hover:bg-[#191920]',
      };
    }
    if (rowResult.status === 'fail') {
      return {
        rowClass: `${baseRowClass} bg-red-500/5 hover:bg-red-500/10 text-red-200 border-l-2 border-l-red-500/50`,
        cellBgClass: 'bg-[#100d16] group-hover:bg-[#1d1421]',
      };
    }
    
    // rowResult.status === 'pass'
    return {
      rowClass: `${baseRowClass} bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-100 border-l-2 border-l-emerald-500/50`,
      cellBgClass: 'bg-[#081216] group-hover:bg-[#112020]',
    };
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Eye className="text-slate-400 h-4.5 w-4.5" />
          <h3 className="text-sm font-semibold text-slate-300">Parsed Output & Compliance Preview</h3>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 tracking-wider">
          Double-Freeze Columns Active
        </span>
      </div>

      <div className="border border-darkBorder rounded-xl bg-darkCard/50 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-darkBorder bg-slate-900/90 text-slate-300 text-xs font-semibold uppercase tracking-wider sticky top-0 z-20 backdrop-blur-md">
                {/* Fixed Frozen Headers */}
                <th className="py-3 px-3 w-[65px] sticky left-0 bg-[#090d16] z-30 border-r border-darkBorder/60 shadow-md">#</th>
                <th className="py-3 px-4 w-[110px] sticky left-[65px] bg-[#090d16] z-30 border-r border-darkBorder/60 shadow-md">Country</th>
                <th className="py-3 px-4 w-[110px] sticky left-[175px] bg-[#090d16] z-30 border-r border-darkBorder/60 shadow-md">Language</th>
                
                {/* Scrollable headers */}
                <th className="py-3 px-4 w-[130px]">Placement</th>
                <th className="py-3 px-4 w-[130px]">Pattern</th>
                <th className="py-3 px-240 w-[240px]">Heading Copy</th>
                <th className="py-3 px-300 w-[300px]">Body Copy</th>
                <th className="py-3 px-4 w-[180px]">Call To Action Copy</th>
                <th className="py-3 px-4 w-[180px]">Url</th>
                <th className="py-3 px-4 w-[180px]">Link To</th>
                <th className="py-3 px-4 w-[110px] bg-slate-950/40 border-l border-darkBorder/40">Heading</th>
                <th className="py-3 px-4 w-[110px] bg-slate-950/40">Body</th>
                <th className="py-3 px-4 w-[110px] bg-slate-950/40">CTA Text</th>
                <th className="py-3 px-4 w-[110px] bg-slate-950/40">CTA URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-darkBorder/40 text-xs text-slate-300 font-sans">
              {rows.map((row, idx) => {
                const rowRes = results[idx];
                const { rowClass, cellBgClass } = getRowVisuals(rowRes);

                return (
                  <tr key={idx} className={rowClass}>
                    {/* Fixed Frozen Columns with Retry Controls */}
                    <td className={`py-2 px-3 sticky left-0 ${cellBgClass} z-10 border-r border-darkBorder/30 shadow-sm font-mono text-[10px] text-slate-500`}>
                      <div className="flex items-center justify-between w-full">
                        <span>{idx + 1}</span>
                        <button
                          onClick={() => onRetry(idx)}
                          disabled={isMainAuditRunning}
                          className={`p-1 rounded text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-all ml-1
                            ${isMainAuditRunning ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                          title="Re-run compliance check for this row"
                        >
                          <RotateCw className="h-3 w-3" />
                        </button>
                      </div>
                    </td>

                    <td className={`py-3 px-4 sticky left-[65px] ${cellBgClass} z-10 border-r border-darkBorder/30 shadow-sm font-semibold truncate`}>
                      {row.Country || '-'}
                    </td>
                    <td className={`py-3 px-4 sticky left-[175px] ${cellBgClass} z-10 border-r border-darkBorder/30 shadow-sm text-slate-400 truncate`}>
                      {row.Language || '-'}
                    </td>
                    
                    {/* Standard columns */}
                    <td className="py-3 px-4 truncate">{row.Placement || '-'}</td>
                    <td className="py-3 px-4 truncate font-mono text-[11px] text-slate-450">{row.Pattern || '-'}</td>
                    <td className="py-3 px-4">
                      <div className="line-clamp-2 hover:line-clamp-none transition-all duration-300 leading-relaxed text-slate-200">
                        {row['Heading copy'] || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="line-clamp-2 hover:line-clamp-none transition-all duration-300 leading-relaxed text-slate-350">
                        {row['Body copy'] || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="line-clamp-2 hover:line-clamp-none leading-relaxed text-blue-300/90 font-medium">
                        {row['Call to action copy'] || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {row.Url ? (
                        <a 
                          href={row.Url.startsWith('http') ? row.Url : `https://${row.Url}`}
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-slate-450 hover:text-blue-400 transition-colors group/link"
                        >
                          <Link2 className="h-3 w-3 text-slate-500 group-hover/link:text-blue-400" />
                          <span className="truncate max-w-[130px] inline-block underline decoration-slate-800 hover:decoration-blue-500">
                            {row.Url}
                          </span>
                        </a>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 truncate text-slate-350">
                      {row['Link to'] || '-'}
                    </td>
                    
                    {/* Audit Badges */}
                    <td className="py-3 px-4 bg-slate-950/15 border-l border-darkBorder/40">
                      {renderBadge(rowRes?.heading, rowRes)}
                    </td>
                    <td className="py-3 px-4 bg-slate-950/15">
                      {renderBadge(rowRes?.body, rowRes)}
                    </td>
                    <td className="py-3 px-4 bg-slate-950/15">
                      {renderBadge(rowRes?.ctaText, rowRes)}
                    </td>
                    <td className="py-3 px-4 bg-slate-950/15">
                      {renderBadge(rowRes?.ctaUrl, rowRes)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
