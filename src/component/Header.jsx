import React from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import './../custom.css'


const Header = () => (
  <header className="bg-white p-4 flex justify-between items-center">
    <div className="flex flex-col ml-3 mt-5 items-start space-x-4 w-100">
      <h1 className="text-blue-900 text-4xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <GoHome size={24} color="#1c398e" />
        <span className="text-blue-900 font-bold">Home /</span>
      </div>
    </div>
    <div className="flex items-center space-x-4"></div>
    <div className="flex items-center space-x-4">
      <div className="header-div">
        <div className="header-user">
            <FaUserCircle size={45} />
            <span>User Name</span>
        </div>
        <div className="header-end">
            <div className="header-icon gear">
                <FaCog size={24} />
            </div>
            <div className="header-icon">
                <FaArrowRightToBracket size={24} />
            </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;