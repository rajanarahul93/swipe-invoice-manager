import { AlertCircle } from "lucide-react";

interface ErrorBadgeProps {
  message: string;
}

export const ErrorBadge = ({ message }: ErrorBadgeProps) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">
      <AlertCircle size={12} />
      {message}
    </span>
  );
};
