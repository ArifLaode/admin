import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import Bus from "../assets/bus.jpeg"
import { text } from "framer-motion/client";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [directHome, setDirectHome] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (username === "" || password === "") {
      setError("Empty");
    } else {
      setError("");
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const body = JSON.stringify({ username, password });
      fetch('http://localhost:1034/login', {
        method: 'POST',
        headers,
        body
      })
    .then(async response => {
        if (!response.ok) {
          // Tangani error, baca responsenya sebagai teks
          const text = await response.text();
          throw new Error(text); // Throw error dengan pesan dari server
        }
        // Jika responsenya OK, baca sebagai JSON
        return response.json();
      })
    .then(data => {
        // Pastikan data terdefinisi sebelum mengakses propertinya
        if (data && data.success) {
          setResponseMessage("Login successful!");
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username)
          setDirectHome(true);
          if (data.token !== null) {
            setResponseMessage("Login successful!");
            setDirectHome(true);
            onLoginSuccess(); // Call the onLoginSuccess prop
          }
        } else {
          // Tangani kasus di mana data tidak memiliki properti success
          setResponseMessage("Login failed: Invalid response from server");
        }
      })
    .catch(error => {
        setResponseMessage("Kesalahan Username atau Password");
      });
    }
  };

  if (directHome) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-between">
        <div className="w-full">
            <img className="h-screen" src={Bus} />
        </div>
        <div className="login-contener bg-amber-300 w-full max-w-2xl h-dvh">
      <div className="w-full max-w-110">
        <form
          className="bg-white shadow-md rounded-xl px-15 pt-6 pb-8 mb-4 mt-20"
          onSubmit={handleSubmit}
        >
            <img className="box-content py-2 mb-2 mt-2" src={Logo} />
            <h1 className="text-2xl pb-5 justify-center justify-items-center justify-self-center font-bold text-gray-800">Login</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Nama Pengguna
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*****"
            />
            <div className="py-2" style={{marginTop: '-20px', marginBottom: '40px'}}>
            {error && (
                <p className="text-red-500 absolute text-xs italic">
                Please choose a password.
              </p>
            )}
            {responseMessage && (
              <p className={`text-xs italic ${responseMessage.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                {responseMessage}
              </p>
            )}
            </div>
          </div>
          <div className="flex items-center mb-5 mt-2 justify-end">
            <button
              className="bg-blue-500 absolute hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;2025 Perusahaan Umum DAMRI. All rights reserved.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
