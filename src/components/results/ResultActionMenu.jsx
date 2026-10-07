import {
  Eye,
  Pencil,
  Send,
  FileText,
  Trash2,
} from "lucide-react";

export default function ResultActionMenu({
  onView,
  onEdit,
  onSend,
  onPDF,
  onDelete,
  compact = false,
  disabled = false,
}) {
  const actions = [
    {
      label: "View",
      icon: Eye,
      color:
        "text-blue-600 hover:bg-blue-50 hover:border-blue-200",
      onClick: onView,
    },
    {
      label: "Edit",
      icon: Pencil,
      color:
        "text-amber-600 hover:bg-amber-50 hover:border-amber-200",
      onClick: onEdit,
    },
    {
      label: "Send",
      icon: Send,
      color:
        "text-green-600 hover:bg-green-50 hover:border-green-200",
      onClick: onSend,
    },
    {
      label: "PDF",
      icon: FileText,
      color:
        "text-purple-600 hover:bg-purple-50 hover:border-purple-200",
      onClick: onPDF,
    },
    {
      label: "Delete",
      icon: Trash2,
      color:
        "text-red-600 hover:bg-red-50 hover:border-red-200",
      onClick: onDelete,
    },
  ];

  return (
    <div className="flex items-center justify-end gap-2">

      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            type="button"
            title={action.label}
            disabled={disabled}
            onClick={action.onClick}
            className={`
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-transparent
              transition-all
              duration-200
              ${compact ? "h-8 w-8" : "h-10 w-10"}
              ${action.color}
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-sm active:scale-95"
              }
            `}
          >
            <Icon
              size={compact ? 16 : 18}
              strokeWidth={2}
            />
          </button>
        );
      })}

    </div>
  );
}