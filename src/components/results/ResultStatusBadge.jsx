import {
  FileEdit,
  CheckCircle2,
  Rocket,
  Send,
  XCircle,
  Clock3,
  Award,
} from "lucide-react";

export default function ResultStatusBadge({
  status = "draft",
}) {
  const value = String(status).trim().toLowerCase();

  const statusMap = {
    // ===== Result Workflow =====

    draft: {
      label: "Draft",
      icon: FileEdit,
      bg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },

    approved: {
      label: "Approved",
      icon: CheckCircle2,
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },

    published: {
      label: "Published",
      icon: Rocket,
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },

    sent: {
      label: "Sent",
      icon: Send,
      bg: "bg-purple-100",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },

    rejected: {
      label: "Rejected",
      icon: XCircle,
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },

    pending: {
      label: "Pending",
      icon: Clock3,
      bg: "bg-gray-100",
      text: "text-gray-700",
      dot: "bg-gray-500",
    },

    // ===== Grades =====

    a: {
      label: "A",
      icon: Award,
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },

    b: {
      label: "B",
      icon: Award,
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },

    c: {
      label: "C",
      icon: Award,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
    },

    d: {
      label: "D",
      icon: Award,
      bg: "bg-orange-100",
      text: "text-orange-700",
      dot: "bg-orange-500",
    },

    e: {
      label: "E",
      icon: Award,
      bg: "bg-purple-100",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },

    f: {
      label: "F",
      icon: Award,
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  };

  const current = statusMap[value] || statusMap.pending;

  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${current.bg}
        ${current.text}
      `}
    >
      <span
        className={`w-2 h-2 rounded-full ${current.dot}`}
      />

      <Icon size={14} />

      {current.label}
    </span>
  );
}