import API from "./api";

export const uploadPassport = async (
  studentId,
  file
) => {
  const formData = new FormData();

  formData.append(
    "passport",
    file
  );

  const res = await API.post(
    `/upload/student/${studentId}/passport`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};