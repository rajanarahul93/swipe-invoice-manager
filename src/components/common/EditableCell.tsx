import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

interface EditableCellProps {
  value: string | number;
  onSave: (newValue: string) => void;
  type?: "text" | "number" | "date";
  isEmpty?: boolean;
}

export const EditableCell = ({
  value,
  onSave,
  type = "text",
  isEmpty = false,
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));

  useEffect(() => {
    setEditValue(String(value));
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(String(value));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <button
          onClick={handleSave}
          className="text-green-600 hover:text-green-800"
        >
          <Check size={16} />
        </button>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ${
        isEmpty ? "text-red-600 font-medium" : ""
      }`}
      title="Click to edit"
    >
      {value || <span className="text-gray-400 italic">Empty</span>}
    </div>
  );
};
