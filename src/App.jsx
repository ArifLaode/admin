import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/input";
import ConfigHarga from "./pages/ConfigHarga";
import User from "./pages/User";
import './App.css'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/input-package" element={<InputPage />} />
            <Route path="/konfigurasi/harga" element={<ConfigHarga />} />
            <Route path="/konfigurasi/user" element={<User />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
