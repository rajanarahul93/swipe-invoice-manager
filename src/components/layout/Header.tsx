import { Upload } from "lucide-react";

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Swipe Invoice Manager
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Automated data extraction and management
          </p>
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
        >
          <Upload size={18} />
          Upload Files
        </button>
      </div>
    </header>
  );
};
