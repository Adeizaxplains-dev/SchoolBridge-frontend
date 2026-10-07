import API from "./api";

/*
=================================
MANUAL PAYMENTS
=================================
*/

export const getPayments = async () => {
  const res = await API.get("/payments");
  return res.data;
};

export const recordPayment = async (data) => {
  const res = await API.post(
    "/payments",
    data
  );

  return res.data;
};

/*
=================================
PAYSTACK SUBSCRIPTION
=================================
*/

export const initializePayment = async (
  plan,
  amount,
  maxStudents
) => {
  const res = await API.post(
    "/payments/initialize",
    {
      plan,
      amount,
      maxStudents,
    }
  );

  return res.data;
};