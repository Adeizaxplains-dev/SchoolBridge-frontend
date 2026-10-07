// =========================================================
// src/config/sidebarConfig.jsx
// SchoolBridge Enterprise Sidebar Configuration
// =========================================================


import {

  LayoutDashboard,

  GraduationCap,

  Users,

  UserRound,

  ClipboardCheck,

  FileSpreadsheet,

  Wallet,

  PlusCircle,

  CreditCard,

  FileText,

  AlertTriangle,

  BarChart3,

  MessageSquare,

  Pencil,

  History,

  Files,

  Bot,

  BadgeDollarSign,

  Receipt,

  Package,

  Clock,

  Building2,

  Settings,

  User,

  LifeBuoy,

  BookOpen,

  ClipboardList,

} from "lucide-react";





/*
=========================================================
ADMIN SIDEBAR
=========================================================
*/


export const adminSidebar = [




{
title:"Dashboard",

items:[

{
label:"Overview",

path:"/dashboard",

icon:LayoutDashboard,

},

],

},





/*
=========================================================
SCHOOL SETUP
=========================================================
*/


{
title:"School Setup",

items:[


{
label:"Setup Dashboard",

path:"/admin/school-setup/onboard",

icon:Building2,

},



{
label:"School Profile",

path:"/admin/school-setup/profile",

icon:Building2,

},



{
label:"Academic Sessions",

path:"/admin/school-setup/academic-sessions",

icon:ClipboardList,

},



{
label:"Terms",

path:"/admin/school-setup/terms",

icon:ClipboardCheck,

},



{
label:"Classes",

path:"/admin/school-setup/classes",

icon:GraduationCap,

},



{
label:"Subjects",

path:"/admin/school-setup/subjects",

icon:BookOpen,

},



{
label:"Fee Structure",

path:"/admin/school-setup/fee-structure",

icon:Wallet,

},



{
label:"Grading System",

path:"/admin/school-setup/grading-system",

icon:FileSpreadsheet,

},


],

},







/*
=========================================================
STUDENTS
=========================================================
*/


{
title:"Students",

items:[


{
label:"Student Management",

path:"/students",

icon:GraduationCap,

},



{
label:"Add Student",

path:"/students/add",

icon:PlusCircle,

},


],

},







/*
=========================================================
TEACHERS
=========================================================
*/


{
title:"Teachers",

items:[


{
label:"Teacher Management",

path:"/teachers",

icon:Users,

},



{
label:"Add Teacher",

path:"/teachers/add",

icon:PlusCircle,

},


],

},







/*
=========================================================
PARENTS
=========================================================
*/


{
title:"Parents",

items:[


{
label:"Parent Management",

path:"/parents",

icon:UserRound,

},



{
label:"Add Parent",

path:"/parents/add",

icon:PlusCircle,

},


],

},







/*
=========================================================
ACADEMICS
=========================================================
*/


{
title:"Academics",

items:[


{
label:"Attendance",

path:"/attendance",

icon:ClipboardCheck,

},



{
label:"Results",

path:"/results",

icon:FileSpreadsheet,

},


],

},







/*
=========================================================
FINANCE
=========================================================
*/


{
title:"Finance",

items:[


{
label:"Fees Dashboard",

path:"/fees",

icon:Wallet,

},



{
label:"Create Fee",

path:"/fees/create",

icon:PlusCircle,

},



{
label:"Payments",

path:"/fees/payments",

icon:CreditCard,

},



{
label:"Fee Structure",

path:"/fees/structure",

icon:FileText,

},



{
label:"Defaulters",

path:"/fees/defaulters",

icon:AlertTriangle,

},



{
label:"Financial Reports",

path:"/finance/reports",

icon:BarChart3,

},


],

},







/*
=========================================================
COMMUNICATION
=========================================================
*/


{
title:"Communication",

items:[


{
label:"Messages",

path:"/messages",

icon:MessageSquare,

},



{
label:"Compose",

path:"/messages/compose",

icon:Pencil,

},



{
label:"History",

path:"/messages/history",

icon:History,

},



{
label:"Templates",

path:"/messages/templates",

icon:Files,

},


],

},







/*
=========================================================
AUTOMATION
=========================================================
*/


{
title:"Automation",

items:[


{
label:"Automation Center",

path:"/automations",

icon:Bot,

},


],

},







/*
=========================================================
SUBSCRIPTION
=========================================================
*/


{
title:"Subscription",

items:[


{
label:"Subscription",

path:"/subscription",

icon:BadgeDollarSign,

},



{
label:"Billing",

path:"/billing",

icon:Receipt,

},



{
label:"Pricing",

path:"/pricing",

icon:Package,

},



{
label:"Trial Status",

path:"/trial",

icon:Clock,

},


],

},







/*
=========================================================
SYSTEM
=========================================================
*/


{
title:"System",

items:[


{
label:"Settings",

path:"/settings",

icon:Settings,

},


],

},



];









/*
=========================================================
TEACHER SIDEBAR
=========================================================
*/


export const teacherSidebar = [


{
title:"Teacher Portal",

items:[


{
label:"Dashboard",

path:"/teacher/dashboard",

icon:LayoutDashboard,

},



{
label:"My Classes",

path:"/teacher/classes",

icon:BookOpen,

},



{
label:"Students",

path:"/teacher/students",

icon:GraduationCap,

},



{
label:"Attendance",

path:"/teacher/attendance",

icon:ClipboardCheck,

},



{
label:"Results",

path:"/teacher/results",

icon:FileSpreadsheet,

},



{
label:"Assignments",

path:"/teacher/assignments",

icon:ClipboardList,

},



{
label:"Messages",

path:"/teacher/messages",

icon:MessageSquare,

},



{
label:"Profile",

path:"/teacher/profile",

icon:User,

},


],

},


];









/*
=========================================================
PARENT SIDEBAR
=========================================================
*/


export const parentSidebar = [


{
title:"Parent Portal",

items:[


{
label:"Dashboard",

path:"/parent",

icon:LayoutDashboard,

},



{
label:"Children",

path:"/parent/profile",

icon:Users,

},



{
label:"Attendance",

path:"/parent/attendance",

icon:ClipboardCheck,

},



{
label:"Results",

path:"/parent/results",

icon:FileSpreadsheet,

},



{
label:"Fees",

path:"/parent/fees",

icon:Wallet,

},



{
label:"Messages",

path:"/parent/messages",

icon:MessageSquare,

},



{
label:"Support",

path:"/parent/support",

icon:LifeBuoy,

},


],

},


];