import SectionPage from '../../component/SectionPage';
import { FaPlus } from 'react-icons/fa';
import ConfigHargaTable from './components/ConfigHargaTable';
import AddConfigModal from './components/AddConfigModal';
import { useConfigHarga } from './hooks/useConfigHarga';

const ConfigHarga = () => {
    const {
        data,
        isLoading,
        error,
        isModalOpen,
        setModalIsOpen,
        handleAddData,
        handleUpdateData,
        handleDeleteData,
    } = useConfigHarga();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <SectionPage 
                title="Konfigurasi Harga" 
                width={100}
                item={
                    <button 
                        onClick={() => setModalIsOpen(true)} 
                        className="secondary-color py-2 px-2 rounded-xl cursor-pointer"
                    >
                        <FaPlus size={24} />
                    </button>
                }
            >
                <ConfigHargaTable 
                    data={data} 
                    onUpdateData={handleUpdateData}
                    onDeleteData={handleDeleteData}
                />
                
                {isModalOpen && (
                    <AddConfigModal 
                        onClose={() => setModalIsOpen(false)}
                        onSubmit={handleAddData}
                    />
                )}
            </SectionPage>
        </div>
    );
};

export default ConfigHarga;