import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualTable = ({ data, fetchMore, hasNextPage }) => {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: data.length, // Total number of rows
    getScrollElement: () => parentRef.current, // Function to return the scrollable element
    estimateSize: () => 50, // Estimated height of each row in pixels
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: '600px', // Table height
        overflow: 'auto', // Enable scrolling
        border: '1px solid #ddd',
      }}
      onScroll={(e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
          fetchMore(); // Fetch more data when scrolled to the bottom
        }
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`, // Set container height
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const order = data[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`, // Position each row
                padding: '10px',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{order.customerName}</span>
              <span>${order.orderAmount.toFixed(2)}</span>
              <span>{order.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualTable;
