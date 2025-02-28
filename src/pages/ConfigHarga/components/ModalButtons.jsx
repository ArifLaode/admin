import React from 'react';

const ModalButtons = ({ onClose }) => {
    return (
        <div className="flex justify-end space-x-3">
            <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                Batal
            </button>
            <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Simpan
            </button>
        </div>
    );
};

export default ModalButtons;