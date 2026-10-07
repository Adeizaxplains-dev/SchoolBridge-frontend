import API from "./api";

/*
=================================
DASHBOARD ANALYTICS
=================================
*/
export const getDashboardAnalytics = async () => {
  const res = await API.get("/analytics/dashboard");

  return res.data;
};

/*
=================================
ADVANCED ANALYTICS
=================================
*/
export const getAdvancedAnalytics = async () => {
  const res = await API.get("/analytics/advanced");

  return res.data;
};

/*
=================================
FINANCIAL REPORT
=================================
*/
export const getFinancialReport = async () => {
  const res = await API.get("/analytics/financial-report");

  return res.data;
};