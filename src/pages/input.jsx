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

  const handleClick = () => {
    console.log("Tambah Data");
  }
  return (
    <div>
      <SectionPage title="Tambahkan Data Baru" width={96} height={800} item={<button onClick={handleClick} className="primary-color py-2 px-2 rounded-xl"><FaPlus size={24} /></button>}>
        <div className="table-container">
        <table className="data-table" style={{width: '100%'}}>
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
          <tr key={item.resi} className={index % 2 === 0? 'even': 'odd'}>
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
      </SectionPage>
    </div>
  );
};

export default InputPage;
