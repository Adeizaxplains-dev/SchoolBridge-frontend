import API from "./api";

export const getSubscription =
  async () => {
    const res = await API.get(
      "/subscriptions"
    );

    return res.data;
  };

export const upgradePlan =
  async (data) => {
    const res = await API.put(
      "/subscriptions/upgrade",
      data
    );

    return res.data;
  };

export const cancelSubscription =
  async () => {
    const res = await API.put(
      "/subscriptions/cancel"
    );

    return res.data;
  };