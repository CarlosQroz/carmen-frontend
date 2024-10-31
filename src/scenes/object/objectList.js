import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig"; 
import "./ObjectList.css"; 
import { Box } from "@mui/material";
import Header from "../../components/Header";

const ObjectList = () => {
  const { categoryId } = useParams(); 
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  const handleObjectClick = (objectId) => {
    navigate(`/category/objects/${objectId}/details`);
  };
  

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${categoryId}/objects`);
        setObjects(response.data);
      } catch (error) {
        console.error("Error al obtener objetos:", error);
        //setError("No se pudo obtener los objetos.");
      } finally {
        //setLoading(false);
      }
    };

    fetchObjects();
  }, [categoryId]);

  return (
    <Box m="20px">
      <Header title="OBJETOS" subtitle={`Objetos de la categoría ${categoryId}`} />
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
