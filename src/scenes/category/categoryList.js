import React, { useEffect, useState } from "react";
import { getCategories } from "./categoryService";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/objects/${categoryId}`);
  };

  const handleAddCategory = () => {
    navigate("/category/add"); // Navegar a la vista de agregar categoría
  };

  return (
    <Box m="20px">
      {/* Header y botón */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CATEGORIAS" subtitle="Selecciona la categoría que necesites." />
        <Button
          onClick={handleAddCategory}
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
          Agregar Categoría
        </Button>
      </Box>

      {/* Lista de categorías */}
      <div className="card-container">
        {categories.map((category) => (
          <div
            className="card"
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <img src={`http://localhost:3000${category.image_url}`} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategoryList;
