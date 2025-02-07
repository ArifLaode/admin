import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
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
            
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
