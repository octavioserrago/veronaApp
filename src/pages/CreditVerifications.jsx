import React from 'react';
import SideBar from '../components/Side-bar';
import TableCreditVerifications from '../components/TableCreditVerification';

const CreditVerifications = () => {
    return (
        <div className="contenedor">
            <SideBar />
            <TableCreditVerifications />
        </div>
    );
};

export default CreditVerifications;
