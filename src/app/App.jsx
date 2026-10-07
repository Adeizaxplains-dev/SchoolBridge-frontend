import { Routes, Route } from "react-router-dom";

// ================= AUTH =================

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// ================= GUARDS =================

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

// ================= LAYOUT =================

import DashboardLayout from "../Layouts/DashboardLayout";

// ================= ADMIN =================

import Dashboard from "../pages/admin/dashboard/Dashboard";
import Overview from "../pages/admin/dashboard/Overview";

// STUDENTS
import Students from "../pages/admin/students/Students";
import AddStudent from "../pages/admin/students/AddStudent";
import EditStudent from "../pages/admin/students/EditStudent";
import StudentProfile from "../pages/admin/students/StudentProfile";

// TEACHERS
import Teachers from "../pages/admin/teachers/Teachers";
import AddTeacher from "../pages/admin/teachers/AddTeacher";
import EditTeacher from "../pages/admin/teachers/EditTeacher";
import TeacherProfileAdmin from "../pages/admin/teachers/TeacherProfile";

// PARENTS
import Parents from "../pages/admin/parents/Parents";
import AddParent from "../pages/admin/parents/AddParent";
import EditParent from "../pages/admin/parents/EditParent";
import ParentProfile from "../pages/admin/parents/ParentProfile";

// ATTENDANCE
import Attendance from "../pages/admin/Attendance";

// ================= RESULTS =================

import SavedResults from "../pages/results/SavedResults";
import CreateResult from "../pages/results/CreateResult";
import EditResult from "../pages/results/EditResult";
import ResultDetails from "../pages/results/ResultDetails";
import PublishResults from "../pages/results/PublishResults";


// ================= SCHOOL SETUP =================


import OnboardingWizard from "../pages/admin/school-setup/OnboardingWizard";
import SchoolProfileSetup 
from "../pages/admin/school-setup/SchoolProfile";

import AcademicSession 
from "../pages/admin/school-setup/AcademicSession";

import Terms 
from "../pages/admin/school-setup/Terms";

import Classes 
from "../pages/admin/school-setup/Classes";

import Arms 
from "../pages/admin/school-setup/Arms";

import Subjects 
from "../pages/admin/school-setup/Subjects";

import Departments 
from "../pages/admin/school-setup/Departments";

import Houses 
from "../pages/admin/school-setup/Houses";

import FeeStructureSetup 
from "../pages/admin/school-setup/FeeStructure";

import GradingSystem 
from "../pages/admin/school-setup/GradingSystem";

// ================= FEES =================

import FeesDashboard from "../pages/fees/FeesDashboard";
import Payments from "../pages/fees/payments";
import FeeStructure from "../pages/fees/FeeStructure";
import CreateFee from "../pages/fees/CreateFee";
import CreateFeeStructure from "../pages/fees/CreateFeeStructure";
import Defaulters from "../pages/fees/Defaulters";

// ================= FINANCE =================

import FinancialReport from "../pages/finance/FinancialReport";

// ================= MESSAGES =================

import MessagesDashboard from "../pages/messages/MessagesDashboard";
import ComposeMessage from "../pages/messages/ComposeMessage";
import ScheduleMessage from "../pages/messages/ScheduleMessage";
import MessageHistory from "../pages/messages/MessageHistory";
import Templates from "../pages/messages/Templates";

// ================= AUTOMATION =================

import AutomationDashboard from "../pages/automations/AutomationDashboard";

// ================= TEACHER =================

import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherProfile from "../pages/teacher/profile";
import TeacherClasses from "../pages/teacher/Classes";
import TeacherStudents from "../pages/teacher/Students";
import TeacherAssignments from "../pages/teacher/Assignments";
import TeacherMessages from "../pages/teacher/Messages";
import TeacherResults from "../pages/teacher/Results";

// ================= PARENT =================

import ParentDashboard from "../pages/parent/Dashboard";
import ChildProfile from "../pages/parent/profile/ChildProfile";
import ParentAttendance from "../pages/parent/attendance/Attendance";
import ParentResults from "../pages/parent/results/Results";
import FeeStatus from "../pages/parent/fees/FeeStatus";
import ParentMessages from "../pages/parent/messages/messages";
import Support from "../pages/parent/support/Support";

// ================= SAAS =================

import Subscription from "../pages/saas/Subscription";
import Billing from "../pages/saas/Billing";
import Pricing from "../pages/saas/Pricing";
import TrialStatus from "../pages/saas/TrialStatus";
import SchoolProfile from "../pages/saas/SchoolProfile";

// ================= SETTINGS =================

import Settings from "../pages/settings/settings";

// ================= NOT FOUND =================

const NotFound = () => (
  <div className="flex h-screen items-center justify-center text-slate-500 text-xl font-semibold">
    Page Not Found
  </div>
);

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ================= */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
              {/* ================= ADMIN ================= */}

      <Route element={<RoleRoute roles={["admin"]} />}>

      {/* ================= SCHOOL SETUP ================= */}


<Route
    path="/admin/school-setup"
    element={<OnboardingWizard />}
/>

<Route
    path="/admin/school-setup/onboard"
    element={<OnboardingWizard />}
/>



<Route
  path="/admin/school-setup/profile"
  element={<SchoolProfileSetup />}
/>



<Route
  path="/admin/school-setup/academic-sessions"
  element={<AcademicSession />}
/>



<Route
  path="/admin/school-setup/terms"
  element={<Terms />}
/>



<Route
  path="/admin/school-setup/classes"
  element={<Classes />}
