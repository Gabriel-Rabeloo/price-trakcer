export const pricerNormalizer = (price: string): number => {
    // replaces all non-numeric characters with empty string

    if (price.startsWith('R$')) {
        return parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
    }
    return Number(price.replace(/[^0-9.-]+/g, ''));
};

export const validURL = (str: string): boolean => {
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};
