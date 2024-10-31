// detailService.js
import axiosInstance from '../../axiosConfig';

export const getDetailsByObject = async (objectId) => {
  try {
    const response = await axiosInstance.get(`/detail/${objectId}`);
    return response;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};
