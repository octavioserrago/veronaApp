// MoneyEntriesWithSales.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MoneyEntriesWithSales = () => {
    const [amount, setAmount] = useState('');
    const [saleId, setSaleId] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { branchId, userId } = useAuth();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSaleIdChange = (event) => {
        setSaleId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8888/moneyEntries', {
                amount,
                sale_id: saleId,
                branch_id: branchId,
                user_id: userId
            });

            setSuccessMessage('¡Dinero ingresado correctamente!');
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            setAmount('');
            setSaleId('');

        } catch (error) {
            console.error('Error al ingresar dinero:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            {/* Mensaje de éxito */}
            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
                    <span>{successMessage}</span>
                    <button
                        className="ml-4 text-xl"
                        onClick={() => setShowSuccess(false)}
                    >
                        &times;
                    </button>
                </div>
            )}

            <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Ingresar Dinero de Venta</h1>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="saleIdInput" className="block text-gray-700 text-sm font-semibold mb-2">ID de Venta para Ingreso</label>
                    <input
                        type="text"
                        id="saleIdInput"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={saleId}
                        onChange={handleSaleIdChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amountInput" className="block text-gray-700 text-sm font-semibold mb-2">Monto</label>
                    <input
                        type="number"
                        id="amountInput"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Confirmar
                </button>
            </form>
        </div>
    );
};

export default MoneyEntriesWithSales;
