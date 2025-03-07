import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const FormPeriods = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREAR PERIODO" subtitle="Crear un Nuevo Periodo de Trabajo" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
    
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),

});
const initialValues = {
 name: "",
};

export default FormPeriods;
