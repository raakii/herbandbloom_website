import { getProductDescription } from './productDescriptions';

// Centralized product data
export const getProductData = (language, translations) => {
    return [
        {
            id: 1,
            image1: '/images/IMG2.JPG',
            image2: '/images/IMG_2576.jpg',
            tag: 'Best Seller',
            tagClass: 'text-bg-success',
            product: language === 'en' ? translations.bloom_grow_hair_oil : translations.bloom_grow_hair_oil,
            amount: '10 000 Fcfa',
            description: getProductDescription(1, language),
            sizes: ['50ml'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.8,
            reviews: 42
        },
        {
            id: 2,
            image1: '/images/IMG_5474.JPG',
            image2: '/images/IMG_5454.JPG',
            tag: 'New',
            tagClass: 'text-bg-primary',
            product: language === 'en' ? translations.bloom_butter_hair_cream : translations.bloom_butter_hair_cream,
            amount: '5 000 Fcfa',
            description: getProductDescription(2, language),
            sizes: ['150ml'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.5,
            reviews: 8
        },
        {
            id: 4,
            image1: '/images/henné.png',
            image2: '/images/henné2.png',
            tag: 'New',
            tagClass: 'text-bg-primary',
            product: language === 'en' ? translations.henna_powder : translations.henna_powder,
            amount: '2 000 Fcfa',
            description: getProductDescription(4, language),
            sizes: ['150g'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.0,
            reviews: 5
        }
    ];
};

// Helper function to get a specific product by ID
export const getProductById = (id, language, translations) => {
    const products = getProductData(language, translations);
    return products.find(product => product.id === id);
};

// Helper function to get other products (excluding current product)
export const getOtherProducts = (currentProductId, language, translations, limit = 3) => {
    const products = getProductData(language, translations);
    return products
        .filter(product => product.id !== currentProductId)
        .slice(0, limit);
};
