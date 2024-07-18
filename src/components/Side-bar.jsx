import React, { useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiLogout, HiUser } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
    const { logueado, logout } = useAuth();
    const navigate = useNavigate();

    const handlerLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    }

    useEffect(() => {
        if (!logueado) {
            navigate("/");
        }
    }, [logueado, navigate]);

    return (
        <div className="h-screen w-56 fixed">
            <Sidebar className='h-full'>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item icon={HiUser}>
                            <Link className="nav-link" to="/UsersCrud">Usuarios</Link>
                        </Sidebar.Item>
                        {logueado ? (
                            <Sidebar.Item icon={HiLogout} onClick={handlerLogout}>
                                Cerrar Sesion
                            </Sidebar.Item>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Login</Link>
                            </li>
                        )}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SideBar;
