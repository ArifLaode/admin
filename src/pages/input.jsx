import React, { useState } from "react";
import Modal from "react-modal";
import SectionPage from "../component/SectionPage";
import { FaPlus } from "react-icons/fa";

const InputPage = () => {
  const [data, setData] = useState([
    {
      no: 1,
      resi: "JNE123456789",
      nama_pengirim: "Budi Santoso",
      telp_pengirim: "081234567890",
      nama_penerima: "Siti Nurhaliza",
      telp_penerima: "085678901234",
      tujuan: "Jakarta",
      nama_barang: "Pakaian",
      berat: 1,
      harga: 100000,
    },
    {
      no: 2,
      resi: "TIKI987654321",
      nama_pengirim: "Andi Wijaya",
      telp_pengirim: "082345678901",
      nama_penerima: "Dewi Lestari",
      telp_penerima: "087890123456",
      tujuan: "Surabaya",
      nama_barang: "Elektronik",
      berat: 2,
      harga: 250000,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

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

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const newDataItem = {
      nama_pengirim: formData.nama_pengirim,
      telp_pengirim: formData.nama_pengirim,
      nama_penerima: formData.nama_penerima,
      telp_penerima: formData.telp_penerima,
      tujuan: formData.tujuan,
      nama_barang: formData.nama_barang,
      berat: formData.berat,
      harga: formData.harga,
    };
    // setData([...data, newDataItem]);

    console.log(newDataItem);

    setFormData({
      nama_pengirim: "",
      telp_pengirim: "",
      nama_penerima: "",
      telp_penerima: "",
      tujuan: "",
      nama_barang: "",
      berat: "",
      harga: "",
    });
    setModalOpen(false);
  };
  return (
    <div>
      <SectionPage
        title="Tambahkan Data Baru"
        width={96}
        height={800}
        item={
          <button
            onClick={handleClick}
            className="primary-color py-2 px-2 rounded-xl"
          >
            <FaPlus size={24} />
          </button>
        }
      >
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
                  key={item.resi}
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
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
        >
          <form className="input-paket" onSubmit={submit}>
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="text"
              placeholder="Nama Pengirim"
            />
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="text"
              placeholder="Nomor Telp. Pengirim"
            />
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="text"
              placeholder="Nama Penerima"
            />
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="text"
              placeholder="Telp. Penerima"
            />
            <select
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              prefix="Tujuan"
            >
              <option disabled defaultValue>
                Pilih Tujuan
              </option>
              <option value={"Tampo"}>Tampo</option>
              <option value={"Raha"}>Raha</option>
            </select>
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="text"
              placeholder="Nama Barang"
            />
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="number"
              placeholder="Berat"
            />
            <input
              required
              className="border mb-7 rounded px-2 py-1 w-full"
              value={setFormData.nama_pengirim}
              onChange={handleChange}
              type="number"
              placeholder="Harga"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="border rounded px-4 py-2 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </Modal>
      </SectionPage>
    </div>
  );
};

export default InputPage;
