import { CheckCircle2 } from "lucide-react";

interface SyncIndicatorProps {
  show: boolean;
}

export const SyncIndicator = ({ show }: SyncIndicatorProps) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle2 size={18} />
      <span className="text-sm font-medium">Changes synced across tabs</span>
    </div>
  );
};
