import React, { useState, useEffect } from 'react';
import SideBar from '../components/Side-bar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const NewSale = () => {
    const { branchId } = useAuth();
    const [formData, setFormData] = useState({
        customer: '',
        material: '',
        color: '',
        detail: '',
        payment_method: '',
        total_amount: '',
        branch_id: branchId || ''
    });

    const [colores, setColores] = useState([]);
    const [branches, setBranches] = useState([]);

    const materiales = [
        {
            nombre: "Granito",
            colores: [
                "Blanco Dallas",
                "Negro Absoluto",
                "Verde Ubatuba",
                "Rojo Balmoral"
            ]
        },
        {
            nombre: "Mármol",
            colores: [
                "Carrara",
                "Crema Marfil",
                "Emperador Dark",
                "Calacatta"
            ]
        },
        {
            nombre: "Silestone",
            colores: [
                "Blanco Zeus",
                "Cemento Spa",
                "Coral Clay",
                "Marengo"
            ]
        },
        {
            nombre: "Purastone",
            colores: [
                "Blanco Puro",
                "Arena",
                "Gris Acero",
                "Negro Eclipse"
            ]
        }
    ];

    useEffect(() => {
        const selectedMaterial = materiales.find(mat => mat.nombre === formData.material);
        if (selectedMaterial) {
            setColores(selectedMaterial.colores);
            if (!selectedMaterial.colores.includes(formData.color)) {
                setFormData(prevFormData => ({ ...prevFormData, color: selectedMaterial.colores[0] || '' }));
            }
        } else {
            setColores([]);
            setFormData(prevFormData => ({ ...prevFormData, color: '' }));
        }
    }, [formData.material, materiales]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axios.get('http://localhost:8888/branches');
                setBranches(response.data.results);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchBranches();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, [name]: value };

            if (name === 'material') {
                const selectedMaterial = materiales.find(mat => mat.nombre === value);
                if (selectedMaterial) {
                    updatedFormData.color = selectedMaterial.colores[0] || '';
                } else {
                    updatedFormData.color = '';
                }
            }

            return updatedFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            branch_id: formData.branch_id || branchId || ''
        };

        console.log('Data to submit:', dataToSubmit);

        try {
            const response = await axios.post('http://localhost:8888/sales', dataToSubmit);
            if (response.data.success) {
                alert('Venta creada correctamente');
                setFormData({
                    customer: '',
                    material: '',
                    color: '',
                    detail: '',
                    payment_method: '',
                    total_amount: '',
                    branch_id: branchId || ''
                });
            } else {
                alert('Error al crear la venta');
            }
        } catch (error) {
            console.error('Error creando la venta:', error);
            alert('Error al intentar crear la venta');
        }
    };

    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 flex justify-center items-center p-4 ml-64">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-4">Crear Nueva Venta</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cliente</label>
                            <input
                                type="text"
                                name="customer"
                                value={formData.customer}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Material</label>
                            <select
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Selecciona un material</option>
                                {materiales.map(material => (
                                    <option key={material.nombre} value={material.nombre}>
                                        {material.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color</label>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Selecciona un color</option>
                                {colores.map(color => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Detalle</label>
                            <input
                                type="text"
                                name="detail"
                                value={formData.detail}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                            <select
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Selecciona un método</option>
                                <option value="cash">Efectivo</option>
                                <option value="debit">Tarjeta de débito</option>
                                <option value="transfer">Transferencia</option>
                                <option value="credit">Tarjeta de crédito</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Monto Total</label>
                            <input
                                type="number"
                                name="total_amount"
                                value={formData.total_amount}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sucursal</label>
                            <select
                                name="branch_id"
                                value={formData.branch_id}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Selecciona una sucursal</option>
                                {branches.map(branch => (
                                    <option key={branch.branch_id} value={branch.branch_id}>
                                        {branch.branch_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md shadow-md"
                            >
                                Crear Venta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewSale;
