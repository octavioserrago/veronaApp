import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TableCreditVerifications = () => {
    const [creditVerifications, setCreditVerifications] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { branchId } = useAuth();

    useEffect(() => {
        fetchCreditVerifications();
    }, [branchId]);

    const fetchCreditVerifications = async () => {
        if (!branchId) {
            console.error('branchId es necesario para realizar la solicitud');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8888/creditVerifications/findByBranchId/${branchId}`);
            setCreditVerifications(response.data.results);
        } catch (error) {
            console.error('Error al obtener las verificaciones de crédito:', error.response ? error.response.data : error.message);
        }
    };


    const deleteRecord = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta verificación?')) {
            try {
                await axios.delete(`http://localhost:8888/creditVerifications/${id}`);
                setSuccessMessage('¡Registro eliminado correctamente!');
                setShowSuccess(true);
                fetchCreditVerifications();
            } catch (error) {
                console.error('Error al eliminar el registro:', error.response ? error.response.data : error.message);
            }
        }
    };

    const updateRealAmount = async (id) => {
        const newRealAmount = prompt('Ingrese el nuevo monto real:');
        if (newRealAmount !== null && !isNaN(newRealAmount)) {
            try {
                await axios.put(`http://localhost:8888/creditVerifications/updateRealAmount/${id}`, {
                    creditVerification_id: id,
                    real_amount: parseFloat(newRealAmount)
                });
                setSuccessMessage('¡Monto real actualizado correctamente!');
                setShowSuccess(true);
                fetchCreditVerifications();
            } catch (error) {
                console.error('Error al actualizar el monto real:', error.response ? error.response.data : error.message);
            }
        } else {
            alert('Por favor, ingrese un monto válido.');
        }
    };


    return (
        <div className="container mx-auto px-4 py-6">
            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <span>{successMessage}</span>
                    <button
                        className="text-lg font-semibold"
                        onClick={() => setShowSuccess(false)}
                    >
                        &times;
                    </button>
                </div>
            )}

            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Verificaciones de Crédito y Débito</h1>

            <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Sale ID</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Monto Cobrado</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Monto Real (En Banco)</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Creado</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {creditVerifications.map((cv) => (
                            <tr key={cv.creditVerification_id}>
                                <td className="py-3 px-4 text-sm text-gray-800">{cv.creditVerification_id}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{cv.sale_id}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{cv.amount_charged}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{cv.real_amount}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{new Date(cv.created_at).toLocaleString()}</td>
                                <td className="py-3 px-4 text-sm text-gray-800 flex flex-col space-y-2">
                                    <button
                                        onClick={() => deleteRecord(cv.creditVerification_id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => updateRealAmount(cv.creditVerification_id)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Actualizar Monto
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCreditVerifications;
