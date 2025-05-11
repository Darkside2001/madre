import axios from "axios";

export async function nombrePagina(ruta) {
  try {
    const formData = new FormData();
    formData.append('ruta', ruta);

    const response = await axios.post(process.env.VUE_APP_URL_AXIOS + 'obtenerNombreRuta', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.nombreDeRuta;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error; 
  }
}