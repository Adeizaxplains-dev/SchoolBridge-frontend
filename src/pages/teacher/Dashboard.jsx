import { useEffect, useState } from "react";
import API from "../../services/api";

import TeacherHero from "../../components/teachers/dashboard/TeacherHero";
import TeacherStats from "../../components/teachers/dashboard/TeacherStats";
import TeacherQuickActions from "../../components/teachers/dashboard/TeacherQuickActions";

import TodayTimetable from "../../components/teachers/dashboard/TodayTimetable";
import AssignmentSubmissions from "../../components/teachers/dashboard/AssignmentSubmissions";
import AttendanceTrend from "../../components/teachers/dashboard/AttendanceTrend";
import ResultCompletion from "../../components/teachers/dashboard/ResultCompletion";

import Notifications from "../../components/teachers/dashboard/Notifications";
import TeachingSummary from "../../components/teachers/dashboard/TeachingSummary";
import UpcomingDeadlines from "../../components/teachers/dashboard/UpcomingDeadlines";
import PendingTasks from "../../components/teachers/dashboard/PendingTasks";
import RecentActivities from "../../components/teachers/dashboard/RecentActivities";
import AssignmentProgress from "../../components/teachers/dashboard/AssignmentProgress";

export default function TeacherDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await API.get("/teacher/dashboard");
      setDashboard(res.data?.data || {});
    } catch (error) {
      console.error(error);

      // Demo data if backend isn't ready
      setDashboard({
        teacher: {
          fullName: "Mr. John Adewale",
          department: "Sciences",
          avatar: "",
        },

        stats: {
          students: 215,
          classes: 8,
          attendance: 96,
          pendingResults: 18,
        },

        timetable: [
          {
            subject: "Mathematics",
            class: "JSS 2A",
            classroom: "Room 12",
            time: "08:00 AM",
          },
          {
            subject: "Further Maths",
            class: "SS1",
            classroom: "Room 5",
            time: "10:30 AM",
          },
          {
            subject: "Mathematics",
            class: "SS2",
            classroom: "Room 8",
            time: "12:00 PM",
          },
        ],

        submissions: [
          {
            student: "Aisha Bello",
            assignment: "Algebra Assignment",
          },
          {
            student: "John Musa",
            assignment: "Quadratic Equations",
          },
          {
            student: "David James",
            assignment: "Statistics",
          },
        ],

        notifications: [
          {
            title: "Principal meeting at 2 PM",
            time: "30 mins ago",
          },
          {
            title: "New assignment submitted",
            time: "1 hour ago",
          },
          {
            title: "Results approval requested",
            time: "Today",
          },
        ],

        deadlines: [
          {
            title: "Submit Mid-Term Results",
            due: "Tomorrow",
          },
          {
            title: "Grade SS2 Assignments",
            due: "Friday",
          },
          {
            title: "Upload Attendance",
            due: "Today",
          },
        ],

        recentActivities: [
          {
            action: "Created Mathematics Assignment",
            time: "Today",
          },
          {
            action: "Marked 32 Scripts",
            time: "Yesterday",
          },
          {
            action: "Published JSS2 Results",
            time: "2 days ago",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="h-56 bg-slate-200 rounded-3xl" />

        <div className="grid lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-3xl" />
          <div className="h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HERO */}

      <TeacherHero
        teacher={dashboard.teacher}
      />

      {/* STATS */}

      <TeacherStats
        stats={dashboard.stats}
      />

      {/* QUICK ACTIONS */}

      <TeacherQuickActions />

      {/* =======================================
          MAIN GRID
      ======================================= */}

      <div className="grid xl:grid-cols-3 gap-6">

        {/* LEFT */}

        <div className="xl:col-span-2 space-y-6">

          <TodayTimetable
            timetable={dashboard.timetable}
          />

          <AssignmentSubmissions
            submissions={dashboard.submissions}
          />

          <AttendanceTrend />

          <ResultCompletion />

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <Notifications
            notifications={dashboard.notifications}
          />

          <TeachingSummary
            summary={dashboard.summary}
          />

          <UpcomingDeadlines
            deadlines={dashboard.deadlines}
          />

          <PendingTasks
            tasks={dashboard.pendingTasks}
          />

        </div>

      </div>

      {/* =======================================
          BOTTOM GRID
      ======================================= */}

      <div className="grid xl:grid-cols-2 gap-6">

        <AssignmentProgress
          assignments={dashboard.assignments}
        />

        <RecentActivities
          activities={dashboard.recentActivities}
        />

      </div>

    </div>
  );
}