import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, X, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  selectedFile: File | null;
  error: string | null;
  isParsing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  onClear,
  selectedFile,
  error,
  isParsing,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateAndSelectFile = (file: File) => {
    const validExtensions = ['.xlsx', '.xls', '.xlsm'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      alert('Invalid file format. Please upload an Excel sheet (.xlsx, .xls, or .xlsm).');
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="relative flex items-center justify-between p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate max-w-[250px] sm:max-w-md">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready to audit
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
            title="Clear file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`relative flex flex-col items-center justify-center w-full h-56 px-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 outline-none
            ${isDragActive 
              ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10 scale-[1.01]' 
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".xlsx, .xls, .xlsm"
            onChange={handleFileInputChange}
          />

          <div className="flex flex-col items-center text-center">
            <div className={`p-4 mb-4 rounded-2xl bg-slate-800/80 text-slate-400 border border-slate-700/50 shadow-inner transition-transform duration-300
              ${isDragActive ? 'scale-110 text-blue-400 border-blue-500/30' : ''}`}
            >
              <Upload className={`h-6 w-6 ${isParsing ? 'animate-bounce' : ''}`} />
            </div>
            <p className="text-sm font-medium text-slate-200">
              <span className="text-blue-400 font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1.5 text-xs text-slate-500">
              Excel files (.xlsx, .xls, .xlsm) with irregular sections
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2.5 p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs animate-fadeIn">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Parsing Failed</p>
            <p className="mt-0.5 text-slate-300 leading-relaxed">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
