import React from 'react';
import VirtualTable from '../components/VirtualTable';
import LoadingSpinner from '../components/LoadingSpinner';
import useOrders from '../hooks/useOrders';

const OrdersPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useOrders();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading orders!</div>;

  const orders = data.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1>Orders</h1>
      <VirtualTable
        data={orders}
        fetchMore={fetchNextPage}
        hasNextPage={hasNextPage}
      />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default OrdersPage;
