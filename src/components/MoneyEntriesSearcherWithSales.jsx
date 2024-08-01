import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MoneyEntriesSearcherWithSales = () => {
    const [saleId, setSaleId] = useState('');
    const [sales, setSales] = useState([]);
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState('');
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
                setError('');
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
        fetchBranches();
    }, []);

    const branchMap = branches.reduce((map, branch) => {
        map[branch.branch_id] = branch.branch_name;
        return map;
    }, {});

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Buscar ID de Venta y Entradas del Cliente</h1>
                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="searchSaleId" className="block text-gray-800 text-lg font-semibold mb-3">ID de Venta</label>
                        <div className="flex w-full max-w-md">
                            <input
                                type="text"
                                id="searchSaleId"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ingrese el ID de venta"
                                value={saleId}
                                onChange={(e) => setSaleId(e.target.value)}
                            />
                            <button
                                type="button"
                                className="ml-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleSearch}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Mostrar mensaje de error si existe */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                            <strong className="font-semibold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Mostrar detalles de ventas si hay resultados */}
                    {sales.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de Ventas</h2>
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm font-medium">ID de Venta</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Cliente</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Detalles</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Método de Pago</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Monto Total</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Sucursal</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium">Dinero Faltante</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sales.map((sale) => (
                                        <tr key={sale.sale_id}>
                                            <td className="py-3 px-4 text-sm text-gray-800">{sale.sale_id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{sale.customer}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800 break-words">{sale.detail}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{sale.payment_method}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{sale.total_amount}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{branchMap[sale.branch_id]}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{sale.moneyMissing}</td>
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
