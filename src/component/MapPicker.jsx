import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { FaLocationArrow } from 'react-icons/fa';
import Modal from 'react-modal';

// Penting: Tambahkan fix untuk Leaflet di React
// Icon path issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Style untuk modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '400px',
        width: '600px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

// Pastikan modal setup di-inisialisasi
if (typeof document !== 'undefined') {
    Modal.setAppElement('#root');
}

const MapInput = ({ initialCoordinates = [0, 0], onCoordinateChange }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const markerRef = useRef(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    // Fungsi untuk menghapus peta saat komponen unmount
    const destroyMap = () => {
        if (leafletMapRef.current) {
            leafletMapRef.current.remove();
            leafletMapRef.current = null;
            markerRef.current = null;
            setMapInitialized(false);
        }
    };

    // Fungsi untuk membuat peta
    const createMap = () => {
        // Hanya buat peta jika belum ada
        if (leafletMapRef.current || !mapRef.current) return;

        try {
            // Buat instance map baru
            const map = L.map(mapRef.current, {
                center: currentCoordinates,
                zoom: 13
            });
            
            // Tambahkan tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Buat marker
            const marker = L.marker(currentCoordinates, { draggable: true }).addTo(map);
            
            // Setup geocoder
            const geocoder = L.Control.geocoder({
                position: 'topleft',
                defaultMarkGeocode: false,
                placeholder: 'Cari Tempat...',
                errorMessage: 'Lokasi tidak ditemukan',
            }).addTo(map);
            
            // Event handler untuk geocoder
            geocoder.on('markgeocode', (e) => {
                const latLng = e.geocode.center;
                marker.setLatLng(latLng);
                map.setView(latLng, map.getZoom());
                
                const newCoords = [latLng.lat, latLng.lng];
                setCurrentCoordinates(newCoords);
                if (onCoordinateChange) {
                    onCoordinateChange(latLng.lat, latLng.lng);
                }
            });
            
            // Event handler untuk marker drag
            marker.on('dragend', () => {
                const latLng = marker.getLatLng();
                const newCoords = [latLng.lat, latLng.lng];
                setCurrentCoordinates(newCoords);
                if (onCoordinateChange) {
                    onCoordinateChange(latLng.lat, latLng.lng);
                }
            });
            
            // Simpan referensi
            leafletMapRef.current = map;
            markerRef.current = marker;
            
            // Tandai peta sudah diinisialisasi
            setMapInitialized(true);
            
            // Force recalculate size
            setTimeout(() => {
                map.invalidateSize(true);
            }, 100);
            
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    };

    // Effect untuk menangani perubahan modalIsOpen
    useEffect(() => {
        if (modalIsOpen) {
            // Beri waktu untuk modal render dulu
            setTimeout(() => {
                // Coba buat peta jika belum ada
                if (!leafletMapRef.current && mapRef.current) {
                    createMap();
                } else if (leafletMapRef.current) {
                    // Update ukuran dan view jika peta sudah ada
                    leafletMapRef.current.invalidateSize(true);
                    leafletMapRef.current.setView(currentCoordinates, 13);
                    if (markerRef.current) {
                        markerRef.current.setLatLng(currentCoordinates);
                    }
                }
            }, 300);
        }
    }, [modalIsOpen]);

    // Effect untuk membersihkan saat unmount
    useEffect(() => {
        return () => destroyMap();
    }, []);

    // Effect untuk menangani perubahan initialCoordinates
    useEffect(() => {
        if (
            initialCoordinates &&
            (initialCoordinates[0] !== currentCoordinates[0] ||
             initialCoordinates[1] !== currentCoordinates[1])
        ) {
            setCurrentCoordinates(initialCoordinates);
            
            if (leafletMapRef.current && markerRef.current) {
                leafletMapRef.current.setView(initialCoordinates, leafletMapRef.current.getZoom());
                markerRef.current.setLatLng(initialCoordinates);
            }
        }
    }, [initialCoordinates]);

    const handleIconClick = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        // Tidak perlu destroy map, hanya tutup modal
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        const [lat, lng] = value.split(',').map(coord => parseFloat(coord.trim()));
        if (!isNaN(lat) && !isNaN(lng)) {
            const newCoords = [lat, lng];
            setCurrentCoordinates(newCoords);
            if (onCoordinateChange) {
                onCoordinateChange(lat, lng);
            }
            
            if (leafletMapRef.current && markerRef.current) {
                leafletMapRef.current.setView(newCoords, leafletMapRef.current.getZoom());
                markerRef.current.setLatLng(newCoords);
            }
        }
    };

    // Komponen yang akan dirender di sisi client
    return (
        <div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={currentCoordinates ? `${currentCoordinates[0]}, ${currentCoordinates[1]}` : ''}
                    onChange={handleInputChange}
                    readOnly
                />
                <div className="input-group-append">
                    <span 
                        className="input-group-text" 
                        onClick={handleIconClick} 
                        style={{ cursor: 'pointer' }}
                    >
                        <FaLocationArrow />
                    </span>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Peta"
                shouldCloseOnOverlayClick={true}
                onAfterOpen={() => {
                    // Refresh map setelah modal terbuka
                    setTimeout(() => {
                        if (leafletMapRef.current) {
                            leafletMapRef.current.invalidateSize(true);
                        }
                    }, 200);
                }}
            >
                <div 
                    ref={mapRef} 
                    style={{ 
                        height: '90%', 
                        width: '100%', 
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }} 
                />
                <button 
                    onClick={closeModal}
                    style={{
                        margin: '10px 0',
                        padding: '5px 10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Tutup
                </button>
            </Modal>
        </div>
    );
};

export default MapInput;