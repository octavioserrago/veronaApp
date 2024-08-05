import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiLogout, HiUser, HiShieldCheck, HiUserGroup, HiCash, HiOutlineUser, HiCreditCard, HiX } from "react-icons/hi"; // Importa el ícono HiX
import { MdOutlineSell } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { HiMenu } from 'react-icons/hi';
import { LiaCashRegisterSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { IoReceiptSharp } from "react-icons/io5";

const SideBar = () => {
    const { logueado, roleId, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handlerLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    useEffect(() => {
        if (!logueado) {
            navigate("/");
        }
    }, [logueado, navigate]);

    return (
        <div className={`h-screen fixed transition-all duration-500 ${sidebarOpen ? 'w-56' : 'w-0'}`}>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-400 text-white rounded"
            >
                {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
            <div className={`h-full fixed transition-all duration-500 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                <Sidebar className={`h-full ${sidebarOpen ? 'block' : 'hidden'}`}>
                    <Sidebar.Items className='pt-12'>
                        <Sidebar.ItemGroup>
                            {roleId === 1 && (
                                <>
                                    <Sidebar.Item icon={AiOutlineHome}>
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
                                    <Sidebar.Item icon={AiOutlineHome}>
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
                                    <Sidebar.Item icon={LiaCashRegisterSolid}>
                                        <Link className="nav-link" to="/IngresarDinero">Ingresar dinero de venta</Link>
                                    </Sidebar.Item>
                                </>
                            )}
                            {roleId === 3 && (
                                <>
                                    <Sidebar.Item icon={AiOutlineHome}>
                                        <Link className="nav-link" to="/sellerdashboard">Inicio</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={MdOutlineSell}>
                                        <Link className="nav-link" to="/NewSale">Crear Venta</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={HiCreditCard}>
                                        <Link className="nav-link" to="/VerificarIngresosCredito">Verificar Ing.Credito</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={LiaCashRegisterSolid}>
                                        <Link className="nav-link" to="/IngresarDinero">Ingresar dinero de venta</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item icon={IoReceiptSharp}>
                                        <Link className="nav-link" to="/Recibos">Enviar Recibo</Link>
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
        </div>
    );
}

export default SideBar;
