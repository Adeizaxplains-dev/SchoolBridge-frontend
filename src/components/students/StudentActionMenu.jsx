// src/components/students/StudentActionMenu.jsx

import { useEffect, useRef, useState } from "react";

import {
  MoreVertical,
  Eye,
  Pencil,
  Users,
  School,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  BookOpen,
  Award,
  FileText,
  HeartPulse,
  ArrowRightLeft,
  GraduationCap,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";

export default function StudentActionMenu({
  student,
  loading = false,

  onView,
  onEdit,

  onAssignParent,
  onAssignClass,

  onAttendance,
  onResults,
  onSubjects,
  onFees,

  onDocuments,
  onMedical,
  onPromotion,
  onTransfer,

  onSuspend,
  onActivate,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const isSuspended =
    student?.status === "Suspended";

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
    >
      <button
        type="button"
        disabled={loading}
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-[520px] w-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

          <MenuItem
            icon={Eye}
            label="View Profile"
            onClick={() => {
              setOpen(false);
              onView?.(student);
            }}
          />

          <MenuItem
            icon={Pencil}
            label="Edit Student"
            onClick={() => {
              setOpen(false);
              onEdit?.(student);
            }}
          />

          <div className="my-1 border-t" />

          <MenuItem
            icon={Users}
            label="Assign Parent"
            onClick={() => {
              setOpen(false);
              onAssignParent?.(student);
            }}
          />

          <MenuItem
            icon={School}
            label="Assign Class"
            onClick={() => {
              setOpen(false);
              onAssignClass?.(student);
            }}
          />

          <div className="my-1 border-t" />

          <MenuItem
            icon={CalendarCheck}
            label="Attendance"
            onClick={() => {
              setOpen(false);
              onAttendance?.(student);
            }}
          />

          <MenuItem
            icon={ClipboardCheck}
            label="Results"
            onClick={() => {
              setOpen(false);
              onResults?.(student);
            }}
          />

          <MenuItem
            icon={BookOpen}
            label="Subjects"
            onClick={() => {
              setOpen(false);
              onSubjects?.(student);
            }}
          />

          <MenuItem
            icon={CreditCard}
            label="Fees & Payments"
            onClick={() => {
              setOpen(false);
              onFees?.(student);
            }}
          />

          <div className="my-1 border-t" />

          <MenuItem
            icon={FileText}
            label="Documents"
            onClick={() => {
              setOpen(false);
              onDocuments?.(student);
            }}
          />

          <MenuItem
            icon={HeartPulse}
            label="Medical Record"
            onClick={() => {
              setOpen(false);
              onMedical?.(student);
            }}
          />

          <MenuItem
            icon={GraduationCap}
            label="Promotion"
            onClick={() => {
              setOpen(false);
              onPromotion?.(student);
            }}
          />

          <MenuItem
            icon={ArrowRightLeft}
            label="Transfer Student"
            onClick={() => {
              setOpen(false);
              onTransfer?.(student);
            }}
          />

          <div className="my-1 border-t" />

          {isSuspended ? (
            <MenuItem
              icon={UserCheck}
              label="Activate Student"
              className="text-emerald-600"
              onClick={() => {
                setOpen(false);
                onActivate?.(student);
              }}
            />
          ) : (
            <MenuItem
              icon={UserX}
              label="Suspend Student"
              className="text-amber-600"
              onClick={() => {
                setOpen(false);
                onSuspend?.(student);
              }}
            />
          )}

          <MenuItem
            icon={Trash2}
            label="Delete Student"
            className="text-red-600"
            onClick={() => {
              setOpen(false);
              onDelete?.(student);
            }}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-slate-100 ${className}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}