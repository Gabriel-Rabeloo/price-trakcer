import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PriceHistory {
    id: number;
    productId: number;
    price: string;
    scrapedAt: string;
}

interface Product {
    id: number;
    name: string;
    priceHistory: PriceHistory[];
}

interface PriceChartProps {
    products: Product[];
}

// Função para gerar cores aleatórias
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
};

const PriceChart: React.FC<PriceChartProps> = ({ products }) => {
    if (!products.length) return <p>Sem dados para exibir.</p>;

    // Pegar todas as datas únicas ordenadas
    const allDates = Array.from(new Set(products.flatMap((product) => product.priceHistory.map((entry) => entry.scrapedAt)))).sort();

    // Criar datasets para cada produto
    const datasets = products.map((product) => {
        const color = getRandomColor();
        return {
            label: product.name,
            data: allDates.map((date) => {
                const history = product.priceHistory.find((entry) => entry.scrapedAt === date);
                return history ? Number(history.price) : null;
            }),
            borderColor: color,
            backgroundColor: `${color}66`,
            tension: 0.2,
        };
    });

    const data = {
        labels: allDates.map((date) => new Date(date).toLocaleDateString()),
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Histórico de Preços' },
        },
    };

    return <Line data={data} options={options} />;
};

export default PriceChart;
