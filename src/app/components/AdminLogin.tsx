'use client'
import React, { useState } from "react";
import { ADMIN_CONFIG } from "../config/admin";

interface AdminLoginProps {
    onLogin: (isAuthenticated: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulation d'un délai de connexion
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (credentials.username === ADMIN_CONFIG.USERNAME && 
            credentials.password === ADMIN_CONFIG.PASSWORD) {
            
            // Sauvegarder la session
            sessionStorage.setItem('admin_authenticated', 'true');
            sessionStorage.setItem('admin_login_time', new Date().toISOString());
            
            onLogin(true);
        } else {
            setError(ADMIN_CONFIG.MESSAGES.LOGIN_ERROR);
        }
        
        setIsLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError(''); // Effacer l'erreur quand l'utilisateur tape
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0">🔐 Administration Herb & Bloom</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        placeholder="Entrez votre nom d'utilisateur"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        placeholder="Entrez votre mot de passe"
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="mdi mdi-alert-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Connexion...
                                        </>
                                    ) : (
                                        <>
                                            <i className="mdi mdi-login me-2"></i>
                                            Se connecter
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="card-footer text-center text-muted">
                            <small>
                                <i className="mdi mdi-shield-check me-1"></i>
                                Accès sécurisé - Herb & Bloom
                            </small>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
