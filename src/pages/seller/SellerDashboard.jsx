import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/Side-bar';
import CardUSD from '../../components/Card-USD';
import SalesTable from '../../components/SalesTable';
import FeedbackMessage from '../../components/FeedbackMessage'; // Importa FeedbackMessage

const SellerDashboard = () => {
    const [dolarOficial, setDolarOficial] = useState({ compra: '', venta: '', fechaActualizacion: '' });
    const [dolarBlue, setDolarBlue] = useState({ compra: '', venta: '', fechaActualizacion: '' });
    const [branches, setBranches] = useState([]);
    const [sales, setSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const fetchBranches = async () => {
        try {
            const response = await axios.get('http://localhost:8888/branches');
            setBranches(response.data.results);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const fetchSales = async (searchQuery = '') => {
        try {
            const response = await axios.get('http://localhost:8888/sales', {
                params: { search: searchQuery }
            });
            const results = response.data.results;
            setSales(results);

            if (results.length === 0) {
                setFeedback({ message: 'No se encontraron resultados.', type: 'error' });
            } else {
                setFeedback({ message: '', type: '' }); // Clear feedback message
            }
        } catch (error) {
            console.error('Error fetching sales:', error);
            setFeedback({ message: 'Error al buscar ventas.', type: 'error' });
        }
    };

    useEffect(() => {
        fetchBranches();
        fetchSales();

        fetch("https://dolarapi.com/v1/dolares/oficial")
            .then(response => response.json())
            .then(data => {
                setDolarOficial({
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion
                });
            })
            .catch(error => console.error('Error fetching Dolar Oficial:', error));

        fetch("https://dolarapi.com/v1/dolares/blue")
            .then(response => response.json())
            .then(data => {
                setDolarBlue({
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion
                });
            })
            .catch(error => console.error('Error fetching Dolar Blue:', error));
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchSales(searchTerm);
    };

    const handleFeedbackClose = () => {
        setFeedback({ message: '', type: '' });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <SideBar />
            <div className="flex-1 p-4 md:ml-64">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h1 className="text-2xl ml-28 md:ml-0 font-bold mb-4 md:mb-0">Bienvenido/a vendedor!</h1>
                    <form onSubmit={handleSearchSubmit} className='w-2/4 max-w-md mx-auto px-4 py-6'>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Buscar por ID o nombre"
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Mensaje de feedback */}
                <FeedbackMessage
                    message={feedback.message}
                    type={feedback.type}
                    onClose={handleFeedbackClose}
                />

                <div className="ml-16 md:ml-0 flex flex-col md:flex-row md:space-x-4 mb-4">
                    <CardUSD
                        title="Dólar Oficial"
                        compra={dolarOficial.compra}
                        venta={dolarOficial.venta}
                        fechaActualizacion={dolarOficial.fechaActualizacion}
                    />
                    <CardUSD
                        title="Dólar Blue"
                        compra={dolarBlue.compra}
                        venta={dolarBlue.venta}
                        fechaActualizacion={dolarBlue.fechaActualizacion}
                    />
                </div>
                <SalesTable sales={sales} branches={branches} />
            </div>
        </div>
    );
};

export default SellerDashboard;
