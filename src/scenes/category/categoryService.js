
import axiosInstance from "../../axiosConfig";

export const getCategories = async () => {
  try {
    return await axiosInstance.get("/categories");
  } catch (error) {
    console.error("Error al obtener la categoria", error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategory = async (formData) => {
  try {
    const response = await axiosInstance.post("/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategory = async (categoryId, category) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, category);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la categoría", error);
    throw error;
  }
};
