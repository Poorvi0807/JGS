import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchOrders } from '../services/api';  
import VirtualTable from '../components/VirtualTable';

const OrdersPage = () => {
  const [sort, setSort] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('asc');
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery(
    ['orders', { sort, sortDirection }],
    ({ pageParam = null }) => fetchOrders({ pageParam, limit: 50, sort, sortDirection }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || null,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <h1 style={styles.heading}>Orders</h1>

      <div style={styles.sortControls}>
        <button
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          style={styles.sortButton}
        >
          Toggle Sort Direction
        </button>
        <button onClick={() => setSort('orderAmount')} style={styles.sortButton}>
          Sort by Amount
        </button>
        <button onClick={() => setSort('createdAt')} style={styles.sortButton}>
          Sort by Date
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableCell}>Customer Name</th>
              <th style={styles.tableCell}>Order Amount</th>
              <th style={styles.tableCell}>Status</th>
            </tr>
          </thead>
          <tbody style={styles.body}>
            <VirtualTable
              data={data.pages.flatMap((page) => page.data)}
              fetchMore={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
    letterSpacing: '1px',
  },
  sortControls: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  sortButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  sortButtonHover: {
    backgroundColor: '#45a049',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed'
  },
  tableHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#f1f1f1',
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  body: {
    width: '100%',
    display: 'block',
    overflowX: 'auto',
  },
  tableRow: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
  },
  tableColumn: {
    flex: 1,
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default OrdersPage;
