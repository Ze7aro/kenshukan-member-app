import axios from 'axios'

const api  = axios.create({
  baseURL: 'http://192.168.100.13:3001/api/data'
});
 


const getData = async () => {
  try {
    const response = await api.get('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error en getData:', error);
    return null;
  }
};

const createData = async (data) => {
  try {
    const response = await api.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Error en createData:', error);
    return null;
  }
};

const updateData = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en updateData:', error);
    return null;
  }
};

export default {getData, createData, updateData}
