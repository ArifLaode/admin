import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';

const SekitarModal = ({ formData, setFormData, onClose }) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            setFormData({
                ...formData,
                sekitar: [...formData.sekitar, newItem.trim()]
            });
            setNewItem('');
        }
    };

    const handleRemoveItem = (index) => {
        const updatedSekitar = formData.sekitar.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            sekitar: updatedSekitar
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Tambah Item Sekitar</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <RxCross1 size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Daftar item sekitar */}
                    <ul className="space-y-2">
                        {formData.sekitar.map((item, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span>{item}</span>
                                <button 
                                    onClick={() => handleRemoveItem(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <RxCross1 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Input dan tombol tambah */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="flex-1 border rounded px-3 py-2"
                            placeholder="Masukkan Item Sekitar"
                        />
                        <button 
                            onClick={handleAddItem}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Tombol tutup */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SekitarModal;