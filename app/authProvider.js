'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const useAuth = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ user, children }) => {
    const [userID, setUserID] = useState(user); // Default to the passed user initially

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserID(JSON.parse(storedUser));
        } else {
            setUserID(user);
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userID));
    }, [userID]);

    console.log(userID);

    return (
        <UserContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserContext.Provider>
    );
};
