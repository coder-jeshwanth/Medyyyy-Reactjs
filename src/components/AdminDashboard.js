import React, { useState } from "react";
import Header from "./Header";
import MedicinesTable from "./MedicinesTable";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [medicines, setMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTableVisible, setIsTableVisible] = useState(false);

    const handleSearchClick = () => {
        setIsTableVisible(false); // Hide the MedicinesTable when search icon is clicked
    };

    const handleMedicinesClick = () => {
        setIsTableVisible(!isTableVisible); // Toggle visibility of MedicinesTable
    };

    return (
        <div className="admin-dashboard">
            <Header
                setSearchQuery={setSearchQuery}
                onSearchClick={handleSearchClick}
                onMedicinesClick={handleMedicinesClick} // Pass the function as a prop
            />
            {isTableVisible && <MedicinesTable medicines={medicines} searchQuery={searchQuery} />}
        </div>
    );
}

export default AdminDashboard;