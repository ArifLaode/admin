import React, { useState } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { FaGears } from 'react-icons/fa6';
import { TbReportAnalytics } from 'react-icons/tb';
import Logo from '../assets/logo.png'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menus = [
    {
      name: 'dashboard',
      icon: <RxDashboard className="h-10 w-5" />,
      text: 'Dashboard',
    },
    {
      name: 'data-utama',
      icon: <BsDatabaseFillAdd className="h-10 w-5" />,
      text: 'Input Data'
    },
    {
      name: 'konfigurasi',
      icon: <FaGears className="h-10 w-5" />,
      text: 'Konfigurasi',
      dropdown: [
        { text: 'Harga' },
        {text: 'Tujuan' },
        {text: 'Koordinat' },
        {text: 'Pengguna' },],
    },
    {
      name: 'laporan',
      icon: <TbReportAnalytics className="h-10 w-5" />,
      text: 'Laporan',
      dropdown: [
        { text: 'Laporan Harian' },
        { text: 'Manifest' },
        { text: 'Laporan Lengkap' },
        { text: 'Laporan Yang Belum Dikonformasi' },
      ]
    },
  ];

  return (
    <aside>
    <nav className="primary-color text-black h-screen p-4 fixed" style={{ width: '15%'}}>
      {/* Logo */}
      <div className="mb-8">
        <span className='w-50 mb-12 mt-5 flex'><img src={Logo} alt='Logo' /></span>
      </div>

      {/* Menu */}
      <ul>
        {menus.map((menu) => (
          <li key={menu.name} className="mb-3 group">
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                activeMenu === menu.name ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => {
                setActiveMenu(menu.name);
                if (menu.dropdown) {
                  setIsDropdownOpen(menu.name);
                } else {
                  setIsDropdownOpen(false);
                }
              }}
            >
              {menu.icon}
              <span className="ml-2">{menu.text}</span>
              {menu.dropdown && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-auto h-5 w-5 transition-transform ${
                    isDropdownOpen === menu.name ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>

            {/* Dropdown */}
            {menu.dropdown && isDropdownOpen === menu.name && (
              <ul className="ml-8 mt-1">
                {menu.dropdown.map((dropdownItem, idx) => (
                  <li key={idx} className="mb-1">
                    <div
                      className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                        dropdownItem.dropdown ? 'group' : ''
                      }`}
                    >
                      {dropdownItem.text}
                      {dropdownItem.dropdown && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`ml-2 h-5 w-5 transition-transform ${
                            isDropdownOpen === menu.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </div>
                    {dropdownItem.dropdown && isDropdownOpen === menu.name && (
                      <ul className="ml-8 mt-1">
                        {dropdownItem.dropdown.map((subDropdownItem, idx) => (
                          <li key={idx} className="mb-1">
                            <div className="p-2 rounded-md cursor-pointer hover:bg-gray-700">
                              {subDropdownItem.text}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
    </aside>
  );
};

export default Navbar;