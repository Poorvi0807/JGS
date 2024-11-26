import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import OrdersPage from './pages/OrdersPage';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <OrdersPage />
    </div>
  </QueryClientProvider>
);

export default App;
