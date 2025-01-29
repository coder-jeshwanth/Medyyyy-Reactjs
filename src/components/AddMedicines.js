import React, { useState } from 'react';
import './AddMedicines.css';

function AddMedicines() {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({
        brandName: '',
        medicineName: '',
        mrp: '',
        tabletsPerSheet: '',
        boxNumber: '',
        perCost: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine({ ...newMedicine, [name]: value });
    };

    const handleAddRow = () => {
        setMedicines([...medicines, newMedicine]);
        setNewMedicine({
            brandName: '',
            medicineName: '',
            mrp: '',
            tabletsPerSheet: '',
            boxNumber: '',
            perCost: ''
        });
    };

    const handleSubmit = async () => {
        try {
            let payload = [...medicines];

            // If newMedicine has values but hasn't been added to medicines, include it
            if (newMedicine.brandName && newMedicine.medicineName) {
                payload.push(newMedicine);
            }

            if (payload.length === 0) {
                alert("No medicines to submit");
                return;
            }

            console.log('Payload:', JSON.stringify(payload)); // Log the payload to check

            const response = await fetch('http://localhost:8080/medicines/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('jeshy:5050')
                },
                body: JSON.stringify(payload) // Always send as an array
            });

            if (response.ok) {
                alert('Medicines added successfully');
                setMedicines([]);
                setNewMedicine({
                    brandName: '',
                    medicineName: '',
                    mrp: '',
                    tabletsPerSheet: '',
                    boxNumber: '',
                    perCost: ''
                });
            } else {
                const errorMessage = await response.text(); // Get error response from backend
                alert(`Failed to add medicines: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding medicines');
        }
    };


    return (
        <div className="add-medicines-container">
            <h2>Add Medicines</h2>
            <table className="medicines-table">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Medicine Name</th>
                        <th>MRP</th>
                        <th>Tablets Per Sheet</th>
                        <th>Box Number</th>
                        <th>Per Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => (
                        <tr key={index}>
                            <td>{medicine.brandName}</td>
                            <td>{medicine.medicineName}</td>
                            <td>{medicine.mrp}</td>
                            <td>{medicine.tabletsPerSheet}</td>
                            <td>{medicine.boxNumber}</td>
                            <td>{medicine.perCost}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><input type="text" name="brandName" value={newMedicine.brandName} onChange={handleInputChange} /></td>
                        <td><input type="text" name="medicineName" value={newMedicine.medicineName} onChange={handleInputChange} /></td>
                        <td><input type="number" name="mrp" value={newMedicine.mrp} onChange={handleInputChange} /></td>
                        <td><input type="number" name="tabletsPerSheet" value={newMedicine.tabletsPerSheet} onChange={handleInputChange} /></td>
                        <td><input type="number" name="boxNumber" value={newMedicine.boxNumber} onChange={handleInputChange} /></td>
                        <td><input type="number" name="perCost" value={newMedicine.perCost} onChange={handleInputChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleAddRow}>Add Row</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default AddMedicines;