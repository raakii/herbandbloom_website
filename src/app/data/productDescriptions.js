// Centralized product descriptions
export const getProductDescriptions = (language) => {
    const descriptions = {
        en: {
            1: 'Nourishing hair oil made with natural ingredients to promote healthy hair growth and shine. Perfect for all hair types.',
            2: 'Hydrating hair cream that moisturizes and defines curls while providing long-lasting hold. Ideal for curly and wavy hair.',
            4: 'Henna powder, great for hand decoration, face or hair masks'
        },
        fr: {
            1: 'Huile capillaire nourrissante à base d\'ingrédients naturels pour favoriser la croissance et la brillance des cheveux. Parfaite pour tous types de cheveux.',
            2: 'Crème capillaire hydratante qui hydrate et définit les boucles tout en offrant une tenue durable. Idéale pour les cheveux bouclés et ondulés.',
            4: 'Poudre de henné, excellente pour la décoration des mains, masques pour le visage ou les cheveux'
        }
    };
    
    return descriptions[language] || descriptions.en;
};

// Helper function to get description for a specific product
export const getProductDescription = (productId, language) => {
    const descriptions = getProductDescriptions(language);
    return descriptions[productId] || '';
};
