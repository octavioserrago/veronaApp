import React from 'react';

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
};

const CardUSD = ({ title, compra, venta, fechaActualizacion }) => {
    const { formattedDate, formattedTime } = formatDateTime(fechaActualizacion);

    return (
        <div className="bg-gray-100 shadow-md rounded-lg p-2 mb-2 w-40">
            <h2 className="text-lg font-semibold mb-1 text-green-600">{title}</h2>
            <p className="text-gray-700 text-sm">Compra: ${compra}</p>
            <p className="text-gray-700 text-sm">Venta: ${venta}</p>
            <p className="text-gray-500 text-xs">Actualización: {formattedDate} {formattedTime}</p>
        </div>
    );
};

export default CardUSD;
