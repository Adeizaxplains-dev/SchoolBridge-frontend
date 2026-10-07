// ============================================================
// frontend/src/pages/admin/school-setup/OnboardingWizard.jsx
// SchoolBridge - school onboarding wizard
//
// The SERVER decides which steps are done (derived from real data),
// which are skippable and whether setup can be finished. The wizard
// only decides which step is currently on screen, so it can never
// get out of sync or loop.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Loader2,
  SkipForward,
} from "lucide-react";

import useOnboarding from "../../../hooks/useOnboarding";

import SchoolProfile from "./SchoolProfile";
import AcademicSession from "./AcademicSession";
import Terms from "./Terms";
import Classes from "./Classes";
import Arms from "./Arms";
import Subjects from "./Subjects";
import Departments from "./Departments";
import Houses from "./Houses";
import FeeStructure from "./FeeStructure";
import GradingSystem from "./GradingSystem";

// Order MUST match the backend STEP_SEQUENCE.
const STEPS = [
  { key: "school_profile", label: "School Profile", component: SchoolProfile },
  { key: "academic_session", label: "Academic Session", component: AcademicSession },
  { key: "terms", label: "Terms", component: Terms },
  { key: "classes", label: "Classes", component: Classes },
  { key: "arms", label: "Class Arms", component: Arms },
  { key: "subjects", label: "Subjects", component: Subjects },
  { key: "departments", label: "Departments", component: Departments },
  { key: "houses", label: "Houses", component: Houses },
  { key: "fee_structure", label: "Fee Structure", component: FeeStructure },
  { key: "grading_system", label: "Grading System", component: GradingSystem },
];

const REVIEW = "review";
const POLL_MS = 4000;

