// pages/ConfigHarga/components/TableCell.jsx
import React from 'react';
import numeral from 'numeral';
import { FaPlus } from 'react-icons/fa';
import MapInput from '../../../component/MapPicker';

const TableCell = ({
    col,
    row,
    index,
    handleInputChange,
    handleSekitarItemChange,
    handleAddSekitar,
    handleCoordinateChangeInTable,
    
}) => {
    const renderSekitarCell = () => (
        <div className="space-y-2">
            {row.sekitar && row.sekitar.map((item, itemIndex) => (
                <input
                    key={itemIndex}
                    type="text"
                    value={item}
                    onChange={(e) => handleSekitarItemChange(index, itemIndex, e.target.value)}
                    className="w-full px-2 py-1 border rounded text-center"
                />
            ))}
            <button 
                onClick={() => handleAddSekitar(index)} 
                className="secondary-color py-1 px-1 rounded-xl cursor-pointer w-full flex items-center justify-center gap-2 hover:opacity-80"
                title="Tambah Sekitar"
            >
                <FaPlus size={16} />
                <span>Tambah</span>
            </button>
        </div>
    );

    const renderHargaCell = () => (
        <input
            type="text"
            value={numeral(row.harga).format('0,0')}
            onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                handleInputChange(index, 'harga', numericValue);
            }}
            className="w-full px-2 py-1 border rounded text-center"
        />
    );

    const renderKoordinatCell = () => (
        <MapInput
            initialCoordinates={row.koordinat}
            onCoordinateChange={(lat, lng) => handleCoordinateChangeInTable(index, lat, lng)}
        />
    );

    const renderDefaultCell = () => (
        <input
            type="text"
            value={row[col.accessor]}
            onChange={(e) => handleInputChange(index, col.accessor, e.target.value)}
            className="w-full px-2 py-1 border rounded text-center"
        />
    );

    // Render cell berdasarkan tipe kolom
    switch (col.accessor) {
        case 'no':
            return <span className="block text-center">{index + 1}</span>;
        case 'sekitar':
            return renderSekitarCell();
        case 'harga':
            return renderHargaCell();
        case 'koordinat':
            return renderKoordinatCell();
        default:
            return renderDefaultCell();
    }
};

export default TableCell;