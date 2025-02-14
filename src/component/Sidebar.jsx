import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { LuPackagePlus } from 'react-icons/lu';
import { FaGears, FaAngleDown } from 'react-icons/fa6';
import { TbReportAnalytics } from 'react-icons/tb';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
  
    // 1. Check if the currentPath matches any dropdown links
    let currentMenu = menus.find(menu => 
      menu.dropdown && menu.dropdown.some(item => item.link === currentPath)
    );
  
    if (currentMenu) {
      // 2. If a dropdown link matches, set the parent menu as active
      setActiveMenu(currentMenu.name);
      setIsDropdownOpen(currentMenu.name);
    } else {
      // 3. Otherwise, check for a direct menu link match
      currentMenu = menus.find((menu) => menu.link === currentPath);
      if (currentMenu) {
        setActiveMenu(currentMenu.name);
      } else {
        // 4. If no match, set a default active menu (e.g., 'dashboard')
        setActiveMenu('dashboard'); 
      }
    }
  }, [location]);

  const menus = [
    {
      name: 'dashboard',
      icon: <RxDashboard className="h-10 w-5" />,
      text: 'Dashboard',
      link: '/',
    },
    {
      name: 'data-utama',
      icon: <LuPackagePlus className="h-10 w-5" />,
      text: 'Input Paket',
      link: '/input-package',
    },
    {
      name: 'konfigurasi',
      icon: <FaGears className="h-10 w-5" />,
      text: 'Konfigurasi',
      dropdown: [
        { text: 'Harga', link: '/konfigurasi/harga' },
        { text: 'Tujuan', link: '/konfigurasi/tujuan' },
        { text: 'Koordinat', link: '/konfigurasi/koordinat' },
        { text: 'Pengguna', link: '/konfigurasi/pengguna' },
      ],
    },
    {
      name: 'laporan',
      icon: <TbReportAnalytics className="h-10 w-5" />,
      text: 'Laporan',
      dropdown: [
        { text: 'Laporan Harian', link: '/laporan/harian' },
        { text: 'Manifest', link: '/laporan/manifest' },
        { text: 'Laporan Lengkap', link: '/laporan/lengkap' },
        { text: 'Belum Dikonfirmasi', link: '/laporan/belum-dikonfirmasi' },
      ],
    },
  ];

  return (
    <aside>
      <nav className="primary-color text-black h-screen p-4 fixed" style={{ width: '15%' }}>
        {/* Logo */}
        <div className="mb-8">
          <span className='w-50 mb-12 mt-5 flex'><img src={Logo} alt='Logo' /></span>
        </div>

        {/* Menu */}
        <ul>
          {menus.map((menu) => (
            <li key={menu.name} className={`mb-3 group ${menu.dropdown ? '' : 'hover:bg-gray-700 cursor-pointer rounded-md'}`}>
              <Link to={menu.link || '#'} className={`flex items-center p-2 rounded-md cursor-pointer ${activeMenu === menu.name ? 'secondary-color' : ''}`}
                onClick={() => {
                  if (menu.dropdown) {
                    // Toggle dropdown tanpa mengubah activeMenu
                    setIsDropdownOpen(isDropdownOpen === menu.name ? null : menu.name);
                  } else {
                    // Set activeMenu hanya jika menu tidak memiliki dropdown
                    setActiveMenu(menu.name);
                    setIsDropdownOpen(null);
                  }
                }}
              >
                {menu.icon}
                <span className="ml-2">{menu.text}</span>
                {menu.dropdown && (
                  <FaAngleDown
                    className={`ml-auto h-5 w-5 transition-transform ${
                      isDropdownOpen === menu.name ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {menu.dropdown && isDropdownOpen === menu.name && (
                <ul className="ml-8 mt-1" style={{width: '100%'}}>
                  {menu.dropdown.map((dropdownItem, idx) => (
                    <li key={idx} className="mb-1">
                      <Link to={dropdownItem.link} className="p-2 rounded-md cursor-pointer hover:bg-gray-700">
                        {dropdownItem.text}
                      </Link>
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