/>



<Route
  path="/admin/school-setup/arms"
  element={<Arms />}
/>



<Route
  path="/admin/school-setup/subjects"
  element={<Subjects />}
/>



<Route
  path="/admin/school-setup/departments"
  element={<Departments />}
/>



<Route
  path="/admin/school-setup/houses"
  element={<Houses />}
/>



<Route
  path="/admin/school-setup/fee-structure"
  element={<FeeStructureSetup />}
/>



<Route
  path="/admin/school-setup/grading-system"
  element={<GradingSystem />}
/>

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/overview"
          element={<Overview />}
        />

        {/* ================= STUDENTS ================= */}

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/students/add"
          element={<AddStudent />}
        />

        <Route
          path="/students/edit/:id"
          element={<EditStudent />}
        />

        <Route
          path="/students/:id"
          element={<StudentProfile />}
        />

        {/* ================= TEACHERS ================= */}

        <Route
          path="/teachers"
          element={<Teachers />}
        />

        <Route
          path="/teachers/add"
          element={<AddTeacher />}
        />

        <Route
          path="/teachers/edit/:id"
          element={<EditTeacher />}
        />

        <Route
          path="/teachers/:id"
          element={<TeacherProfileAdmin />}
        />
        <Route
  path="/teacher/results"
  element={<TeacherResults />}
/>

        {/* ================= PARENTS ================= */}

        <Route
          path="/parents"
          element={<Parents />}
        />

        <Route
          path="/parents/add"
          element={<AddParent />}
        />

        <Route
          path="/parents/edit/:id"
          element={<EditParent />}
        />

        <Route
          path="/parents/:id"
          element={<ParentProfile />}
        />

        {/* ================= ATTENDANCE ================= */}

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        {/* ================= RESULTS ================= */}

        <Route
          path="/results"
          element={<SavedResults />}
        />

        <Route
          path="/results/create"
          element={<CreateResult />}
        />

        <Route
          path="/results/edit/:id"
          element={<EditResult />}
        />

        <Route
          path="/results/:id"
          element={<ResultDetails />}
        />

        <Route
          path="/results/publish"
          element={<PublishResults />}
        />

        {/* ================= FEES ================= */}

        <Route
          path="/fees"
          element={<FeesDashboard />}
        />

        <Route
          path="/fees/create"
          element={<CreateFee />}
        />

        <Route
          path="/fees/payments"
          element={<Payments />}
        />

        <Route
          path="/fees/structure"
          element={<FeeStructure />}
        />

        <Route
          path="/fees/structure/create"
          element={<CreateFeeStructure />}
        />

        <Route
          path="/fees/defaulters"
          element={<Defaulters />}
        />

        {/* ================= FINANCE ================= */}

        <Route
          path="/finance/reports"
          element={<FinancialReport />}
        />

        {/* ================= MESSAGES ================= */}

        <Route
          path="/messages"
          element={<MessagesDashboard />}
        />

        <Route
          path="/messages/compose"
          element={<ComposeMessage />}
        />

        <Route
          path="/messages/schedule"
          element={<ScheduleMessage />}
        />

        <Route
          path="/messages/history"
          element={<MessageHistory />}
        />

        <Route
          path="/messages/templates"
          element={<Templates />}
        />

        {/* ================= AUTOMATION ================= */}

        <Route
          path="/automations"
          element={<AutomationDashboard />}
        />

        {/* ================= SAAS ================= */}

        <Route
          path="/subscription"
          element={<Subscription />}
        />

        <Route
          path="/billing"
          element={<Billing />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/trial"
          element={<TrialStatus />}
        />

        <Route
          path="/school-profile"
          element={<SchoolProfile />}
        />

        {/* ================= SETTINGS ================= */}

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>
            {/* ================= TEACHER ================= */}

      <Route element={<RoleRoute roles={["teacher"]} />}>

        <Route
          path="/teacher/dashboard"
          element={<TeacherDashboard />}
        />

        <Route
          path="/teacher/profile"
          element={<TeacherProfile />}
        />

        <Route
          path="/teacher/classes"
          element={<TeacherClasses />}
        />

        <Route
          path="/teacher/students"
          element={<TeacherStudents />}
        />

        <Route
          path="/teacher/attendance"
          element={<Attendance />}
        />

        <Route
          path="/teacher/results"
          element={<SavedResults />}
        />

        <Route
          path="/teacher/results/create"
          element={<CreateResult />}
        />

        <Route
          path="/teacher/results/edit/:id"
          element={<EditResult />}
        />

        <Route
          path="/teacher/results/:id"
          element={<ResultDetails />}
        />

        <Route
          path="/teacher/assignments"
          element={<TeacherAssignments />}
        />

        <Route
          path="/teacher/messages"
          element={<TeacherMessages />}
        />

      </Route>

      {/* ================= PARENT ================= */}

      <Route element={<RoleRoute roles={["parent"]} />}>

        <Route
          path="/parent"
          element={<ParentDashboard />}
        />

        <Route
          path="/parent/profile"
          element={<ChildProfile />}
        />

        <Route
          path="/parent/attendance"
          element={<ParentAttendance />}
        />

        <Route
          path="/parent/results"
          element={<ParentResults />}
        />

        <Route
          path="/parent/fees"
          element={<FeeStatus />}
        />

        <Route
          path="/parent/messages"
          element={<ParentMessages />}
        />

        <Route
          path="/parent/support"
          element={<Support />}
        />

      </Route>

      {/* ================= END PROTECTED ================= */}

      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}