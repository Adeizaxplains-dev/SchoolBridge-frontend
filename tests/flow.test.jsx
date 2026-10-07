import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "../src/app/App.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";

const API = process.env.VITE_API_URL;
const email = `ui${Date.now()}@testschool.ng`;
const password = "Passw0rd!";

const Probe = () => <div data-testid="loc">{useLocation().pathname}</div>;
const mount = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <Probe />
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
const loc = () => screen.getByTestId("loc").textContent;
const at = (p, timeout = 15000) => waitFor(() => expect(loc()).toBe(p), { timeout });

const api = async (method, path, body) => {
  const r = await fetch(API + path, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`${method} ${path}: ${j.message}`);
  return j;
};
const d = (y, m, day) => new Date(Date.UTC(y, m - 1, day)).toISOString();

afterEach(() => cleanup());

describe("SchoolBridge onboarding flow (real UI + real API)", () => {
  it("1. registering a school lands on the onboarding wizard with all 10 steps", async () => {
    localStorage.clear();
    mount("/register");
    fireEvent.change(screen.getByPlaceholderText("School Name"), { target: { value: "Asslaw Private School" } });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number (Optional)"), { target: { value: "08030000000" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: password } });
    fireEvent.click(screen.getByRole("button", { name: /create school account/i }));

    await at("/admin/school-setup/onboard");
    await screen.findByText("Set up your school", {}, { timeout: 15000 });
    for (const label of ["School Profile", "Academic Session", "Terms", "Classes", "Class Arms", "Subjects", "Departments", "Houses", "Fee Structure", "Grading System"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(localStorage.getItem("token")).toBeTruthy();
    const school = JSON.parse(localStorage.getItem("school"));
    expect(school._id).toBeTruthy();
  });

  it("2. an unfinished admin is bounced from /dashboard back to the wizard (session restore)", async () => {
    mount("/dashboard");
    await at("/admin/school-setup/onboard");
    await screen.findByText("Set up your school");
  });

  it("3. server-side data drives progress; wizard boots on the first unresolved step and finishes", async () => {
    await api("POST", "/onboarding/school-profile", { name: "Asslaw Private School", email, phone: "08030000000", address: "Kajola Road", city: "Kajola", state: "Ogun" });
    const s = await api("POST", "/school-setup/academic-sessions", { name: "2026/2027", startDate: d(2026, 9, 1), endDate: d(2027, 7, 31) });
    await api("POST", "/school-setup/terms/setup", { sessionId: s.data._id, academicSession: s.data._id, terms: [
      { name: "First Term", code: "T1", termNumber: 1, startDate: d(2026, 9, 1), endDate: d(2026, 12, 15), isCurrent: true },
      { name: "Second Term", code: "T2", termNumber: 2, startDate: d(2027, 1, 5), endDate: d(2027, 4, 1) },
      { name: "Third Term", code: "T3", termNumber: 3, startDate: d(2027, 4, 20), endDate: d(2027, 7, 31) }] });
    await api("POST", "/school-setup/classes", { name: "JSS 1", level: "" });
    await api("POST", "/school-setup/subjects", { name: "Mathematics", code: "", department: "", isCompulsory: true });
    await api("POST", "/onboarding/grading-system", { name: "Standard", grades: [
      { grade: "A", minScore: 70, maxScore: 100, remark: "Excellent" }, { grade: "F", minScore: 0, maxScore: 69, remark: "Fail" }] });

    mount("/admin/school-setup/onboard");
    // first unresolved step is the optional "arms" (NOT a loop back to School Profile)
    await screen.findByText(/Step 5 of 10/, {}, { timeout: 15000 });

    fireEvent.click(screen.getByRole("button", { name: /review & finish/i }));
    const finish = await screen.findByRole("button", { name: /finish setup/i });
    await waitFor(() => expect(finish).not.toBeDisabled(), { timeout: 10000 });
    fireEvent.click(finish);

    await at("/dashboard");
  });

  it("4. a finished admin is kept out of the wizard but can still open setup pages", async () => {
    mount("/admin/school-setup/onboard");
    await at("/dashboard");
    cleanup();
    mount("/admin/school-setup/classes");
    await screen.findByText(/JSS 1/, {}, { timeout: 15000 });
    expect(loc()).toBe("/admin/school-setup/classes");
  });

  it("5. logout then login returns to /dashboard; wrong password shows an error", async () => {
    localStorage.clear();
    mount("/login");
    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrong-password" } });
    fireEvent.click(screen.getByRole("button", { name: /^login$/i }));
    await screen.findByRole("alert", {}, { timeout: 10000 });
    expect(loc()).toBe("/login");

    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: password } });
    fireEvent.click(screen.getByRole("button", { name: /^login$/i }));
    await at("/dashboard");
  });
});
