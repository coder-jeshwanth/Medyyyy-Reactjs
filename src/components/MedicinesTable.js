import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { IoMdRemoveCircle, IoMdCloseCircle } from 'react-icons/io';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa";

import './MedicinesTable.css';

const MedicinesTable = ({ mode }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editableRow, setEditableRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [newRows, setNewRows] = useState([]);
    const [deletingRow, setDeletingRow] = useState(null);
    const [updatingRow, setUpdatingRow] = useState(null);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:8080/medicines';
    const USERNAME = 'jeshy';
    const PASSWORD = '5050';

    const fetchMedicines = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    'Content-Type': 'application/json',
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
        if (mode !== 'add') fetchMedicines();
    }, [mode]);

    const filteredMedicines = medicines.filter((medicine) => {
        const medicineNameWithoutNumbers = medicine.medicineName.replace(/[0-9]/g, '');
        return (
            medicineNameWithoutNumbers.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medicine.boxNumber.toString().includes(searchQuery)
        );
    });

    const handleAddClick = () => {
        setNewRows([...newRows, {
            brandName: '',
            medicineName: '',
            boxNumber: '',
            tabletsPerSheet: '',
            mrp: '',
            perCost: '', // Include perCost only in Add mode
        }]);
    };

    const handleRemoveClick = () => {
        setNewRows(newRows.slice(0, -1));
    };

    const handleSaveNewRows = async () => {
        try {
            const dataToSend = newRows.map(newRow => ({
                brandName: newRow.brandName,
                medicineName: newRow.medicineName,
                mrp: parseFloat(newRow.mrp),
                tabletsPerSheet: parseInt(newRow.tabletsPerSheet, 10),
                boxNumber: parseInt(newRow.boxNumber, 10),
                perCost: mode === 'add' ? parseFloat(newRow.perCost) : undefined, // Add perCost only in Add mode
            }));

            await axios.post(`${API_URL}/add`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
                },
            });

            setMedicines(prevMedicines => [...prevMedicines, ...dataToSend]);
            setNewRows([]);
        } catch (err) {
            setError(`Error adding data: ${err.message}`);
        }
    };

    const handleInputChange = (e, index, field, isNewRow = false) => {
        if (isNewRow) {
            const updatedNewRows = [...newRows];
            updatedNewRows[index][field] = e.target.value;
            setNewRows(updatedNewRows);
        } else {
            setEditedData({ ...editedData, [field]: e.target.value });
        }
    };

    const handleEditClick = (id) => {
        setEditableRow(id);
        const medicine = medicines.find((med) => med.id === id);
        setEditedData(medicine);
    };

    const handleSaveEdit = async () => {
        setUpdatingRow(editedData.id);
        try {
            await axios.put(`${API_URL}/update/${editedData.id}`, editedData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
                },
            });
            setMedicines(prevMedicines => prevMedicines.map(medicine =>
                medicine.id === editedData.id ? editedData : medicine
            ));
            setEditableRow(null);
            setTimeout(() => setUpdatingRow(null), 500);
        } catch (err) {
            setError(`Error updating data: ${err.message}`);
        }
    };

    const handleDelete = async (id) => {
        setDeletingRow(id);
        setTimeout(async () => {
            try {
                await axios.delete(`${API_URL}/delete/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
                    },
                });
                setMedicines(medicines.filter(medicine => medicine.id !== id));
            } catch (err) {
                setError(`Error deleting data: ${err.message}`);
            } finally {
                setDeletingRow(null);
            }
        }, 500);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.toLowerCase() === 'logout') {
            navigate('/login');
        }
    };

    return (
        <div className="medicines-table-container">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <table className="medicines-table">
                    <thead>
                    <tr>
                        {mode === 'add' ? (
                            <th colSpan={mode === 'add' ? 6 : 7} className="text-right">
                                <button className="add-button" onClick={handleAddClick}>
                                    <FaPlus/> Add
                                </button>
                                {newRows.length > 0 && (
                                    <>
                                        <button className="save-button" onClick={handleSaveNewRows}>
                                            <FaCheck/> Save
                                        </button>
                                        <button className="remove-button" onClick={handleRemoveClick}>
                                            <IoMdRemoveCircle/> Remove
                                        </button>
                                    </>
                                )}
                            </th>
                        ) : (
                            <th colSpan="8">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleSearchKeyPress}
                                        className="search-bar"
                                    />
                                    <FaSearchengin className="search-icon"/>
                                </div>
                            </th>
                        )}
                    </tr>
                    <tr className="bg-gray-200">
                        {mode !== 'add' && <th>ID</th>}
                        <th>Brand Name</th>
                        <th>Medicine Name</th>
                        <th>Box Number</th>
                        <th>Tablets per Sheet</th>
                        <th>MRP</th>
                        {mode !== 'update' && <th>Per Cost</th>} {/* Exclude Per Cost in Update mode */}
                        {mode === 'update' && <th><GrUpdate/></th>}
                        {mode === 'remove' && <th><AiOutlineDelete/></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {newRows.map((newRow, index) => (
                        <tr key={index}>
                            {Object.keys(newRow).map((field) => {
                                if (mode === 'update' && field === 'perCost') return null; // Skip perCost in Update mode
                                return (
                                    <td key={field}>
                                        <input
                                            type="text"
                                            value={newRow[field]}
                                            onChange={(e) => handleInputChange(e, index, field, true)}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {filteredMedicines.length > 0 ? (
                        filteredMedicines.map((medicine) => (
                            <tr key={medicine.id} className={deletingRow === medicine.id ? 'vanish' : updatingRow === medicine.id ? 'update' : ''}>
                                {mode !== 'add' && <td>{medicine.id}</td>}
                                <td>
                                    {editableRow === medicine.id ? (
                                        <input
                                            type="text"
                                            value={editedData.brandName}
                                            onChange={(e) => handleInputChange(e, null, 'brandName')}
                                        />
                                    ) : (
                                        medicine.brandName
                                    )}
                                </td>
                                <td>
                                    {editableRow === medicine.id ? (
                                        <input
                                            type="text"
                                            value={editedData.medicineName}
                                            onChange={(e) => handleInputChange(e, null, 'medicineName')}
                                        />
                                    ) : (
                                        medicine.medicineName
                                    )}
                                </td>
                                <td>
                                    {editableRow === medicine.id ? (
                                        <input
                                            type="text"
                                            value={editedData.boxNumber}
                                            onChange={(e) => handleInputChange(e, null, 'boxNumber')}
                                        />
                                    ) : (
                                        medicine.boxNumber
                                    )}
                                </td>
                                <td>
                                    {editableRow === medicine.id ? (
                                        <input
                                            type="text"
                                            value={editedData.tabletsPerSheet}
                                            onChange={(e) => handleInputChange(e, null, 'tabletsPerSheet')}
                                        />
                                    ) : (
                                        medicine.tabletsPerSheet
                                    )}
                                </td>
                                <td>
                                    {editableRow === medicine.id ? (
                                        <input
                                            type="text"
                                            value={editedData.mrp}
                                            onChange={(e) => handleInputChange(e, null, 'mrp')}
                                        />
                                    ) : (
                                        medicine.mrp
                                    )}
                                </td>
                                {mode !== 'update' && ( // Conditionally render Per Cost column
                                    <td>
                                        {editableRow === medicine.id ? (
                                            <input
                                                type="text"
                                                value={editedData.perCost}
                                                onChange={(e) => handleInputChange(e, null, 'perCost')}
                                            />
                                        ) : (
                                            medicine.perCost
                                        )}
                                    </td>
                                )}
                                {mode === 'update' && (
                                    <td>
                                        {editableRow === medicine.id ? (
                                            <FaCheck onClick={handleSaveEdit} className="save-icon"/>
                                        ) : (
                                            <MdModeEdit onClick={() => handleEditClick(medicine.id)}
                                                        className="edit-icon"/>
                                        )}
                                    </td>
                                )}
                                {mode === 'remove' && (
                                    <td>
                                        <IoMdCloseCircle onClick={() => handleDelete(medicine.id)} className="delete-icon"/>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        mode !== 'add' && (
                            <tr>
                                <td colSpan={mode === 'add' ? 6 : 8} className="no-data">No data available.</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MedicinesTable;