export default function OnboardingWizard() {
  const navigate = useNavigate();

  const {
    status,
    error,
    setError,
    refreshProgress,
    skipStep,
    completeOnboarding,
  } = useOnboarding();

  const [booting, setBooting] = useState(true);
  const [viewKey, setViewKey] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const stepState = useMemo(() => {
    const map = {};
    (status?.steps || []).forEach((s) => (map[s.step] = s));
    return map;
  }, [status]);

  const isResolved = (key) =>
    Boolean(stepState[key]?.completed || stepState[key]?.skipped);

  // The server's "next unresolved step" (or the review screen)
  const serverKey =
    !status || status.currentStep === "completed" ? REVIEW : status.currentStep;

  // ---------- first load: jump to where the server says we are ----------
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const result = await refreshProgress();
        if (!alive) return;
        const s = result?.onboarding;
        setViewKey(!s || s.currentStep === "completed" ? REVIEW : s.currentStep);
      } catch (err) {
        console.error("Failed to load onboarding status", err);
        setViewKey(STEPS[0].key);
      } finally {
        if (alive) setBooting(false);
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- keep progress fresh while the user edits data ----------
  // Most step pages are plain CRUD screens that do not call back, so we
  // re-read the server periodically (only while the tab is visible).
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        refreshProgress().catch(() => {});
      }
    }, POLL_MS);
    return () => clearInterval(id);
  }, [refreshProgress]);

  const activeKey = viewKey || serverKey;
  const index = STEPS.findIndex((s) => s.key === activeKey);
  const isReview = activeKey === REVIEW;
  const step = isReview ? null : STEPS[Math.max(0, index)];
  const Page = step?.component;
  const stepInfo = step ? stepState[step.key] : null;

  const goTo = (key) => {
    setNotice("");
    setError("");
    setViewKey(key);
  };

  const goNext = () => {
    if (isReview) return;
    const next = STEPS[index + 1];
    goTo(next ? next.key : REVIEW);
  };

  const goBack = () => {
    if (isReview) return goTo(STEPS[STEPS.length - 1].key);
    if (index > 0) goTo(STEPS[index - 1].key);
  };

  // Called by step pages that report a save (Profile, Session, Terms)
  const handleSaved = useCallback(async () => {
    try {
      const result = await refreshProgress();
      const s = result?.onboarding;
      setNotice("Saved successfully");
      setTimeout(() => setNotice(""), 2500);

      // move on automatically once the saved step is resolved
      const info = (s?.steps || []).find((x) => x.step === activeKey);
      if (info && (info.completed || info.skipped)) {
        const at = STEPS.findIndex((x) => x.key === activeKey);
        const next = STEPS[at + 1];
        setViewKey(next ? next.key : REVIEW);
      }
    } catch (err) {
      console.error("Failed to refresh onboarding", err);
    }
  }, [refreshProgress, activeKey]);

  const handleSkip = async () => {
    try {
      setBusy(true);
      await skipStep(step.key);
      goNext();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  const handleFinish = async () => {
    try {
      setBusy(true);
      await completeOnboarding();
      // shared auth state is updated -> the route guard now allows the console
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Finish onboarding error", err);
    } finally {
      setBusy(false);
    }
  };

  if (booting) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={45} />
      </div>
    );
  }

  const progress = status?.progress ?? 0;
  const remaining = status?.remainingRequired || [];
  const canComplete = Boolean(status?.canComplete);
  const labelOf = (key) => STEPS.find((s) => s.key === key)?.label || key;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* ---------- header ---------- */}
        <div className="mb-5 rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">
            Set up your school
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete the required steps to unlock your SchoolBridge dashboard.
            Optional steps can be skipped and finished later.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-12 text-right text-sm font-semibold text-slate-700">
              {progress}%
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          {/* ---------- step list ---------- */}
          <nav className="h-fit rounded-xl bg-white p-3 shadow-sm">
            {STEPS.map((s) => {
              const info = stepState[s.key];
              const active = s.key === activeKey;
              const done = info?.completed;
              const skipped = info?.skipped;

              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => goTo(s.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {done ? (
                    <CheckCircle size={18} className="shrink-0 text-green-600" />
                  ) : skipped ? (
                    <SkipForward size={18} className="shrink-0 text-amber-500" />
                  ) : (
                    <Circle size={18} className="shrink-0 text-slate-300" />
                  )}
                  <span className="flex-1">{s.label}</span>
                  {info?.optional && !done && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-500">
                      {skipped ? "skipped" : "optional"}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => goTo(REVIEW)}
              className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                isReview
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CheckCircle
                size={18}
                className={canComplete ? "text-green-600" : "text-slate-300"}
              />
              Review &amp; finish
            </button>
          </nav>

          {/* ---------- main panel ---------- */}
          <main className="min-w-0 rounded-xl bg-white p-4 shadow-sm md:p-6">
            {(error || notice) && (
              <div
                className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-green-200 bg-green-50 text-green-700"
                }`}
              >
                {error ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                {error || notice}
              </div>
            )}

            {isReview ? (
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Review &amp; finish
                </h2>

                <ul className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
                  {STEPS.map((s) => {
                    const info = stepState[s.key];
                    return (
                      <li
                        key={s.key}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <span className="text-slate-700">{s.label}</span>
                        <span
                          className={
                            info?.completed
                              ? "font-medium text-green-600"
                              : info?.skipped
                              ? "font-medium text-amber-600"
                              : info?.optional
                              ? "text-slate-400"
                              : "font-medium text-red-500"
                          }
                        >
                          {info?.completed
                            ? `Done (${info.count})`
                            : info?.skipped
                            ? "Skipped"
                            : info?.optional
                            ? "Not set (optional)"
                            : "Required"}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {!canComplete && (
                  <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Still required: {remaining.map(labelOf).join(", ")}.
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <button
                    type="button"
                    disabled={!canComplete || busy}
                    onClick={handleFinish}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy && <Loader2 size={16} className="animate-spin" />}
                    Finish setup
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Step {index + 1} of {STEPS.length}
                    </p>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {step.label}
                    </h2>
                    {stepInfo?.description && (
                      <p className="text-sm text-slate-500">
                        {stepInfo.description}
                      </p>
                    )}
                  </div>

                  {stepInfo?.optional && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      Optional
                    </span>
                  )}
                </div>

                <Page key={step.key} onSaved={handleSaved} onboarding />

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={goBack}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <div className="flex items-center gap-3">
                    {stepInfo?.optional && !isResolved(step.key) && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={handleSkip}
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                      >
                        <SkipForward size={16} /> Skip for now
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={!isResolved(step.key)}
                      onClick={goNext}
                      title={
                        isResolved(step.key)
                          ? ""
                          : "Save this step's details to continue"
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
