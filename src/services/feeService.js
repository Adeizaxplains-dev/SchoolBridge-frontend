import API from "./api";

/*
=====================================
GET ALL FEES
=====================================
*/
export const getFees = async () => {
  const res = await API.get("/fees");
  return res.data;
};

/*
=====================================
GET SINGLE FEE
=====================================
*/
export const getFee = async (id) => {
  const res = await API.get(`/fees/${id}`);
  return res.data;
};

/*
=====================================
CREATE FEE
=====================================
*/
export const createFee = async (fee) => {
  const res = await API.post("/fees", fee);
  return res.data;
};

/*
=====================================
GET DEFAULTERS
=====================================
*/
export const getDefaulters = async () => {
  const res = await API.get("/fees/defaulters");
  return res.data;
};

/*
=====================================
GET FEE DASHBOARD STATS
=====================================
*/
export const getFeeStats = async () => {
  const res = await API.get("/fees/stats");
  return res.data;
};

/*
=====================================
MANUAL PAYMENT
=====================================
*/
export const makePayment = async (id, amount) => {
  const res = await API.post(`/fees/${id}/pay`, {
    amount,
  });

  return res.data;
};

/*
=====================================
INITIALIZE PAYSTACK FEE PAYMENT
=====================================
*/
export const initializeFeePayment = async (feeId) => {
  const res = await API.post(
    "/payments/initialize",
    {
      feeId,
    }
  );

  return res.data;
};