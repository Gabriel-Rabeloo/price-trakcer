import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getRandomColor } from '../utils';
import { Product } from '../types/api.ts';
import moment from 'moment';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface PriceChartProps {
    product: Product;
}
const PriceChart: React.FC<PriceChartProps> = ({ product }: PriceChartProps) => {
    if (!product.priceHistory.length) return <p>Sem dados para exibir.</p>;
    const color = getRandomColor();

    moment.locale('en');

    const data = {
        labels: product.priceHistory.map((el) => moment(el.scrapedAt).format('MMM D, HH:mm')),
        datasets: [
            {
                label: product.name,
                data: product.priceHistory.map((el) => el.price),
                borderColor: color,
                backgroundColor: `${color}66`,
                tension: 0.8,
            },
        ],
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
                display: false,
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

    return (
        <Line
            data={data}
            options={options}
            onClick={() => {
                window.open(product.url, '_blank');
            }}
        />
    );
};

export default PriceChart;
