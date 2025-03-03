// pages/ConfigHarga/hooks/useConfigHarga.js
import { useState, useEffect } from 'react';
import { fetchTujuanData, addTujuanData, updateTujuanData } from '../services/api';

export const useConfigHarga = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        try {
            setIsLoading(true);
            const result = await fetchTujuanData();
            console.log('Data dari server:', result);
            
            const processedData = result.map(item => {
                console.log('Processing item:', item);
                return {
                    ...item,
                    sekitar: item.sekitar.locations,
                    koordinat: item.koordinat.coordinates
                };
            });
            
            console.log('Processed data:', processedData);
            setData(processedData);
            setError(null);
        } catch (err) {
            console.error('Error detail:', err);
            setError('Gagal memuat data: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddData = async (newData) => {
        console.log("NewData in handleAddData:", newData);
        try {
            setIsSubmitting(true);
            setError(null);
            
            // Mengirim data ke server
            const result = await addTujuanData(newData);
            
            // Update state dengan data dari server
            setData(prevData => [...prevData, result]);
            
            // Tutup modal jika berhasil
            setModalIsOpen(false);
            
            return { success: true };
        } catch (err) {
            setError('Gagal menambahkan data: ' + err.message);
            return { success: false, error: err.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateData = async (index, updatedData) => {
        try {
            // Create a copy of the data to be updated
            const itemToUpdate = { ...data[index], ...updatedData };
            
            // Call the API to update the data
            await updateTujuanData(itemToUpdate);
            
            // Update the state
            setData(prevData => {
                const newData = [...prevData];
                newData[index] = { ...newData[index], ...updatedData };
                return newData;
            });
            
            return { success: true };
        } catch (err) {
            setError('Gagal memperbarui data: ' + err.message);
            return { success: false, error: err.message };
        }
    };

    const handleDeleteData = async (id) => {
        try {
            // Call the API to delete the data (you need to implement deleteTujuanData in your API service)
            // await deleteTujuanData(id);
            
            // Update the state by removing the deleted item
            setData(prevData => prevData.filter(item => item.id_tujuan !== id));
            
            return { success: true };
        } catch (err) {
            setError('Gagal menghapus data: ' + err.message);
            return { success: false, error: err.message };
        }
    };

    return {
        data,
        isLoading,
        error,
        isModalOpen,
        isSubmitting,
        setModalIsOpen,
        handleAddData,
        handleUpdateData,
        handleDeleteData,
        refreshData: loadData
    };
};