import React from 'react';
import PriceChart from './components/PriceChart';

const sampleProducts = [
    {
        id: 1,
        name: 'iPhone 16 Pro Max 256GB White Titanium',
        priceHistory: [
            { id: 1, productId: 1, price: '1749', scrapedAt: '2025-02-20T12:00:00Z' },
            { id: 2, productId: 1, price: '1729', scrapedAt: '2025-02-22T12:00:00Z' },
            { id: 3, productId: 1, price: '1699', scrapedAt: '2025-02-25T12:00:00Z' },
            { id: 4, productId: 1, price: '1749', scrapedAt: '2025-02-27T12:00:00Z' },
        ],
    },
    {
        id: 2,
        name: 'iPhone 16 Pro Max 512GB Black Titanium',
        priceHistory: [
            { id: 5, productId: 2, price: '2049', scrapedAt: '2025-02-20T12:00:00Z' },
            { id: 6, productId: 2, price: '2029', scrapedAt: '2025-02-22T12:00:00Z' },
            { id: 7, productId: 2, price: '1999', scrapedAt: '2025-02-25T12:00:00Z' },
            { id: 8, productId: 2, price: '2049', scrapedAt: '2025-02-27T12:00:00Z' },
        ],
    },
    {
        id: 3,
        name: 'iPhone 16 Pro Max 1TB Desert Titanium',
        priceHistory: [
            { id: 9, productId: 3, price: '2349', scrapedAt: '2025-02-20T12:00:00Z' },
            { id: 10, productId: 3, price: '2299', scrapedAt: '2025-02-22T12:00:00Z' },
            { id: 11, productId: 3, price: '2249', scrapedAt: '2025-02-25T12:00:00Z' },
            { id: 12, productId: 3, price: '2349', scrapedAt: '2025-02-27T12:00:00Z' },
        ],
    },
];

const App: React.FC = () => {
    return (
        <div>
            <h1>Histórico de Preços de iPhones</h1>
            <PriceChart products={sampleProducts} />
        </div>
    );
};

export default App;
