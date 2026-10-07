import API from "./api";



const handleError = (error) => {
  console.error("RESULT SERVICE ERROR:", error);

  throw (
    error?.response?.data || {
      success: false,
      message: "Something went wrong",
    }
  );
};

/*
====================================================
CREATE RESULT SHEET
====================================================
*/

export const createResultSheet = async (
  payload
) => {
  try {
    const { data } = await API.post(
      "/results",
      payload
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

/*
====================================================
UPDATE RESULT SHEET
====================================================
*/

export const updateResultSheet = async (
  resultId,
  payload
) => {
  try {
    const { data } = await API.put(
      `/results/${resultId}`,
      payload
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

/*
====================================================
DELETE RESULT
====================================================
*/

export const deleteResult = async (
  resultId
) => {
  try {
    const { data } = await API.delete(
      `/results/${resultId}`
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

/*
====================================================
GET ALL RESULTS
====================================================
*/

export const getResults = async (
  filters = {}
) => {
  try {
    const { data } = await API.get(
      "/results",
      {
        params: filters,
      }
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

/*
====================================================
GET SINGLE RESULT
====================================================
*/

export const getResult = async (
  resultId
) => {
  try {
    const { data } = await API.get(
      `/results/${resultId}`
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};

/*
====================================================
GET STUDENT RESULTS
====================================================
*/

export const getStudentResults =
  async (
    studentId,
    filters = {}
  ) => {
    try {
      const { data } = await API.get(
        `/results/student/${studentId}`,
        {
          params: filters,
        }
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
GET CLASS RESULTS
====================================================
*/

export const getClassResults =
  async (
    className,
    term,
    session
  ) => {
    try {
      const { data } = await API.get(
        `/results/class/${className}`,
        {
          params: {
            term,
            session,
          },
        }
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
RESULT ANALYTICS
====================================================
*/

export const getResultAnalytics =
  async (filters = {}) => {
    try {
      const { data } = await API.get(
        "/results/analytics",
        {
          params: filters,
        }
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
TOP STUDENTS
====================================================
*/

export const getTopStudents =
  async (
    className,
    term,
    session
  ) => {
    try {
      const { data } = await API.get(
        "/results/analytics/top-students",
        {
          params: {
            className,
            term,
            session,
          },
        }
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
CLASS RANKING
====================================================
*/

export const getClassRanking =
  async (
    className,
    term,
    session
  ) => {
    try {
      const { data } = await API.get(
        "/results/analytics/ranking",
        {
          params: {
            className,
            term,
            session,
          },
        }
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
APPROVE RESULT
====================================================
*/

export const approveResult =
  async (resultId) => {
    try {
      const { data } =
        await API.patch(
          `/results/approve/${resultId}`
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
PUBLISH RESULT
====================================================
*/

export const publishResult =
  async (resultId) => {
    try {
      const { data } =
        await API.patch(
          `/results/publish/${resultId}`
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
GENERATE PDF
====================================================
*/

export const generateResultPDF =
  async (resultId) => {
    try {
      const { data } =
        await API.get(
          `/results/pdf/${resultId}`
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
SEND TO PARENT
====================================================
*/

export const sendResultToParent =
  async (resultId) => {
    try {
      const { data } =
        await API.post(
          `/results/send/${resultId}`
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
BULK APPROVE
====================================================
*/

export const bulkApproveResults =
  async (resultIds) => {
    try {
      const { data } =
        await API.post(
          "/results/bulk-approve",
          {
            resultIds,
          }
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
BULK PUBLISH
====================================================
*/

export const bulkPublishResults =
  async (resultIds) => {
    try {
      const { data } =
        await API.post(
          "/results/bulk-publish",
          {
            resultIds,
          }
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };

/*
====================================================
BULK SEND TO PARENTS
====================================================
*/

export const bulkSendResults =
  async (resultIds) => {
    try {
      const { data } =
        await API.post(
          "/results/bulk-send",
          {
            resultIds,
          }
        );

      return data;
    } catch (error) {
      handleError(error);
    }
  };