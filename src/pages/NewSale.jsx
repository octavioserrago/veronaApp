import React, { useState, useEffect } from 'react';
import SideBar from '../components/Side-bar';
import materialesData from '../materiales.json';

const NewSale = () => {
    const [formData, setFormData] = useState({
        cliente: '',
        material: '',
        color: '',
        detalle: '',
        metodoPago: '',
        descuento: '',
        sena: '',
        montoTotal: ''
    });

    const [colores, setColores] = useState([]);
    const [materiales, setMateriales] = useState(materialesData.materiales);

    useEffect(() => {
        // Actualizar colores cuando cambie el material seleccionado
        const selectedMaterial = materiales.find(mat => mat.nombre === formData.material);
        if (selectedMaterial) {
            setColores(selectedMaterial.colores);
        } else {
            setColores([]);
        }
    }, [formData.material, materiales]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar la información de la nueva venta
        console.log('Nueva venta:', formData);
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
                                name="cliente"
                                value={formData.cliente}
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
                                disabled={!colores.length}
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
                                name="detalle"
                                value={formData.detalle}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                            <input
                                type="text"
                                name="metodoPago"
                                value={formData.metodoPago}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descuento</label>
                            <input
                                type="number"
                                name="descuento"
                                value={formData.descuento}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seña</label>
                            <input
                                type="number"
                                name="sena"
                                value={formData.sena}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Monto Total</label>
                            <input
                                type="number"
                                name="montoTotal"
                                value={formData.montoTotal}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
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
