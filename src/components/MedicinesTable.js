import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MedicinesTable.css";

const MedicinesTable = ({ searchQuery }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = "http://localhost:8080/medicines";
    const USERNAME = "jeshy";
    const PASSWORD = "5050";

    const fetchMedicines = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
                },
            });
            setMedicines(response.data);
        } catch (err) {
            setError(`Error fetching data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const filteredMedicines = medicines.filter(
        (medicine) => {
            const medicineNameWithoutNumbers = medicine.medicineName.replace(/\d+/g, '').toLowerCase();
            return medicineNameWithoutNumbers.includes(searchQuery.toLowerCase()) ||
                medicine.boxNumber.toString().includes(searchQuery);
        }
    );

    return (
        <div className="medicines-table-container">
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {!loading && !error && filteredMedicines.length > 0 && (
                <table className="medicines-table w-full mt-4 border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Brand Name</th>
                        <th className="px-4 py-2 border">Medicine Name</th>
                        <th className="px-4 py-2 border">Box Number</th>
                        <th className="px-4 py-2 border">Tablets per Sheet</th>
                        <th className="px-4 py-2 border">MRP</th>
                        <th className="px-4 py-2 border">Per Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMedicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td className="px-4 py-2 border">{medicine.id}</td>
                            <td className="px-4 py-2 border">{medicine.brandName}</td>
                            <td className="px-4 py-2 border">{medicine.medicineName}</td>
                            <td className="px-4 py-2 border">{medicine.boxNumber}</td>
                            <td className="px-4 py-2 border">{medicine.tabletsPerSheet}</td>
                            <td className="px-4 py-2 border">{medicine.mrp.toFixed(2)}</td>
                            <td className="px-4 py-2 border">{medicine.perCost.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && filteredMedicines.length === 0 && <p>No data available.</p>}
        </div>
    );
};

export default MedicinesTable;