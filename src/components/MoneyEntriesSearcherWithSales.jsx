import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MoneyEntriesSearcherWithSales = () => {
    const [saleId, setSaleId] = useState('');
    const [sales, setSales] = useState([]);
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState(''); // Estado para el mensaje de error
    const navigate = useNavigate();
    const { branchId } = useAuth();

    const fetchSales = async (searchQuery = '') => {
        try {
            const response = await axios.get('http://localhost:8888/sales', {
                params: { search: searchQuery }
            });
            if (response.data.results.length === 0) {
                setError('No se encontraron ventas con el ID proporcionado.');
            } else {
                setSales(response.data.results);
                setError(''); // Limpiar el mensaje de error si se encuentran ventas
            }
        } catch (error) {
            console.error('Error fetching sales:', error);
            setError('Error al buscar ventas.');
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await axios.get('http://localhost:8888/branches');
            setBranches(response.data.results);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };

    const fetchMoneyEntries = async (saleId) => {
        try {
            const response = await axios.get(`http://localhost:8888/moneyEntries/filterBySaleId/${saleId}`);
            // Asegúrate de que response.data.results sea un array
            const totalMoney = response.data.results.reduce((total, entry) => total + entry.amount, 0);
            return totalMoney;
        } catch (error) {
            console.error('Error fetching money entries:', error);
            return 0;
        }
    };

    const handleSearch = async () => {
        await fetchSales(saleId);
        if (sales.length > 0) {
            const totalMoney = await fetchMoneyEntries(saleId);
            setSales((prevSales) =>
                prevSales.map((sale) => ({
                    ...sale,
                    moneyMissing: sale.total_amount - totalMoney
                }))
            );
        }
    };

    useEffect(() => {
        fetchBranches(); // Carga las sucursales cuando el componente se monta
    }, []);

    // Crea un mapa para una búsqueda rápida de nombres de sucursales por branch_id
    const branchMap = branches.reduce((map, branch) => {
        map[branch.branch_id] = branch.branch_name;
        return map;
    }, {});

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Buscar ID de venta y entradas del cliente</h1>
                    <div className="flex flex-col items-center mb-4">
                        <label htmlFor="searchSaleId" className="block text-gray-700 text-sm font-semibold mb-2">ID de Venta</label>
                        <div className="flex w-full max-w-xs">
                            <input
                                type="text"
                                id="searchSaleId"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={saleId}
                                onChange={(e) => setSaleId(e.target.value)}
                            />
                            <button
                                type="button"
                                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleSearch}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Mostrar mensaje de error si existe */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Mostrar detalles de ventas si hay resultados */}
                    {sales.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Detalles de Ventas</h2>
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de Venta</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método de Pago</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sucursal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dinero Faltante</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sales.map((sale) => (
                                        <tr key={sale.sale_id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.sale_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.customer}</td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">{sale.detail}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.payment_method}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.total_amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branchMap[sale.branch_id]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.moneyMissing}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoneyEntriesSearcherWithSales;
