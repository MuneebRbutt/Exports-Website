export const CATEGORIES = [
  { name: 'Sportswear', slug: 'sportswear' },
  { name: 'Casual Wear', slug: 'casual-wear' },
  { name: 'Gloves', slug: 'gloves' },
  { name: 'Accessories', slug: 'accessories' },
];

export const SIZE_CHARTS = {
  SPORTSWEAR: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  GLOVES: ['8oz', '10oz', '12oz', '14oz', '16oz'],
  ACCESSORIES: ['One Size'],
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
];

export const SHIPPING_REGIONS = [
  {
    name: 'Middle East & Gulf',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
  },
  {
    name: 'Europe & UK',
    countries: ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
  },
  {
    name: 'North America',
    countries: ['USA', 'Canada'],
  },
];

export const B2B_CONFIG = {
  MIN_ORDER_QUANTITY: 50,
  EXPORT_DISCOUNT_THRESHOLD: 100,
};
