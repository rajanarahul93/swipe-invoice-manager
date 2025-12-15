import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
}

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-excel": [".xls"],
};

export const FileUploadZone = ({ onFilesAdded }: FileUploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-gray-900 bg-gray-50"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-4 text-gray-400" size={40} />
      <p className="text-sm font-medium text-gray-700 mb-1">
        Drop files here or click to browse
      </p>
      <p className="text-xs text-gray-500">
        Supports PDF, JPG, PNG, Excel (.xlsx, .xls)
      </p>
    </div>
  );
};
