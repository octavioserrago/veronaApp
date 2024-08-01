import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MoneyEntriesWithSales = () => {
    const [amount, setAmount] = useState('');
    const [saleId, setSaleId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { branchId, userId } = useAuth();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSaleIdChange = (event) => {
        setSaleId(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = paymentMethod === 'Crédito'
                ? 'http://localhost:8888/creditVerifications'
                : 'http://localhost:8888/moneyEntries';

            const payload = {
                amount,
                sale_id: saleId,
                branch_id: branchId,
                user_id: userId,
                payment_method: paymentMethod
            };

            if (paymentMethod === 'Crédito') {
                payload.amount_charged = amount;
                delete payload.amount;
            }

            await axios.post(url, payload);

            setSuccessMessage('¡Dinero ingresado correctamente!');
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            setAmount('');
            setSaleId('');
            setPaymentMethod('Efectivo');

        } catch (error) {
            console.error('Error al ingresar dinero:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
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

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Ingresar Dinero de Venta</h1>
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
                    <div className="mb-4">
                        <label htmlFor="paymentMethodSelect" className="block text-gray-700 text-sm font-semibold mb-2">Método de Pago</label>
                        <select
                            id="paymentMethodSelect"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            required
                        >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Débito">Débito</option>
                            <option value="Crédito">Crédito</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MoneyEntriesWithSales;
