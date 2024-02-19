const axios = require ('axios');

const apiUrl = "http://localhost:3000/api/employees";

async function getEmployees() {
    try {
      // Realiza la solicitud GET a la API de empleados
      const response = await axios.get(apiUrl);
      
      // Muestra los datos de los empleados en la consola
      console.log('Lista de empleados:');
      console.log(response.data);
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error al obtener los empleados:', error.message);
    }
  }
  
  // Llama a la función para obtener y mostrar los datos de los empleados
  getEmployees();
  
async function getEmployeeById(employeeId) {
  try {
    // Concatenar el ID del empleado a la URL de la API
    const url = `${apiUrl}/${employeeId}`;
    
    // Realizar la solicitud GET a la API para obtener el empleado por su ID
    const response = await axios.get(url);
    
    // Mostrar los datos del empleado en la consola
    console.log('Empleado encontrado:');
    console.log(response.data);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener el empleado:', error.message);
  }
}

// ID del empleado que deseas obtener
const empleadoId = 2; // Reemplaza 123 con el ID del empleado que deseas obtener

// Llamar a la función para obtener y mostrar los datos del empleado por su ID
getEmployeeById(empleadoId);

