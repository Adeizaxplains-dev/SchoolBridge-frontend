import API from "./api";

export const getAttendance =
  async () => {
    const res = await API.get(
      "/attendance"
    );

    return res.data;
  };

export const markAttendance =
  async (data) => {
    const res = await API.post(
      "/attendance",
      data
    );

    return res.data;
  };