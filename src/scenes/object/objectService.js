import axiosInstance from "./axiosConfig";

export const getObjectsByCategory = async (categoryId) => {
    try {
    const response = await axiosInstance.get(`/categories/${categoryId}/objects`);
    return response.data;
    } catch (error) {
    console.error("Error al obtener los objetos por categoría:", error);
    throw error;
    }
};
