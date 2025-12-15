import { X } from "lucide-react";
import { FileUploadZone } from "./FileUploadZone";
import { FilePreview } from "./FilePreview";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  onProcessFiles: () => void;
  isProcessing: boolean;
}

export const FileUploadModal = ({
  isOpen,
  onClose,
  files,
  onFilesAdded,
  onFileRemove,
  onProcessFiles,
  isProcessing,
}: FileUploadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upload Files</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <FileUploadZone onFilesAdded={onFilesAdded} />
          {files.length > 0 && (
            <FilePreview files={files} onRemove={onFileRemove} />
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={onProcessFiles}
            disabled={files.length === 0 || isProcessing}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
          >
            {isProcessing
              ? "Processing..."
              : `Process ${files.length} file${files.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};
