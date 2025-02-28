export const pricerNormalizer = (price: string): number => {
    // replaces all non-numeric characters with empty string
    return Number(price.replace(/[^0-9.-]+/g, ''));
};
