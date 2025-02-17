import React, { useState } from 'react';
import SectionPage from '../component/SectionPage';
import numeral from 'numeral';
import { FaPlus } from 'react-icons/fa';
import MapInput from '../component/MapPicker';

const ConfigHarga = () => {
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        tujuan: "",
        sekitar: "",
        jarak: "",
        harga: "",
    });
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

    const [selectedCoordinate, setSelectedCoordinate] = useState(null); // State to store selected coordinate

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleCoordinateChange = (lat, lng) => {
        setSelectedCoordinate([lat, lng]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add the new data to the table
        const newDataItem = {
            no: data.length + 1, // Or generate a unique ID
            tujuan: formData.tujuan,
            sekitar: formData.sekitar.split(','),
            jarak: formData.jarak,
            harga: formData.harga,
            koordinat: selectedCoordinate, // Gunakan selectedCoordinate
        };
        setData([...data, newDataItem]);

        // Reset form and modal
        setFormData({
            tujuan: "",
            sekitar: "",
            jarak: "",
            harga: "",
        });
        setSelectedCoordinate(null);
        setModalIsOpen(false);
    };

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

    const handleCoordinateChangeInTable = (index, lat, lng) => {
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
            <SectionPage title="Konfigurasi Harga" width={100} height={700} item={ 
                <button onClick={() => setModalIsOpen(true)} className='secondary-color py-2 px-2 rounded-xl cursor-pointer' 
                title='Tambah Data'><FaPlus size={24} 
                />
                </button>
                    }
                >
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
                                <tr key={row.no} className={index % 2 === 0? 'even': 'odd'}>
                                    {column.map((col) => (
                                        <td key={col.accessor} className='table-cell'>
                                            {col.accessor === 'no'? (
                                                row[col.accessor]
                                            ): col.accessor === 'sekitar'? (
                                                <input
                                                    type='text'
                                                    value={row[col.accessor].join(', ')}
                                                    onChange={(e) => handleSekitarChange(index, e.target.value)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            ): col.accessor === 'harga'? (
                                                <input
                                                    type='text'
                                                    value={numeral(row[col.accessor]).format('0,0')}
                                                    onChange={(e) => handleInputChange(index, col.accessor, e.target.value)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            ): col.accessor === 'koordinat'? (
                                                <MapInput
                                                    initialCoordinates={row.koordinat}
                                                    onCoordinateChange={(lat, lng) => handleCoordinateChangeInTable(index, lat, lng)}
                                                />
                                            ): (
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
                {isModalOpen && (
                <div className="fixed top-0 left-20 w-full h-full flex justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> 
                    <div className="bg-white rounded-lg p-6 w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Tambah Konfigurasi Harga</h2>
                            <button onClick={() => setModalIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input type="text" name="tujuan" value={formData.tujuan} onChange={handleChange} required className="border rounded px-2 py-1 w-full" placeholder="Tujuan" />
                            </div>
                            <div>
                                <input type="text" name="sekitar" value={formData.sekitar} onChange={handleChange} required className="border rounded px-2 py-1 w-full" placeholder="Sekitar Tujuan" />
                            </div>
                            <div>
                                <input type="number" name="jarak" value={formData.jarak} onChange={handleChange} required className="border rounded px-2 py-1 w-full" placeholder="Jarak (KM)" />
                            </div>
                            <div>
                                <input type="number" name="harga" value={formData.harga} onChange={handleChange} required className="border rounded px-2 py-1 w-full" placeholder="Harga (Rp)" />
                            </div>
                            <div>
                                <MapInput
                                    initialCoordinates={selectedCoordinate || [4.045266, 122.477163]}
                                    onCoordinateChange={handleCoordinateChange}
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setModalIsOpen(false)} className="border rounded px-4 py-2 hover:bg-gray-100">
                                    Batal
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </SectionPage>
        </div>
    );
};

export default ConfigHarga;