import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ setSearchQuery, onSearchClick, onMedicinesClick }) {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();

    const handleMedicinesClick = () => {
        setIsSearchVisible(!isSearchVisible); // Toggle the visibility of the search icon and input
        onMedicinesClick();
    };

    const handleLogoutClick = () => {
        navigate("/login");
    };

    return (
        <div className="header">
            <div className="header-left">
                <span className="clinic-name">SIDDESHWARA CLINIC</span>
                <span className="plus-icon">+</span>
            </div>
            <div className="header-right">
                {isSearchVisible && (
                    <img src="/search.png" alt="Search" className="search-icon" />
                )}
                {isSearchVisible && (
                    <div className="search-container visible">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for medicines..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
                <Link to="/manage-users" className="header-link">
                    <img src="/user.png" alt="Manage Users" className="header-icon" />
                </Link>
                <img src="/medicine.png" alt="Manage Medicines" className="header-icon" onClick={handleMedicinesClick} />
                <img src="/logout.png" alt="Logout" className="header-icon" onClick={handleLogoutClick} />
            </div>
        </div>
    );
}

export default Header;