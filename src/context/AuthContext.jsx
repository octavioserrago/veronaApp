import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logueado, setLogueado] = useState(false);
    const [roleId, setRoleId] = useState(null);
    const [branchId, setBranchId] = useState(null);

    const login = (user) => {
        setLogueado(true);
        setRoleId(user.role_id);
        setBranchId(user.branch_id);
    };

    const logout = () => {
        setLogueado(false);
        setRoleId(null);
        setBranchId(null);
    };

    return (
        <AuthContext.Provider value={{ logueado, roleId, branchId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
