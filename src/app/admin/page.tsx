'use client'
import React, { useState, useEffect } from "react";
import { exportAllOrdersToExcel, getTotalOrders, clearAllOrders } from "../utils/excelExport";
import AdminLogin from "../components/AdminLogin";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Vérifier l'authentification au chargement
        checkAuthentication();
        loadOrders();
    }, []);

    const checkAuthentication = () => {
        const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
        const loginTime = sessionStorage.getItem('admin_login_time');
        
        if (isAuth && loginTime) {
            // Vérifier si la session n'a pas expiré (24 heures)
            const loginDate = new Date(loginTime);
            const now = new Date();
            const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                setIsAuthenticated(true);
            } else {
                // Session expirée
                sessionStorage.removeItem('admin_authenticated');
                sessionStorage.removeItem('admin_login_time');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    const loadOrders = () => {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('herb_bloom_orders') || '[]');
            setOrders(existingOrders);
            setTotalOrders(existingOrders.length);
        } catch (error) {
            console.error('Erreur lors du chargement des commandes:', error);
        }
    };

    const handleExportAll = async () => {
        setIsLoading(true);
        try {
            const result = exportAllOrdersToExcel();
            if (result.success) {
                alert(`Export réussi ! ${result.totalOrders} commandes exportées dans ${result.fileName}`);
            } else {
                alert(`Erreur lors de l'export: ${result.message || result.error}`);
            }
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
            alert('Erreur lors de l\'export des commandes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearAll = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes ? Cette action est irréversible.')) {
            try {
                const result = clearAllOrders();
                if (result.success) {
                    setOrders([]);
                    setTotalOrders(0);
                    alert('Toutes les commandes ont été supprimées');
                } else {
                    alert(`Erreur lors de la suppression: ${result.error}`);
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression des commandes');
            }
        }
    };

    const handleLogout = () => {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            sessionStorage.removeItem('admin_authenticated');
            sessionStorage.removeItem('admin_login_time');
            setIsAuthenticated(false);
        }
    };

    // Si pas authentifié, afficher le formulaire de connexion
    if (!isAuthenticated) {
        return <AdminLogin onLogin={setIsAuthenticated} />;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="mb-0">Administration - Commandes Herb & Bloom</h1>
                        <button 
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                            title="Se déconnecter"
                        >
                            <i className="mdi mdi-logout me-2"></i>
                            Déconnexion
                        </button>
                    </div>
                    
                    {/* Statistiques */}
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <div className="card bg-primary text-white">
                                <div className="card-body text-center">
                                    <h3>{totalOrders}</h3>
                                    <p className="mb-0">Total des commandes</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-success text-white">
                                <div className="card-body text-center">
                                    <h3>{orders.filter(order => new Date(order.timestamp).toDateString() === new Date().toDateString()).length}</h3>
                                    <p className="mb-0">Commandes aujourd'hui</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-info text-white">
                                <div className="card-body text-center">
                                    <h3>{orders.reduce((sum, order) => sum + parseFloat(order.total.replace(/[^0-9]/g, '')), 0).toLocaleString('fr-FR')} FCFA</h3>
                                    <p className="mb-0">Chiffre d'affaires total</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="btn-group" role="group">
                                <button 
                                    className="btn btn-success" 
                                    onClick={handleExportAll}
                                    disabled={isLoading || totalOrders === 0}
                                >
                                    {isLoading ? 'Export en cours...' : 'Exporter toutes les commandes'}
                                </button>
                                <button 
                                    className="btn btn-warning" 
                                    onClick={loadOrders}
                                >
                                    Actualiser
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={handleClearAll}
                                    disabled={totalOrders === 0}
                                >
                                    Supprimer toutes les commandes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Liste des commandes */}
                    {totalOrders > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>ID</th>
                                        <th>Client</th>
                                        <th>Email</th>
                                        <th>Téléphone</th>
                                        <th>Total</th>
                                        <th>Articles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.date}</td>
                                            <td>{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.total} FCFA</td>
                                            <td>
                                                <small className="text-muted">
                                                    {order.items.split('; ').length} article(s)
                                                </small>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            <h4>Aucune commande trouvée</h4>
                            <p>Les commandes apparaîtront ici une fois que les clients commenceront à passer des commandes.</p>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="mt-5">
                        <div className="card">
                            <div className="card-header">
                                <h5>Instructions d'utilisation</h5>
                            </div>
                            <div className="card-body">
                                <ul>
                                    <li><strong>Export Excel :</strong> Télécharge toutes les commandes dans un fichier Excel</li>
                                    <li><strong>Actualiser :</strong> Met à jour la liste des commandes</li>
                                    <li><strong>Supprimer :</strong> Supprime toutes les commandes (attention, irréversible)</li>
                                    <li><strong>Chaque commande :</strong> Est automatiquement ajoutée au fichier Excel lors de la validation</li>
                                </ul>
                                <div className="alert alert-warning">
                                    <strong>Note :</strong> Les commandes sont stockées localement dans le navigateur. 
                                    Pour une sauvegarde permanente, exportez régulièrement vos commandes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
