import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig"; 
import "./ObjectList.css"; 
import { Box, Button } from "@mui/material"; 
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const ObjectList = () => {
  const { categoryId } = useParams(); 
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleObjectClick = (objectId) => {
    navigate(`/category/objects/${objectId}/details`);
  };

  const handleAddObject = () => {
    navigate(`/category/objects/${categoryId}/add`); // Asegúrate de que esta ruta es correcta
  };

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categoryId}/objects`);
        setObjects(response.data);
      } catch (error) {
        console.error("Error al obtener objetos:", error);
      }
    };

    fetchObjects();
  }, [categoryId]);

  return (
    <Box className="object-container" m="20px">
      {/* Encabezado y botón alineados a la derecha */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="OBJETOS" subtitle={`Objetos de la categoría ${categoryId}`} />
        <Button
          onClick={handleAddObject}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            width: "auto", // Ajusta el ancho automáticamente
            flexShrink: 0, // Evita que se expanda
            marginLeft: "10px" // Espacio entre el texto y el botón
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Agregar Objetos
        </Button>
      </Box>

      {/* Lista de objetos */}
      <div className="card-container">
        {objects.length > 0 ? (
          objects.map((obj) => (
            <div className="card" key={obj.id} onClick={() => handleObjectClick(obj.id)}>
              <img src={obj.image_url} alt={obj.name} />
              <h3>{obj.name}</h3>
            </div>
          ))
        ) : (
          <p>No hay objetos disponibles para esta categoría.</p>
        )}
      </div>
    </Box>
  );
};

export default ObjectList;
