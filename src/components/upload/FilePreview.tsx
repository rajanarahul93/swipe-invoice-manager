import { FileText, Image, Table, X } from "lucide-react";

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const getFileIcon = (file: File) => {
  if (file.type.includes("pdf"))
    return <FileText size={20} className="text-red-500" />;
  if (file.type.includes("image"))
    return <Image size={20} className="text-blue-500" />;
  if (file.type.includes("sheet") || file.type.includes("excel"))
    return <Table size={20} className="text-green-600" />;
  return <FileText size={20} className="text-gray-400" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">
        Selected Files ({files.length})
      </p>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
