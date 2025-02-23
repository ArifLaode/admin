import React, { useState } from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import './custom.css'

const Logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

const Header = () => {
  const name = localStorage.getItem('username');
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <header className="bg-white p-4 flex justify-between items-center">
    <div className="flex flex-col ml-3 mt-5 items-start space-x-4 w-100">
      <h1 className="text-blue-900 text-4xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <GoHome size={24} color="#1c398e" />
        <span className="text-blue-900 font-bold">Home /</span>
      </div>
    </div>
      <div className="header-div">
        <div className="header-user">
            <FaUserCircle size={45} />
            <span className="">{name}</span>
        </div>
        <div className="header-end">
            <div className="header-icon gear">
                <FaCog size={24} />
            </div>
            <div className="header-icon">
                <FaArrowRightToBracket onClick={() => setModalOpen(true)} size={24} />
                {modalOpen && (
                  <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 flex justify-center items-center">
                    <div className="modal-wrapper bg-white py-10 px-10 rounded-lg border-2 border-amber-950">
                      <div className="modal-header">
                        <h3 className="text-blue-900 text-xl font-bold">Logout</h3>
                      </div>
                      <div className="modal-body">
                        <p>Apakah Anda yakin ingin keluar?</p>
                      </div>
                      <div className="modal-footer justify-between mt-5 space-x-5">
                        <button onClick={Logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Keluar</button>
                        <button onClick={() => setModalOpen(false)} className="border rounded px-4 py-2 hover:bg-gray-100">Batal</button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
        </div>
      </div>
  </header>
  );
};

export default Header;