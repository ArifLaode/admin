// pages/ConfigHarga/components/AddConfigModal.jsx
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import MapPicker from '../../../component/MapPicker';
import SekitarModal from './SekitarModal';
import FormInputs from './FormInputs';
import ModalButtons from './ModalButtons';

const AddConfigModal = ({ onClose, onSubmit, isSubmitting }) => {
    const [showSekitarModal, setShowSekitarModal] = useState(false);
    const [formData, setFormData] = useState({
        tujuan: "",
        sekitar: [],
        jarak: "",
        harga: "",
        koordinat: [-4.045266, 122.477163]
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("FormData:", formData);
        try {
            const result = await onSubmit(formData);
            if (!result.success) {
                setError(result.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="fixed top-0 left-20 w-full h-full flex justify-center items-center bg-opacity-50" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="bg-white rounded-lg p-6 w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Tambah Konfigurasi Harga</h2>
                    <button onClick={onClose}>
                        <RxCross1 size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInputs 
                        formData={formData}
                        handleChange={handleChange}
                        setShowSekitarModal={setShowSekitarModal}
                    />
                    
                    <MapPicker
                        initialCoordinates={formData.koordinat}
                        onCoordinateChange={(lat, lng) => 
                            setFormData({ ...formData, koordinat: [lat, lng] })}
                    />

                    <ModalButtons 
                        onClose={onClose} 
                        isSubmitting={isSubmitting}
                    />
                </form>

                {showSekitarModal && (
                    <SekitarModal 
                        formData={formData}
                        setFormData={setFormData}
                        onClose={() => setShowSekitarModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default AddConfigModal;