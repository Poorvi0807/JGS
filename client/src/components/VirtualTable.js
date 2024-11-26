import React, { useRef } from 'react';
import { useVirtual } from 'react-virtual';

const VirtualTable = ({ data, fetchMore, hasNextPage }) => {
  const parentRef = useRef();

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: () => 50, // Row height in pixels
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: '600px', // Adjust table height as needed
        overflow: 'auto',
        border: '1px solid #ddd',
      }}
      onScroll={(e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
          fetchMore();
        }
      }}
    >
      <div style={{ height: `${rowVirtualizer.totalSize}px`, position: 'relative' }}>
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const order = data[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
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
