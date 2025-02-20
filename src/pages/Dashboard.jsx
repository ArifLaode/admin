import React from "react";
import Section from "../component/Section";
import Card from "../component/Card";
import { CgDollar } from "react-icons/cg";
import { TbPackageImport } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { GiWeight } from "react-icons/gi";

const Dashboard = () => {
    const cardData = [
      {
        title: 'Paket Terinput',
        content: '273',
        icon: <TbPackageImport size={64} />,
        navigationLink: '/users',
        backgroundColor: 'primary-color',
      },
      {
        title: 'Paket Delivery',
        content: '781',
        icon: <LuPackageCheck size={64} />,
        navigationLink: '/income',
        backgroundColor: 'bg-green-500',
        textColor: 'white',
      },
      {
        title: 'Total Berat',
        content: '850',
        icon: <GiWeight size={64} />,
        navigationLink: '/products',
        backgroundColor: 'bg-yellow-500',
        textColor: 'black',
      },
      {
        title: 'Pendapatan dari Paket',
        content: <span className="flex flex-wrap">Rp. <h2>300000</h2></span>,
        icon: <CgDollar size={64} />,
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
  
        <div className="flex flex-wrap justify-between">
          <Section title="Grafik Penjualan" width={70}>
            <p>Grafik akan ditampilkan di sini.</p>
          </Section>
    
          <Section title="Aktivitas Terbaru" width={29}>
            <ul>
              <li>Pengguna baru mendaftar.</li>
              <li>Produk baru ditambahkan.</li>
              <li>Pesanan baru diterima.</li>
            </ul>
          </Section>
        </div>

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