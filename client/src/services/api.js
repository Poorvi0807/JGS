import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const fetchOrders = async ({ pageParam = null, limit = 50, sort = 'createdAt', sortDirection = 'asc' }) => {
  const response = await axios.get(API_URL, {
    params: {
      cursor: pageParam,
      limit,
      sort,
      sortDirection
    }
  });
  return response.data;
};
