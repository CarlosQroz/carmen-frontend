import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { createCategory } from "./categoryService";
import "./AddCategory.css"; // Asegúrate de que los estilos sean adecuados
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const initialValues = {
        name: "",
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Guarda la imagen seleccionada
            setPreview(URL.createObjectURL(file)); // Genera una URL para previsualizar
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", selectedImage); // Envía la imagen como un archivo

            await createCategory(formData); // Ajusta el backend para aceptar `multipart/form-data`
            navigate("/category"); // Redirige a la lista de categorías
        } catch (error) {
            console.error("Error al agregar categoría:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box m="20px">
            <Header title="AGREGAR CATEGORÍA" subtitle="Llena el formulario para agregar una nueva categoría." />

            <div className="form-container">
                <Formik
                    initialValues={initialValues}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "El nombre es obligatorio";
                        }
                        if (!selectedImage) {
                            errors.image = "Selecciona una imagen";
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="form-group">
                                <label htmlFor="name">Nombre de la nueva categoría</label>
                                <Field type="text" name="name" id="name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Imagen de categoría</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <ErrorMessage name="image" component="div" className="error" />
                                {preview && (
                                    <div className="image-preview">
                                        <p>Previsualización:</p>
                                        <img src={preview} alt="Previsualización" />
                                    </div>
                                )}
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Agregando..." : "Agregar Categoría"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Box>
    );
};

export default AddCategory;
