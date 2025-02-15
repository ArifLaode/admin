import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { LuPackagePlus } from 'react-icons/lu';
import { FaGears, FaAngleDown } from 'react-icons/fa6';
import { TbReportAnalytics } from 'react-icons/tb';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeChild, setActiveChild] = useState(null);
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
      
      // 3. Also find and set the active child
      const activeDropdownItem = currentMenu.dropdown.find(item => item.link === currentPath);
      if (activeDropdownItem) {
        setActiveChild(activeDropdownItem.text);
        // Ensure dropdown is open when a child is active
        if (!openDropdowns.includes(currentMenu.name)) {
          setOpenDropdowns(prev => [...prev, currentMenu.name]);
        }
      }
    } else {
      // 4. Otherwise, check for a direct menu link match
      currentMenu = menus.find((menu) => menu.link === currentPath);
      if (currentMenu) {
        setActiveMenu(currentMenu.name);
        setActiveChild(null); // Reset active child
      } else {
        // 5. If no match, set a default active menu (e.g., 'dashboard')
        setActiveMenu('dashboard');
        setActiveChild(null); // Reset active child
      }
    }
  }, [location, openDropdowns]);

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
        { text: 'Lokasi', link: '/konfigurasi/harga' },
        { text: 'Pengguna', link: '/konfigurasi/user' },
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

  const toggleDropdown = (menuName) => {
    setOpenDropdowns(prev => {
      if (prev.includes(menuName)) {
        return prev.filter(name => name !== menuName);
      } else {
        return [...prev, menuName];
      }
    });
  };

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
              <Link
                to={menu.link || '#'}
                className={`flex items-center p-2 rounded-md cursor-pointer ${activeMenu === menu.name ? 'secondary-color' : ''}`}
                onClick={(e) => {
                  if (menu.dropdown) {
                    e.preventDefault(); // Prevent navigation for dropdown menus
                    toggleDropdown(menu.name);
                  } else {
                    // Set activeMenu hanya jika menu tidak memiliki dropdown
                    setActiveMenu(menu.name);
                    setActiveChild(null); // Reset active child when clicking a non-dropdown menu
                  }
                }}
              >
                {menu.icon}
                <span className="ml-2">{menu.text}</span>
                {menu.dropdown && (
                  <FaAngleDown
                    className={`ml-auto h-5 w-5 transition-transform ${
                      openDropdowns.includes(menu.name) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {menu.dropdown && openDropdowns.includes(menu.name) && (
                <ul className="ml-5 primary-color opacity-80 rounded-md">
                  {menu.dropdown.map((dropdownItem, idx) => (
                    <li key={idx} className="mb-1 hover:bg-gray-700 rounded-md">
                      <Link 
                        to={dropdownItem.link} 
                        className={`block p-2 rounded-md cursor-pointer ${activeChild === dropdownItem.text ? 'secondary-color' : ''}`}
                        onClick={() => setActiveChild(dropdownItem.text)}
                      >
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