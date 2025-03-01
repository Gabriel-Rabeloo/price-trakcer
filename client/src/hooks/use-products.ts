import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/api.ts';

const fetchProducts = async () => {
    const { data } = await axios.get<Array<Product>>('https://price-trakcer.onrender.com/products');
    return data;
};

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, //  Cache for 5 minutes
    });
};
