import { Decimal } from '@prisma/client/runtime/client';

export interface Product {
    id: number;
    name: string;
    url: string;
}

export type CreateProduct = Omit<Product, 'id'>;

export interface PriceHistory {
    id: number;
    productId: number;
    product?: Product;
    price: Decimal;
    scrapedAt: Date;
}

export type CreatePriceHistory = {
    productId: number;
    price: number;
};
