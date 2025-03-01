import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './hooks/use-products.ts';
import PriceChart from './components/price-chart.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductsView />
        </QueryClientProvider>
    );
};

const ProductsView: React.FC = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error || !products) return <p>Error fetching products.</p>;

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px',
            }}
        >
            {products
                .filter((el) => el.priceHistory.length)
                .map((product) => (
                    <div
                        key={product.id}
                        style={{
                            width: '45%',
                            backgroundColor: '#f8f7f7',
                            borderRadius: '10px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            textAlign: 'center',
                            padding: '20px',
                        }}
                    >
                        <h1 style={{ color: '#000', fontSize: '1.5rem' }}>{product.name}</h1>
                        <PriceChart product={product} />
                    </div>
                ))}
        </div>
    );
};

export default App;
