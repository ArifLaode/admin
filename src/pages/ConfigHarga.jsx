import React, { useState } from 'react';
import SectionPage from '../component/SectionPage';
import numeral from 'numeral';
import MapInput from '../component/MapPicker';

const ConfigHarga = () => {
    const [data, setData] = useState([
        {
            no: 1,
            tujuan: 'Jakarta',
            sekitar: ['Jakarta Selatan', 'Jakarta Pusat'],
            jarak: '100',
            harga: '100000',
            koordinat: [-3.9934, 122.5106]
        },
        {
            no: 2,
            tujuan: 'Bandung',
            sekitar: ['Kota Bandung', 'Bandung Barat'],
            jarak: '150',
            harga: '150000',
            koordinat: [-4.0105, 122.4828]
        },
    ]);

    const handleInputChange = (index, field, value) => {
        const newValue = value.replace(/[^0-9]/g, '');
        const newData = [...data];
        newData[index][field] = newValue;
        setData(newData);
    };

    const handleSekitarChange = (index, value) => {
        const newData = [...data];
        newData[index].sekitar = value.split(',');
        setData(newData);
    };

    const handleCoordinateChange = (index, lat, lng) => {
        const newData = [...data];
        newData[index].koordinat = [lat, lng];
        setData(newData);
    };


    const column = [
        { Header: 'No', accessor: 'no' },
        { Header: 'Tujuan', accessor: 'tujuan' },
        { Header: 'Sekitar Tujuan', accessor: 'sekitar' },
        { Header: 'Jarak (KM)', accessor: 'jarak' },
        { Header: 'Harga (Rp)', accessor: 'harga' },
        { Header: 'Koordinat', accessor: 'koordinat' },
    ];

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
                                <tr key={row.no} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    {column.map((col) => (
                                        <td key={col.accessor} className='table-cell'>
                                            {col.accessor === 'no' ? (
                                                row[col.accessor]
                                            ) : col.accessor === 'sekitar' ? (
                                                <input
                                                    type='text'
                                                    value={row[col.accessor].join(', ')}
                                                    onChange={(e) => handleSekitarChange(index, e.target.value)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            ) : col.accessor === 'harga' ? (
                                                <input
                                                    type='text'
                                                    value={numeral(row[col.accessor]).format('0,0')}
                                                    onChange={(e) => handleInputChange(index, col.accessor, e.target.value)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            ) : col.accessor === 'koordinat' ? (
                                                <MapInput
                                                    initialCoordinates={row.koordinat}
                                                    onCoordinateChange={(lat, lng) => handleCoordinateChange(index, lat, lng)}
                                                />
                                            ) : (
                                                <input
                                                    type='text'
                                                    value={row[col.accessor]}
                                                    onChange={(e) => handleInputChange(index, col.accessor, e.target.value)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            )}
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