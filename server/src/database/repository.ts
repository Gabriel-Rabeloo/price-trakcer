import { PrismaClient } from '@prisma/client';
import { CreatePriceHistory, CreateProduct, PriceHistory, Product } from '../types/models';

export class Repository {
    private prisma: PrismaClient = new PrismaClient();

    async addProduct(data: CreateProduct): Promise<Product> {
        console.log({
            data,
        });
        return this.prisma.product.create({
            data,
        });
    }

    async getProduct(id: number): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: {
                id,
            },
        });
    }

    async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany({
            include: {
                priceHistory: true,
            },
        });
    }

    async getProductByName(name: string): Promise<Product | null> {
        return this.prisma.product.findFirst({
            where: {
                name,
            },
        });
    }

    async setPrice(data: CreatePriceHistory): Promise<PriceHistory> {
        return this.prisma.priceHistory.create({
            data,
        });
    }
}
