# Data Architecture

## Overview
This directory contains centralized data management for the Herb & Bloom application, optimizing data usage across different pages and components.

## Files

### `products.js`
Centralized product data management with the following functions:

- **`getProductData(language, translations)`**: Returns all products with translated names
- **`getProductById(id, language, translations)`**: Returns a specific product by ID
- **`getOtherProducts(currentProductId, language, translations, limit)`**: Returns other products excluding the current one

### `productDescriptions.js`
Centralized product descriptions in multiple languages:

- **`getProductDescriptions(language)`**: Returns all descriptions for a language
- **`getProductDescription(productId, language)`**: Returns description for a specific product

## Benefits

### ✅ **Optimization Achieved:**
1. **Single Source of Truth**: All product data is centralized
2. **No Duplication**: Product data is defined once and reused
3. **Easy Maintenance**: Changes to products only need to be made in one place
4. **Consistent Translations**: All product names and descriptions are consistently translated
5. **Performance**: Reduced bundle size by eliminating duplicate data
6. **Type Safety**: Centralized data structure ensures consistency

### 📁 **File Structure:**
```
src/app/data/
├── products.js           # Main product data
├── productDescriptions.js # Product descriptions
└── README.md            # This documentation
```

### 🔄 **Usage Across Pages:**
- **Homepage** (`page.tsx`): Uses `getProductData()`
- **Products Page** (`products/page.tsx`): Uses `getProductData()`
- **Product Detail** (`products/[id]/page.tsx`): Uses `getProductById()` and `getOtherProducts()`

### 🌐 **Internationalization:**
- Product names are translated using the translation system
- Product descriptions are managed separately for better organization
- Language switching updates all product data automatically

## Future Enhancements
- Add product categories
- Implement product filtering
- Add product search functionality
- Include product variants and options
