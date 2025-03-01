export interface PriceHistory {
    id: number;
    productId: number;
    price: string;
    scrapedAt: string;
}

export interface Product {
    id: number;
    url: string;
    name: string;
    priceHistory: PriceHistory[];
}
