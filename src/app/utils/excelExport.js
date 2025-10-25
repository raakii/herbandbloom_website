import * as XLSX from 'xlsx';

// Fonction pour ajouter une commande à un fichier Excel existant
export const addOrderToExcel = (orderData, cartItems) => {
    try {
        // Récupérer les commandes existantes du localStorage
        const existingOrders = JSON.parse(localStorage.getItem('herb_bloom_orders') || '[]');
        
        // Créer la nouvelle entrée
        const newOrder = {
            date: orderData.order_date,
            id: orderData.order_id,
            customer_name: orderData.customer_name,
            email: orderData.customer_email,
            phone: orderData.customer_phone,
            address: orderData.customer_address,
            city: orderData.customer_city,
            country: orderData.customer_country,
            total: orderData.order_total,
            items: cartItems.map(item => 
                `${item.product} (${item.size}) - Qty: ${item.quantity} - Prix: ${(item.price * item.quantity).toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA`
            ).join('; '),
            timestamp: new Date().toISOString()
        };
        
        // Ajouter la nouvelle commande
        existingOrders.push(newOrder);
        
        // Sauvegarder dans localStorage
        localStorage.setItem('herb_bloom_orders', JSON.stringify(existingOrders));
        
        // Créer le fichier Excel avec toutes les commandes
        const excelData = [
            // En-têtes
            ['Date', 'ID Commande', 'Nom Client', 'Email', 'Téléphone', 'Adresse', 'Ville', 'Pays', 'Total', 'Articles']
        ];
        
        // Ajouter toutes les commandes
        existingOrders.forEach(order => {
            excelData.push([
                order.date,
                order.id,
                order.customer_name,
                order.email,
                order.phone,
                order.address,
                order.city,
                order.country,
                order.total,
                order.items
            ]);
        });
        
        // Créer un workbook
        const wb = XLSX.utils.book_new();
        
        // Créer une feuille de calcul
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        
        // Ajouter la feuille au workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Commandes Herb & Bloom');
        
        // Générer le nom du fichier
        const fileName = `Commandes_Herb_Bloom_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // Télécharger le fichier
        XLSX.writeFile(wb, fileName);
        
        console.log(`Commande ajoutée. Total des commandes: ${existingOrders.length}`);
        
        return { 
            success: true, 
            fileName, 
            totalOrders: existingOrders.length,
            newOrder 
        };
        
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la commande:', error);
        return { success: false, error: error.message };
    }
};

// Fonction pour exporter toutes les commandes (fonction existante améliorée)
export const exportAllOrdersToExcel = () => {
    try {
        const existingOrders = JSON.parse(localStorage.getItem('herb_bloom_orders') || '[]');
        
        if (existingOrders.length === 0) {
            alert('Aucune commande à exporter');
            return { success: false, message: 'Aucune commande trouvée' };
        }

        // Créer les données pour l'Excel
        const excelData = [
            // En-têtes
            ['Date', 'ID Commande', 'Nom Client', 'Email', 'Téléphone', 'Adresse', 'Ville', 'Pays', 'Total', 'Articles']
        ];

        // Ajouter chaque commande
        existingOrders.forEach(order => {
            excelData.push([
                order.date,
                order.id,
                order.customer_name,
                order.email,
                order.phone,
                order.address,
                order.city,
                order.country,
                order.total,
                order.items
            ]);
        });

        // Créer un workbook
        const wb = XLSX.utils.book_new();
        
        // Créer une feuille de calcul
        const ws = XLSX.utils.aoa_to_sheet(excelData);
        
        // Ajouter la feuille au workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Toutes les commandes');
        
        // Générer le nom du fichier
        const fileName = `Commandes_Herb_Bloom_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // Télécharger le fichier
        XLSX.writeFile(wb, fileName);
        
        return { success: true, fileName, totalOrders: existingOrders.length };
        
    } catch (error) {
        console.error('Erreur lors de l\'export:', error);
        return { success: false, error: error.message };
    }
};

// Fonction pour obtenir le nombre total de commandes
export const getTotalOrders = () => {
    try {
        const existingOrders = JSON.parse(localStorage.getItem('herb_bloom_orders') || '[]');
        return existingOrders.length;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        return 0;
    }
};

// Fonction pour vider toutes les commandes (optionnel)
export const clearAllOrders = () => {
    try {
        localStorage.removeItem('herb_bloom_orders');
        return { success: true, message: 'Toutes les commandes ont été supprimées' };
    } catch (error) {
        console.error('Erreur lors de la suppression des commandes:', error);
        return { success: false, error: error.message };
    }
};

