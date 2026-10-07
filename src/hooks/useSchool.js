export const useSchool = () => {
  const school = JSON.parse(
    localStorage.getItem("school")
  );

  return school;
};