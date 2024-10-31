import React, { useEffect, useState } from "react";
import { getCategories } from "./categoryService";
import { Box } from "@mui/material";
import { Formik } from "formik"; 
import Header from "../../components/Header";
import "./CategoryList.css"; 

import { useNavigate } from "react-router-dom";


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


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
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    exampleField: '',
  };

  const checkoutSchema = {
  };


  return (
    <Box m="20px">
      <Header title="CATEGORIAS" subtitle="Selecciona la categoría que necesites." />

      <Formik
        onSubmit={() => {}}
        initialValues={{ exampleField: '' }}
        validationSchema={{}}
      >
        {() => (
          <div className="card-container">
            {categories.map((category) => (
              <div
                className="card" 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                <img src={category.image_url} alt={category.name} />
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        )}
      </Formik>
    </Box>
  );
};

export default CategoryList;
