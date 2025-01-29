import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import MedicinesTable from './components/MedicinesTable';
import { HoverProvider } from './components/HoverContext';
import AddMedicines from './components/AddMedicines';
import VikasHome from './components/VikasHome';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (status) => {
        setIsAuthenticated(status);
        if (status) {
            navigate('/vikashome');
        }
    };

    return (
        <div className="App">
            <div className="content">
                <HoverProvider>
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/medicines-table" element={isAuthenticated ? <MedicinesTable searchQuery="" /> : <Navigate to="/login" />} />
                        <Route path="/vikashome" element={<VikasHome />} />
                        <Route path="/add-medicines" element={<AddMedicines />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </HoverProvider>
            </div>
        </div>
    );
}

export default App;