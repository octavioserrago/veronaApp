import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SideBar from '../components/Side-bar';
import MoneyEntriesSearcherWithSales from '../components/MoneyEntriesSearcherWithSales';
import logo from '../assets/verona-escrito.png';

const ReceiptPage = () => {
    const [saleId, setSaleId] = useState('');
    const [receiptData, setReceiptData] = useState(null);

    const fetchReceiptData = async () => {
        if (!saleId) {
            console.log('No se ha proporcionado un saleId.');
            return;
        }

        try {
            const moneyEntriesResponse = await axios.get(`http://localhost:8888/moneyEntries/filterBySaleId/${saleId}`);
            console.log('Money Entries Response:', moneyEntriesResponse.data);
            const moneyEntries = Array.isArray(moneyEntriesResponse.data.results) ? moneyEntriesResponse.data.results : [];

            const saleResponse = await axios.get(`http://localhost:8888/sales/${saleId}`);
            console.log('Sale Response:', saleResponse.data);
            const sale = saleResponse.data.result;

            const formatDate = (timestamp) => {
                const date = new Date(timestamp);
                if (isNaN(date.getTime())) {
                    console.error('Fecha inválida:', timestamp);
                    return 'Fecha no disponible';
                }
                return date.toLocaleDateString();
            };

            const formattedData = {
                fecha: formatDate(sale.created_at),
                cliente: sale.customer,
                detalles: sale.detail,
                material: sale.material,
                color: sale.color,
                metodo_pago: sale.payment_method,
                monto_total: sale.total_amount,
                entradas_dinero: moneyEntries.map(entry => ({
                    id_entrada: entry.moneyEntry_id,
                    sucursal: entry.branch_id,
                    fecha: formatDate(entry.date),
                    monto: entry.amount,
                    metodo_pago: entry.payment_method,
                    usuario: entry.user_id,
                    id_venta: entry.sale_id
                }))
            };

            console.log('Formatted Data:', formattedData);
            setReceiptData(formattedData);
        } catch (error) {
            console.error('Error al obtener los datos del recibo:', error.response ? error.response.data : error.message);
        }
    };

    const generatePDF = () => {
        if (receiptData) {
            const doc = new jsPDF();

            // Ajustar el tamaño del logo
            const logoImg = new Image();
            logoImg.src = logo;
            doc.addImage(logoImg, 'PNG', 10, 10, 60, 30);  // Tamaño ajustado

            // Estilo de encabezado
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text('Recibo de Venta', 10, 50);
            doc.setFontSize(10);

            // Añadir la fecha actual
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 55);

            // Estilo de los datos del recibo
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Factura para: ${receiptData.cliente}`, 10, 70);
            doc.text(`Fecha de Venta: ${receiptData.fecha}`, 10, 80);
            doc.text(`Detalles: ${receiptData.detalles}`, 10, 90);
            doc.text(`Material: ${receiptData.material}`, 10, 100);
            doc.text(`Color: ${receiptData.color}`, 10, 110);
            doc.text(`Método de Pago: ${receiptData.metodo_pago}`, 10, 120);
            doc.text(`Monto Total: ${receiptData.monto_total}`, 10, 130);

            // Añadir una línea separadora
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 135, 200, 135);

            // Estilo de la tabla de entradas de dinero
            doc.autoTable({
                head: [['ID Entrada', 'Sucursal', 'Fecha', 'Monto', 'Método de Pago', 'Usuario', 'ID Venta']],
                body: receiptData.entradas_dinero.map(entry => [
                    entry.id_entrada,
                    entry.sucursal,
                    entry.fecha,
                    entry.monto,
                    entry.metodo_pago,
                    entry.usuario,
                    entry.id_venta
                ]),
                startY: 140,
                margin: { top: 140 },
                styles: {
                    cellPadding: 4,
                    fontSize: 10,
                    overflow: 'linebreak',
                    halign: 'center',
                    valign: 'middle',
                },
                headStyles: {
                    fillColor: [0, 102, 204],
                    textColor: [255, 255, 255],
                    fontSize: 12,
                    fontStyle: 'bold',
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                },
            });

            console.log('PDF generado.');
            return doc.output('blob');
        }
        console.log('No hay datos de recibo para generar el PDF.');
        return null;
    };

    const handleDownloadPDF = () => {
        const pdfBlob = generatePDF();
        if (pdfBlob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = 'recibo.pdf';
            link.click();
            URL.revokeObjectURL(link.href);
            console.log('PDF descargado.');
        } else {
            console.log('No se pudo generar el PDF.');
        }
    };

    const handleSendReceipt = () => {
        fetchReceiptData();
    };

    return (
        <div className="flex flex-col min-h-screen p-4">
            <SideBar />
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Descargar Factura</h1>
                <div className="mb-6">
                    <label htmlFor="saleId" className="block text-gray-800 text-lg font-semibold mb-3">ID de Venta</label>
                    <input
                        type="text"
                        id="saleId"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese el ID de venta"
                        value={saleId}
                        onChange={(e) => setSaleId(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={handleSendReceipt}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Generar Factura
                    </button>
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptPage;
