import React from 'react';
import { COLUMNS } from '../constants';
import TableCell from './TableCell';

const ConfigHargaTable = ({ data, setData }) => {
    const handleInputChange = (index, field, value) => {
        const newValue = field === 'harga' ? value.replace(/[^0-9]/g, '') : value;
        const newData = [...data];
        newData[index][field] = newValue;
        setData(newData);
    };

    const handleSekitarItemChange = (index, itemIndex, value) => {
        const newData = [...data];
        newData[index].sekitar[itemIndex] = value;
        setData(newData);
    };

    const handleAddSekitar = (index, newSekitar) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index].sekitar = [...newData[index].sekitar, newSekitar];
            return newData;
        });
    };

    const handleCoordinateChangeInTable = (index, lat, lng) => {
        const newData = [...data];
        newData[index].koordinat = [lat, lng];
        setData(newData);
    };

    const handleDelete = (index) => {
        // Implement delete functionality here
        console.log(`Delete item with id: ${id}`);
    };

    return (
        <div className='table-container'>
            {data.length > 0 ? (
                <table className="data-table" style={{ width: '80%' }}>
                    <thead>
                        <tr>
                            {COLUMNS.map((col) => (
                                <th key={col.accessor} className="table-header">
                                    {col.Header}
                                </th>
                            ))}
                            <th className="table-header">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={row.no} className={index % 2 === 0 ? 'even' : 'odd'}>
                                {COLUMNS.map((col) => (
                                    <td key={col.accessor} className='table-cell'>
                                        <TableCell 
                                            col={col}
                                            row={row}
                                            index={index}
                                            handleInputChange={handleInputChange}
                                            handleSekitarItemChange={handleSekitarItemChange}
                                            handleAddSekitar={handleAddSekitar}
                                            handleCoordinateChangeInTable={handleCoordinateChangeInTable}
                                        />
                                    </td>
                                ))}
                                <td className='table-cell'>
                                    <button 
                                        onClick={() => handleDelete(row.id_tujuan)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ConfigHargaTable;