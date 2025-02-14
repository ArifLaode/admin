import React, { useState } from 'react';
import SectionPage from '../component/SectionPage';

    const ConfigHarga = () => {
        const [data, setData] = useState([
            { no: 1, tujuan: 'Jakarta', jarak: '100 km', harga: '100000' },
            { no: 2, tujuan: 'Bandung', jarak: '150 km', harga: '150000' },
        ]);

        const handleInputChange = (index, field, value) => {
            const newData = [...data];
            newData[index][field] = value;
            setData(newData);
        };

        const column = [
            { Header: 'No', accessor: 'no' },
            { Header: 'Tujuan', accessor: 'tujuan' },
            { Header: 'Jarak', accessor: 'jarak' },
            { Header: 'Harga', accessor: 'harga' },
        ]

        return (
            <div>
                <SectionPage title="Konfigurasi Harga" width={100} height={700}>
                    <div className='table-container'>
                    <table className="data-table" style={{ width: '80%' }}>
                        <thead>
                            <tr>
                                {column.map((col) => (
                                    <th key={col.accessor} className="table-header">
                                        {col.Header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={row.no}>
                                    {column.map((col) => (
                                        <td key={col.accessor} className='table-cell'>
                                            <input
                                                type="text"
                                                value={row[col.accessor]}
                                                onChange={(e) => handleInputChange(index, col.accessor, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </SectionPage>
            </div>
        );
    };

    export default ConfigHarga;