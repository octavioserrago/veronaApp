import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import SideBar from '../components/Side-bar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura de archivos

const IngresarDinero = () => {
    const [amount, setAmount] = useState('');
    const [saleId, setSaleId] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Usa el contexto de autenticación
    const { branchId, userId } = useAuth();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSaleIdChange = (event) => {
        setSaleId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        console.log('Enviando datos:', {
            amount,

            sale_id: saleId,
            branch_id: branchId,
            user_id: userId
        });

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
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Ingresar Dinero de Venta</h1>

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
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mb-6">
                    <div className="mb-4">
                        <label htmlFor="saleId" className="block text-gray-700 text-sm font-semibold mb-2">ID de Venta</label>
                        <input
                            type="text"
                            id="saleId"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={saleId}
                            onChange={handleSaleIdChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 text-sm font-semibold mb-2">Monto</label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Ingresar Dinero
                        </button>
                    </div>
                </form>

                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => navigate(-1)}
                    >
                        <HiArrowLeft className="mr-2" /> Regresar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IngresarDinero;
