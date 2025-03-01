import { GetPriceAdapter } from './abstract';

export class Aliexpress extends GetPriceAdapter {
    protected priceClassname = 'price--currentPriceText--V8_y_b5 pdp-comp-price-current product-price-value';
}
