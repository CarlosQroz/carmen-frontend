import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsByObject } from "./detailService";
import "./DetailList.css";  
import { Box } from "@mui/material";
import Header from "../../components/Header";

const DetailList = () => {
    const { objectId } = useParams(); // Obtiene el ID del objeto desde la URL
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getDetailsByObject(objectId);
                console.log("Detalles recibidos:", response.data)
                setDetails([response.data]);
            } catch (error) {
                console.error("Error al obtener detalles:", error);
                setError("No se pudo obtener los detalles.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [objectId]);

    return (
        <Box m="20px">
            <Header title="DETALLES" subtitle={`Detalles del objeto ${objectId}`} />
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : details.length > 0 ? (
                <div className="card-container">
                    {details.map((detail) => (
                        <div className="card" key={detail.id}>
                            <h3>{detail.details}</h3>
                            <p>Stock: {detail.stock}</p>
                            <p>Precio: {detail.precio_unitario}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay detalles disponibles para este objeto.</p>
            )}
        </Box>
    );
};
export default DetailList;
