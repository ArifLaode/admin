import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { FaLocationArrow } from 'react-icons/fa';
import Modal from 'react-modal';

// Fix untuk icon Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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

// Pastikan Modal.setAppElement hanya dijalankan di client-side
if (typeof window !== 'undefined') {
    Modal.setAppElement('#root');
}

const MapPicker = ({ initialCoordinates = [0, 0], onCoordinateChange }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const markerRef = useRef(null);

    const createMap = () => {
        // Cek apakah peta sudah ada atau container belum siap
        if (leafletMapRef.current || !mapRef.current) return;

        try {
            // Inisialisasi peta
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

            // Fungsi untuk update koordinat
            const updateCoordinates = (latLng) => {
                const newCoords = [latLng.lat, latLng.lng];
                setCurrentCoordinates(newCoords);
                if (onCoordinateChange) {
                    onCoordinateChange(latLng.lat, latLng.lng);
                }
            };

            // Event handler untuk geocoder
            geocoder.on('markgeocode', (e) => {
                const latLng = e.geocode.center;
                marker.setLatLng(latLng);
                map.setView(latLng, map.getZoom());
                updateCoordinates(latLng);
            });

            // Event handler untuk marker drag
            marker.on('dragend', () => {
                const latLng = marker.getLatLng();
                updateCoordinates(latLng);
            });

            // Simpan referensi
            leafletMapRef.current = map;
            markerRef.current = marker;

            // Force recalculate size setelah peta dibuat
            requestAnimationFrame(() => {
                map.invalidateSize();
            });

        } catch (error) {
            console.error("Error initializing map:", error);
        }
    };

    // Effect untuk menangani modal dan inisialisasi peta
    useEffect(() => {
        if (modalIsOpen) {
            // Gunakan requestAnimationFrame untuk timing yang lebih baik
            requestAnimationFrame(() => {
                if (!leafletMapRef.current && mapRef.current) {
                    createMap();
                } else if (leafletMapRef.current) {
                    leafletMapRef.current.invalidateSize();
                    leafletMapRef.current.setView(currentCoordinates);
                    if (markerRef.current) {
                        markerRef.current.setLatLng(currentCoordinates);
                    }
                }
            });
        }
    }, [modalIsOpen]);

    // Effect untuk update koordinat ketika initialCoordinates berubah
    useEffect(() => {
        if (
            initialCoordinates &&
            (initialCoordinates[0] !== currentCoordinates[0] ||
             initialCoordinates[1] !== currentCoordinates[1])
        ) {
            setCurrentCoordinates(initialCoordinates);
            if (leafletMapRef.current && markerRef.current) {
                markerRef.current.setLatLng(initialCoordinates);
                leafletMapRef.current.setView(initialCoordinates);
            }
        }
    }, [initialCoordinates]);

    // Cleanup saat unmount
    useEffect(() => {
        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
                markerRef.current = null;
            }
        };
    }, []);

    const handleIconClick = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

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
                markerRef.current.setLatLng(newCoords);
                leafletMapRef.current.setView(newCoords);
            }
        }
    };

    return (
        <div className='map-input-container'>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={`${currentCoordinates[0]}, ${currentCoordinates[1]}`}
                    onChange={handleInputChange}
                    readOnly
                    style={{ width: '200px' }} // Set your desired width here
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
            >
                <div ref={mapRef} style={{ height: '90%', width: '100%' }} />
                <button 
                    onClick={closeModal} 
                    className="btn primary-color w-16 h-8 mt-4 rounded-md"
                >
                    Tutup
                </button>
            </Modal>
        </div>
    );
};

export default MapPicker;