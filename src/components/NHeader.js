import React, { useState } from 'react';
import './NHeader.css';

function NHeader() {
    const [isHovered, setIsHovered] = useState(false);

    const logoStyle = {
        height: '100%', // Adjust height for better alignment
        width: '100%',
        backgroundImage: isHovered ? 'url(/logohover.png)' : 'url(/logo.png)', // Change image on hover
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', // Center the logo image
        cursor: 'pointer',
    };

    return (
        <header className="header">
            <div className="logo-container">
                <div
                    style={logoStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
            </div>
        </header>
    );
}

export default NHeader;