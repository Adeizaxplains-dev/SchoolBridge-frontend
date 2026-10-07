import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import { render, screen, waitFor, cleanup, renderHook, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "../src/app/App.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import useSchoolSetup from "../src/hooks/useSchoolSetup.js";

const API = process.env.VITE_API_URL;
const email = `scr${Date.now()}@testschool.ng`;
const d = (y, m, day) => new Date(Date.UTC(y, m - 1, day)).toISOString();

const raw = async (method, path, body, token = localStorage.getItem("token")) => {
  const r = await fetch(API + path, { method, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json();
  if (!r.ok) throw new Error(`${method} ${path}: ${j.message}`);
  return j;
};

const Probe = () => <div data-testid="loc">{useLocation().pathname}</div>;
const mount = (path) => render(<MemoryRouter initialEntries={[path]}><AuthProvider><Probe /><App /></AuthProvider></MemoryRouter>);

let crashes = [];
beforeAll(async () => {
  const reg = await raw("POST", "/auth/register", { schoolName: "Screens Academy", email, password: "Passw0rd!", phone: "08011112222" }, null);
  localStorage.setItem("token", reg.token);
  localStorage.setItem("user", JSON.stringify(reg.user));
  localStorage.setItem("school", JSON.stringify(reg.school));
  await raw("POST", "/onboarding/school-profile", { name: "Screens Academy", email, phone: "08011112222", address: "1 Test Road", city: "Lagos", state: "Lagos" });
  const s = await raw("POST", "/school-setup/academic-sessions", { name: "2026/2027", startDate: d(2026, 9, 1), endDate: d(2027, 7, 31) });
  await raw("POST", "/school-setup/terms/setup", { sessionId: s.data._id, academicSession: s.data._id, terms: [
    { name: "First Term", code: "T1", termNumber: 1, startDate: d(2026, 9, 1), endDate: d(2026, 12, 15), isCurrent: true },
    { name: "Second Term", code: "T2", termNumber: 2, startDate: d(2027, 1, 5), endDate: d(2027, 4, 1) },
    { name: "Third Term", code: "T3", termNumber: 3, startDate: d(2027, 4, 20), endDate: d(2027, 7, 31) }] });
  await raw("POST", "/school-setup/classes", { name: "JSS 1", level: "" });
  await raw("POST", "/school-setup/subjects", { name: "Mathematics", code: "", department: "", isCompulsory: true });
  await raw("POST", "/onboarding/grading-system", { name: "Standard", grades: [{ grade: "A", minScore: 70, maxScore: 100, remark: "Excellent" }, { grade: "F", minScore: 0, maxScore: 69, remark: "Fail" }] });
  await raw("POST", "/onboarding/complete");
  vi.spyOn(console, "error").mockImplementation((...a) => {
    const m = String(a[0]);
    if (m.includes("An error occurred in the")) crashes.push(m.slice(0, 90));
  });
});
afterEach(() => cleanup());

describe("setup hook CRUD against the real API (payloads copied from the forms)", () => {
  const cases = [
    ["Class", { name: "Primary 4", level: "", arm: "", description: "" }, { name: "Primary 4B" }],
    ["Arm", { name: "Gold", description: "" }, { name: "Silver" }],
    ["Subject", { name: "Physics", code: "", department: "", isCompulsory: false }, { name: "Physics 2" }],
    ["Department", { name: "Arts", code: "ART" }, { name: "Arts & Humanities" }],
    ["House", { name: "Blue House", color: "#2563eb" }, { name: "Sky House" }],
  ];
  for (const [E, payload, patch] of cases) {
    it(`${E}: create -> list -> update -> delete`, async () => {
      const { result } = renderHook(() => useSchoolSetup());
      const h = result.current;
      let created;
      await act(async () => { created = await h[`create${E}`](payload); });
      const id = created.data._id;
      expect(id).toBeTruthy();
      let list;
      await act(async () => { list = await h[`get${E === "Class" ? "Classes" : E + "s"}`](); });
      const arr = list[E === "Class" ? "classes" : E.toLowerCase() + "s"];
      expect(arr.some((x) => x._id === id)).toBe(true);
      let updated;
      await act(async () => { updated = await h[`update${E}`](id, patch); });
      expect(updated.data.name).toBe(patch.name);
      await act(async () => { await h[`delete${E}`](id); });
    });
  }
  it("School overview + current session", async () => {
    const { result } = renderHook(() => useSchoolSetup());
    let ov, cur;
    await act(async () => { ov = await result.current.getSchoolSetupOverview(); });
    expect(ov.progress.items.length).toBe(10);
    expect(ov.summary.classes).toBeGreaterThan(0);
    await act(async () => { cur = await result.current.getCurrentAcademicSession(); });
    expect(cur.data.name).toBe("2026/2027");
  });
});

describe("every screen renders without a component crash", () => {
  const routes = ["/dashboard", "/overview", "/admin/school-setup/profile", "/admin/school-setup/academic-sessions", "/admin/school-setup/terms", "/admin/school-setup/classes", "/admin/school-setup/arms", "/admin/school-setup/subjects", "/admin/school-setup/departments", "/admin/school-setup/houses", "/admin/school-setup/fee-structure", "/admin/school-setup/grading-system"];
  for (const path of routes) {
    it(path, async () => {
      crashes = [];
      mount(path);
      await waitFor(() => expect(screen.getByTestId("loc").textContent).toBe(path), { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 1800));
      expect(crashes).toEqual([]);
      expect(screen.getByTestId("loc")).toBeInTheDocument();
    });
  }
});
