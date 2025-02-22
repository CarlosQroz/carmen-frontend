import axiosInstance from "../../axiosConfig";

export const getObjectsByCategory = async (categoryId) => {
    try {
    const response = await axiosInstance.get(`/categories/${categoryId}/objects`);
    return response.data;
    } catch (error) {
    console.error("Error al obtener los objetos por categoría:", error);
    throw error;
    }
};

// Crear un nuevo objeto
export const createObject = async (formData) => {
    try {
        const response = await axiosInstance.post("/upload/object", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el objeto:", error);
        throw error;
    }
};

// Actualizar un objeto existente
export const updateObject = async (objectId, objectData) => {
    try {
        const response = await axiosInstance.put(`/objects/${objectId}`, objectData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el objeto:", error);
        throw error;
    }
};

// Eliminar un objeto
export const deleteObject = async (objectId) => {
    try {
        const response = await axiosInstance.delete(`/objects/${objectId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el objeto:", error);
        throw error;
    }
};

