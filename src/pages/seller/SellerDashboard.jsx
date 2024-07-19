import React, { useEffect, useState } from 'react';
import SideBar from '../../components/Side-bar';
import CardUSD from '../../components/Card-USD';

const SellerDashboard = () => {
    const [dolarOficial, setDolarOficial] = useState({ compra: '', venta: '', fechaActualizacion: '' });
    const [dolarBlue, setDolarBlue] = useState({ compra: '', venta: '', fechaActualizacion: '' });

    useEffect(() => {
        // Fetch Dolar Oficial
        fetch("https://dolarapi.com/v1/dolares/oficial")
            .then(response => response.json())
            .then(data => {
                setDolarOficial({
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion
                });
            })
            .catch(error => console.error('Error fetching Dolar Oficial:', error));

        // Fetch Dolar Blue
        fetch("https://dolarapi.com/v1/dolares/blue")
            .then(response => response.json())
            .then(data => {
                setDolarBlue({
                    compra: data.compra,
                    venta: data.venta,
                    fechaActualizacion: data.fechaActualizacion
                });
            })
            .catch(error => console.error('Error fetching Dolar Blue:', error));
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-4 ml-64">
                <h1 className="text-2xl font-bold mb-4">Bienvenido/a vendedor!</h1>
                <CardUSD
                    title="Dólar Oficial"
                    compra={dolarOficial.compra}
                    venta={dolarOficial.venta}
                    fechaActualizacion={dolarOficial.fechaActualizacion}
                />
                <CardUSD
                    title="Dólar Blue"
                    compra={dolarBlue.compra}
                    venta={dolarBlue.venta}
                    fechaActualizacion={dolarBlue.fechaActualizacion}
                />
            </div>
        </div>
    );
};

export default SellerDashboard;
