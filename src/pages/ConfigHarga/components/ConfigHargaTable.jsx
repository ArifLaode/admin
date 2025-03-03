import React from 'react';
import { COLUMNS } from '../constants';
import TableCell from './TableCell';

const ConfigHargaTable = ({ data, onUpdateData }) => {
    const handleInputChange = (index, field, value) => {
        const newValue = field === 'harga' ? value.replace(/[^0-9]/g, '') : value;
        // Only update the specific field that changed
        onUpdateData(index, { [field]: newValue });
    };

    const handleSekitarItemChange = (index, itemIndex, value) => {
        const updatedSekitar = [...data[index].sekitar];
        updatedSekitar[itemIndex] = value;
        onUpdateData(index, { sekitar: updatedSekitar });
    };

    const handleAddSekitar = (index, newSekitar = '') => {
        const updatedSekitar = [...data[index].sekitar, newSekitar];
        onUpdateData(index, { sekitar: updatedSekitar });
    };

    const handleCoordinateChangeInTable = (index, lat, lng) => {
        onUpdateData(index, { koordinat: [lat, lng] });
    };

    const handleDelete = (id) => {
        // This should call a delete function from your hook
        // For now, just log the ID
        console.log(`Delete item with id: ${id}`);
        // If you had a deleteData function passed as prop:
        // onDeleteData(id);
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
                            <tr key={row.no || index} className={index % 2 === 0 ? 'even' : 'odd'}>
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