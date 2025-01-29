import React, { useState } from 'react';
import NHeader from './NHeader';
import { IoAddCircle } from 'react-icons/io5';
import { IoMdRemoveCircle } from 'react-icons/io';
import { FaEdit, FaSearch } from 'react-icons/fa';
import MedicinesTable from './MedicinesTable';

import './vikashome.css';

function VikasHome() {
    const [mode, setMode] = useState(''); // Track the mode (search, add, update)

    const handleModeChange = (newMode) => {
        setMode((prevMode) => (prevMode === newMode ? '' : newMode)); // Toggle mode
    };

    return (
        <div className="vikas-home">
            <NHeader />
            <div className="icon-container">
                <div className="icon-wrapper" onClick={() => handleModeChange('update')}>
                    <FaEdit className="icon fa-edit" />
                    <span className="icon-text">Update</span>
                </div>
                <div className="icon-wrapper" onClick={() => handleModeChange('add')}>
                    <IoAddCircle className="icon io-add-circle" />
                    <span className="icon-text">Add</span>
                </div>
                <div className="icon-wrapper" onClick={() => handleModeChange('remove')}>
                    <IoMdRemoveCircle className="icon io-md-remove-circle" />
                    <span className="icon-text">Remove</span>
                </div>
                <div className="icon-wrapper" onClick={() => handleModeChange('search')}>
                    <FaSearch className="icon fa-search" />
                    <span className="icon-text">Search</span>
                </div>
            </div>

            {/* Render MedicinesTable based on mode */}
            {mode && <MedicinesTable key={mode} mode={mode} />}
        </div>
    );
}

export default VikasHome;