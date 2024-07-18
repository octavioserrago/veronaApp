import React, { useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiLogout, HiUser, HiShieldCheck, HiUserGroup, HiCash, HiOutlineUser } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
    const { logueado, roleId, branchId, logout } = useAuth();
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
                        {roleId === 1 && (
                            <>
                                <Sidebar.Item icon={HiShieldCheck}>
                                    <Link className="nav-link" to="/AdminPage">Home</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiUser}>
                                    <Link className="nav-link" to="/UsersCrud">Usuarios</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiChartPie}>
                                    <Link className="nav-link" to="/AdminStats">Estadísticas por Sucursal</Link>
                                </Sidebar.Item>
                            </>
                        )}
                        {roleId === 2 && (
                            <>
                                <Sidebar.Item icon={HiOutlineUser}>
                                    <Link className="nav-link" to="/ManagerPage">Home</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiCash}>
                                    <Link className="nav-link" to="/ManagerPage">Ingresos</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiUserGroup}>
                                    <Link className="nav-link" to="/ManagerPage">Ventas</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiChartPie}>
                                    <Link className="nav-link" to="/ManagerStats">Estadísticas</Link>
                                </Sidebar.Item>
                            </>
                        )}
                        {roleId === 3 && (
                            <>
                                <Sidebar.Item icon={HiUser}>
                                    <Link className="nav-link" to="/EmployeePage">Inicio</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiChartPie}>
                                    <Link className="nav-link" to="/EmployeeStats">Crear Venta</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiChartPie}>
                                    <Link className="nav-link" to="/EmployeeStats">Ingresos con Credito</Link>
                                </Sidebar.Item>
                            </>
                        )}
                        {logueado && (
                            <Sidebar.Item icon={HiLogout} onClick={handlerLogout}>
                                Cerrar Sesion
                            </Sidebar.Item>
                        )}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SideBar;
