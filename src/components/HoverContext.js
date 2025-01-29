// src/components/HoverContext.js
import React, { createContext, useState } from 'react';

export const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
    const [isAddIconHovered, setIsAddIconHovered] = useState(false);

    return (
        <HoverContext.Provider value={{ isAddIconHovered, setIsAddIconHovered }}>
            {children}
        </HoverContext.Provider>
    );
};