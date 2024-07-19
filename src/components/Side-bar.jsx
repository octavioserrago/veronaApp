import React, { useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiLogout, HiUser, HiShieldCheck, HiUserGroup, HiCash, HiOutlineUser, HiCreditCard } from "react-icons/hi";
import { MdOutlineSell } from "react-icons/md";
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
                                    <Link className="nav-link" to="/AdminDashboard">Home</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiUser}>
                                    <Link className="nav-link" to="/UsersCrud">Usuarios</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiChartPie}>
                                    <Link className="nav-link" to="/AdminStats">Estadísticas global</Link>
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

                                <Sidebar.Item icon={HiCreditCard}>
                                    <Link className="nav-link" to="/EmployeeStats">Verificar Ing.Credito</Link>
                                </Sidebar.Item>
                            </>
                        )}
                        {roleId === 3 && (
                            <>
                                <Sidebar.Item icon={HiUser}>
                                    <Link className="nav-link" to="/sellerdashboard">Inicio</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={MdOutlineSell}>
                                    <Link className="nav-link" to="/NewSale">Crear Venta</Link>
                                </Sidebar.Item>
                                <Sidebar.Item icon={HiCreditCard}>
                                    <Link className="nav-link" to="/EmployeeStats">Verificar Ing.Credito</Link>
                                </Sidebar.Item>
                            </>
                        )}
                        {logueado && (
                            <a href="">
                                <Sidebar.Item icon={HiLogout} onClick={handlerLogout}>
                                    Cerrar Sesion
                                </Sidebar.Item>
                            </a>

                        )}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default SideBar;
