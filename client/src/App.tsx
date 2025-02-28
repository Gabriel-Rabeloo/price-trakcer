import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './hooks/use-products.ts';
import PriceChart from './components/price-chart.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Full viewport height
                    width: '100vw', // Full viewport width
                    backgroundColor: '#111', // Darker background
                    color: 'white',
                }}
            >
                <ProductsView />
            </div>
        </QueryClientProvider>
    );
};

const ProductsView: React.FC = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching products.</p>;

    return (
        <div
            style={{
                width: '80%',
                height: '80%',
                maxWidth: '1200px',
                padding: '20px',
                backgroundColor: '#222', // Slightly lighter than background
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                textAlign: 'center',
            }}
        >
            <h1>Histórico de Preços</h1>
            <PriceChart products={products} />
        </div>
    );
};

export default App;
