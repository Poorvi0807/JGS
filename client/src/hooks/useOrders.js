import { useInfiniteQuery } from 'react-query';
import { fetchOrders } from '../services/api';

const useOrders = () =>
  useInfiniteQuery('orders', fetchOrders, {
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });

export default useOrders;
