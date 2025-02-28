// pages/ConfigHarga/components/FormInputs.jsx
import React from 'react';
import numeral from 'numeral';

const FormInputs = ({ formData, handleChange, setShowSekitarModal }) => {
    return (
        <>
            {/* Input Tujuan */}
            <div className="space-y-2">
                <label htmlFor="tujuan" className="block text-sm font-medium text-gray-700">
                    Tujuan
                </label>
                <input 
                    type="text" 
                    id="tujuan"
                    name="tujuan" 
                    value={formData.tujuan} 
                    onChange={handleChange} 
                    required 
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Masukkan tujuan" 
                />
            </div>

            {/* Input Sekitar */}
            <div className="space-y-2">
                <label htmlFor="sekitar" className="block text-sm font-medium text-gray-700">
                    Sekitar Tujuan
                </label>
                <input
                    type="text"
                    id="sekitar"
                    name="sekitar"
                    value={formData.sekitar.join(', ')}
                    onClick={() => setShowSekitarModal(true)}
                    readOnly
                    className="border rounded px-3 py-2 w-full cursor-pointer hover:bg-gray-50"
                    placeholder="Klik untuk menambah sekitar tujuan"
                />
            </div>

            {/* Input Jarak */}
            <div className="space-y-2">
                <label htmlFor="jarak" className="block text-sm font-medium text-gray-700">
                    Jarak (KM)
                </label>
                <input 
                    type="number" 
                    id="jarak"
                    name="jarak" 
                    value={formData.jarak} 
                    onChange={handleChange} 
                    required 
                    min="0"
                    step="0.1"
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Masukkan jarak dalam kilometer" 
                />
            </div>

            {/* Input Harga */}
            <div className="space-y-2">
                <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
                    Harga (Rp)
                </label>
                <input 
                    type="text" 
                    id="harga"
                    name="harga" 
                    value={formData.harga ? numeral(formData.harga).format('0,0') : ''} 
                    onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        handleChange({
                            target: {
                                name: 'harga',
                                value: numericValue
                            }
                        });
                    }}
                    required 
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Masukkan harga" 
                />
            </div>

            {/* Input Koordinat Label */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Koordinat
                </label>
                <p className="text-sm text-gray-500">
                    Pilih lokasi pada peta di bawah
                </p>
            </div>
        </>
    );
};

export default FormInputs;