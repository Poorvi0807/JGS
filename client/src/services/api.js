import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchOrders = async ({ pageParam = '' }) => {
  const { data } = await api.get(`/orders?cursor=${pageParam}&limit=50`);
  return data;
};
