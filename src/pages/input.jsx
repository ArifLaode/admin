import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SectionPage from "../component/SectionPage";
import { FaPlus } from "react-icons/fa";

const InputPage = () => {
  const [data, setData] = useState([]);
  const [tujuanOptions, setTujuanOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const column = [
    { Header: "No", accessor: "no" },
    { Header: "Resi", accessor: "resi" },
    { Header: "Nama Pengirim", accessor: "nama_pengirim" },
    { Header: "Telp. Pengirim", accessor: "telp_pengirim" },
    { Header: "Nama Penerima", accessor: "nama_penerima" },
    { Header: "Telp. Penerima", accessor: "telp_penerima" },
    { Header: "Tujuan", accessor: "tujuan" },
    { Header: "Nama Barang", accessor: "nama_barang" },
    { Header: "Berat", accessor: "berat" },
    { Header: "Harga", accessor: "harga" },
  ];

  const [formData, setFormData] = useState({
    nama_pengirim: "",
    telp_pengirim: "",
    nama_penerima: "",
    telp_penerima: "",
    tujuan: "",
    nama_barang: "",
    berat: "",
    harga: "",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "600px",
      width: "700px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  useEffect(() => {
    fetchData();
    fetchTujuanOptions();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:1034/paket/read");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load package data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTujuanOptions = async () => {
    try {
      const response = await fetch("http://localhost:1034/tujuan/read");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTujuanOptions(result.data || []);
    } catch (error) {
      console.error("Error fetching tujuan:", error);
      setError("Failed to load destination options");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:1034/paket/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      
      // Refresh data instead of manually adding
      await fetchData();
      
      // Reset form and close modal
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add package");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama_pengirim: "",
      telp_pengirim: "",
      nama_penerima: "",
      telp_penerima: "",
      tujuan: searchTerm, // Keep the selected tujuan
      nama_barang: "",
      berat: "",
      harga: "",
    });
    setModalOpen(false);
  };

  const filteredTujuanOptions = tujuanOptions
    .flatMap((option) =>
      option.sekitar.locations.map((location) => ({
        parent: option.tujuan,
        location,
      }))
    )
    .filter(
      (option) =>
        option.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.parent.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelect = (value) => {
    setSearchTerm(value);
    setFormData((prevData) => ({ ...prevData, tujuan: value }));
    setShowDropdown(false);
  };

  return (
    <div>
      <SectionPage
        title="Tambahkan Data Baru"
        width={96}
        height={800}
        item={
          <button
            onClick={() => setModalOpen(true)}
            className="primary-color py-2 px-2 rounded-xl"
            disabled={isLoading}
          >
            <FaPlus size={24} />
          </button>
        }
      >
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : data && data.length > 0 ? (
          <div className="table-container">
            <table className="data-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  {column.map((col) => (
                    <th key={col.accessor} className="table-header">
                      {col.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.resi || index}
                    className={index % 2 === 0 ? "even" : "odd"}
                  >
                    {column.map((col) => (
                      <td key={col.accessor} className="table-cell">
                        {item[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm py-2">Data masih kosong.</p>
        )}
        
        <Modal
          isOpen={modalOpen}
          onRequestClose={resetForm}
          style={customStyles}
          ariaHideApp={false}
        >
          <h2 className="text-xl font-bold mb-4">Tambah Paket Baru</h2>
          
          <form className="input-paket" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.nama_pengirim}
                onChange={handleChange}
                name="nama_pengirim"
                type="text"
                placeholder="Nama Pengirim"
              />
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.telp_pengirim}
                onChange={handleChange}
                name="telp_pengirim"
                type="text"
                placeholder="Nomor Telp. Pengirim"
              />
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.nama_penerima}
                onChange={handleChange}
                name="nama_penerima"
                type="text"
                placeholder="Nama Penerima"
              />
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.telp_penerima}
                onChange={handleChange}
                name="telp_penerima"
                type="text"
                placeholder="Telp. Penerima"
              />
              
              <div className="relative mb-4">
                <input
                  type="text"
                  className="border rounded-lg px-4 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Cari Tujuan..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                
                {showDropdown && filteredTujuanOptions.length > 0 && (
                  <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1 z-10">
                    {filteredTujuanOptions.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                        onMouseDown={() => handleSelect(`${option.parent} - ${option.location}`)}
                      >
                        {option.parent} - {option.location}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.nama_barang}
                onChange={handleChange}
                name="nama_barang"
                type="text"
                placeholder="Nama Barang"
              />
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.berat}
                onChange={handleChange}
                name="berat"
                type="number"
                placeholder="Berat"
                min="0"
                step="0.1"
              />
              
              <input
                required
                className="border mb-4 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.harga}
                onChange={handleChange}
                name="harga"
                type="number"
                placeholder="Harga"
                min="0"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="border rounded px-4 py-2 hover:bg-gray-100"
                disabled={isLoading}
              >
                Batal
              </button>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      </SectionPage>
    </div>
  );
};

export default InputPage;