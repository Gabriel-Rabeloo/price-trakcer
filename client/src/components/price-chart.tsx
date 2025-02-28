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

    let biggestIndex = 0;
    products.forEach((product) => {
        if (product.priceHistory.length > biggestIndex) {
            biggestIndex = product.priceHistory.length;
        }
    });

    const labels = [];

    for (let i = 1; i <= biggestIndex; i++) {
        labels.push(i);
    }

    // Criar datasets para cada produto
    const datasets = products.map((product) => {
        const color = getRandomColor();

        return {
            label: product.name,
            data: product.priceHistory.map((el) => el.price),
            borderColor: color,
            backgroundColor: `${color}66`,
            tension: 0.2,
        };
    });

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    console.log(data);

    return <Line data={data} options={options} />;
};

export default PriceChart;
