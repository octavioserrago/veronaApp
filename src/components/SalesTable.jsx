import React from 'react';

const SalesTable = ({ sales, branches }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const branchMap = branches.reduce((acc, branch) => {
        acc[branch.branch_id] = branch.branch_name;
        return acc;
    }, {});

    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID de Venta</th>
                    <th className="py-2 px-4 border-b">Fecha</th>
                    <th className="py-2 px-4 border-b">Cliente</th>
                    <th className="py-2 px-4 border-b">Material</th>
                    <th className="py-2 px-4 border-b">Color</th>
                    <th className="py-2 px-4 border-b">Detalle</th>
                    <th className="py-2 px-4 border-b">Metodo de Pago</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Sucursal</th>
                    <th className="py-2 px-4 border-b">Modificacion</th>
                </tr>
            </thead>
            <tbody>
                {sales.map((sale) => (
                    <tr className="hover:bg-gray-100" key={sale.sale_id}>
                        <td className="px-4 py-2 border-b">{sale.sale_id}</td>
                        <td className="px-4 py-2 border-b">{formatDate(sale.created_at)}</td>
                        <td className="px-4 py-2 border-b">{sale.customer}</td>
                        <td className="px-4 py-2 border-b">{sale.material}</td>
                        <td className="px-4 py-2 border-b">{sale.color}</td>
                        <td className="px-4 py-2 border-b">{sale.detail}</td>
                        <td className="px-4 py-2 border-b">{sale.payment_method}</td>
                        <td className="px-4 py-2 border-b">{sale.total_amount}</td>
                        <td className="px-4 py-2 border-b">{branchMap[sale.branch_id] || 'Desconocida'}</td>
                        <td className="px-4 py-2 border-b">{formatDate(sale.modified_at)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SalesTable;
