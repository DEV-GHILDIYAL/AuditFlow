import React from 'react';
import { Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-darkBorder bg-darkCard/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20">
              <Cpu className="h-5 w-5" />
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-400 animate-ping" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight font-outfit gradient-text">
                AuditFlow
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                v1.0.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart Parser Engine</span>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-200"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
