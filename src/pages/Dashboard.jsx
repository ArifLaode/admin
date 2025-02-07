import React from "react";
import Section from "../component/Section";
import Card from "../component/Card";
import { CgDollar } from "react-icons/cg";
import { FaUser, FaChartPie } from "react-icons/fa6";

const Dashboard = () => {
    const cardData = [
      {
        title: 'Total Pengguna',
        content: '1250',
        icon: <FaUser size={24} />,
        navigationLink: '/users',
        useLinker: false,
        backgroundColor: 'primary-color',
      },
      {
        title: 'Pendapatan Bulan Ini',
        content: 'Rp 15.000.000',
        icon: <CgDollar size={64} />,
        navigationLink: '/income',
        backgroundColor: 'bg-green-500',
        textColor: 'white',
      },
      {
        title: 'Produk Terjual',
        content: '850',
        icon: <FaChartPie size={64} />,
        navigationLink: '/products',
        backgroundColor: 'bg-red-500',
        textColor: 'white',
      },
      {
        title: 'Produk Terjual',
        content: '850',
        icon: <FaChartPie size={64} />,
        navigationLink: '/products',
        backgroundColor: 'secondary-color',
        textColor: 'white',
      },
    ];
  
    return (
      <div className="dashboard">
        <Section title="Statistik Utama">
          <div className="card-container flex flex-wrap gap-10 justify-center">
            {cardData.map((card, index) => (
              <Card key={index} {...card} className="hover: scale-115" />
            ))}
          </div>
        </Section>
  
        <Section title="Grafik Penjualan">
          {/* Anda bisa menambahkan grafik di sini */}
          <p>Grafik akan ditampilkan di sini.</p>
        </Section>
  
        <Section title="Aktivitas Terbaru">
          {/* Anda bisa menambahkan daftar aktivitas terbaru di sini */}
          <ul>
            <li>Pengguna baru mendaftar.</li>
            <li>Produk baru ditambahkan.</li>
            <li>Pesanan baru diterima.</li>
          </ul>
        </Section>
        <Section title="Aktivitas Terbaru">
          {/* Anda bisa menambahkan daftar aktivitas terbaru di sini */}
          <ul>
            <li>Pengguna baru mendaftar.</li>
            <li>Produk baru ditambahkan.</li>
            <li>Pesanan baru diterima.</li>
          </ul>
        </Section>
        <Section title="Aktivitas Terbaru">
          {/* Anda bisa menambahkan daftar aktivitas terbaru di sini */}
          <ul>
            <li>Pengguna baru mendaftar.</li>
            <li>Produk baru ditambahkan.</li>
            <li>Pesanan baru diterima.</li>
          </ul>
        </Section>
        <Section title="Aktivitas Terbaru">
          {/* Anda bisa menambahkan daftar aktivitas terbaru di sini */}
          <ul>
            <li>Pengguna baru mendaftar.</li>
            <li>Produk baru ditambahkan.</li>
            <li>Pesanan baru diterima.</li>
          </ul>
        </Section>
        <Section title="Aktivitas Terbaru">
          {/* Anda bisa menambahkan daftar aktivitas terbaru di sini */}
          <ul>
            <li>Pengguna baru mendaftar.</li>
            <li>Produk baru ditambahkan.</li>
            <li>Pesanan baru diterima.</li>
          </ul>
        </Section>
      </div>
    );
  };
  
  export default Dashboard;