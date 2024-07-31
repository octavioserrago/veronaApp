import React from 'react';
import MoneyEntriesSearcherWithSales from '../components/MoneyEntriesSearcherWithSales';
import MoneyEntriesWithSales from '../components/MoneyEntriesWithSales';
import SideBar from '../components/Side-bar';

const MoneyEntries = () => {
    return (
        <div className="contenedor">
            <SideBar />
            <div className="p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Gestión de Entradas de Dinero</h1>

                {/* Componente para buscar ventas */}
                <MoneyEntriesSearcherWithSales />

                {/* Espacio entre componentes */}
                <div className="my-8 border-t border-gray-200"></div>

                {/* Componente para ingresar dinero */}
                <MoneyEntriesWithSales />
            </div>
        </div>
    );
};

export default MoneyEntries;
