import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cropper from "react-easy-crop";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { createCategory } from "./categoryService";
import { useNavigate } from "react-router-dom";
import { getCroppedImg } from "./utils";
import "./AddCategory.css";

const AddCategory = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isCropping, setIsCropping] = useState(false);

    const initialValues = {
        name: "",
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setIsCropping(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
            setPreview(croppedImage);
            setSelectedImage(croppedImage);
            setIsCropping(false);
        } catch (error) {
            console.error("Error al recortar la imagen:", error);
        }
    };

    const handleCropCancel = () => {
        setSelectedImage(null);
        setIsCropping(false);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Formulario enviado con valores:", values); // Agregar este log
        try {
            const formData = new FormData();
            formData.append("name", values.name);

            // Convertir la imagen de previsualización en un blob para enviarla como archivo
            const response = await fetch(preview);
            const blob = await response.blob();
            const file = new File([blob], `${values.name}.png`, { type: "image/png" });
            formData.append("image", file);

            const result = await createCategory(formData);
            console.log("Categoría agregada:", result); // Verifica la respuesta
            navigate("/category");
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
                        if (!preview) {
                            errors.image = "Selecciona y recorta una imagen";
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
                                <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                                <ErrorMessage name="image" component="div" className="error" />
                                {isCropping && selectedImage && (
                                    <div>
                                        <div className="crop-container">
                                            <Cropper
                                                image={selectedImage}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={4 / 3}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={handleCropComplete}
                                            />
                                        </div>
                                        <div className="button-group">
                                            <button onClick={handleCropSave} type="button">
                                                Guardar
                                            </button>
                                            <button onClick={handleCropCancel} type="button">
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {preview && (
                                    <div className="image-preview-container">
                                        <p>Previsualización:</p>
                                        <div className="image-preview">
                                            <img src={preview} alt="Previsualización" />
                                        </div>
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
