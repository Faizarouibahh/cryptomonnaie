import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoList, setCryptoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCryptoList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cryptos');
      setCryptoList(response.data);
    } catch (error) {
      console.error('Failed to fetch crypto list:', error);
      setErrorMessage('Failed to load cryptocurrencies.');
    }
  };

  useState(() => {
    fetchCryptoList();
  }, []);

  const handleAddCrypto = async () => {
    try {
      await axios.post('http://localhost:3000/cryptos', { name: cryptoName });
      fetchCryptoList();
      setCryptoName('');
    } catch (error) {
      console.error('Error adding crypto:', error);
      setErrorMessage('Failed to add cryptocurrency.');
    }
  };

  const handleDeleteCrypto = async id => {
    try {
      await axios.delete(`http://localhost:3000/cryptos/${id}`);
      fetchCryptoList();
    } catch (error) {
      console.error('Error deleting crypto:', error);
      setErrorMessage('Failed to delete cryptocurrency.');
    }
  };

  return (
    <div className="text-white bg-gray-900 min-h-screen m-0 box-border">
      {' '}
      <Header />
      <div className="admin-content bg-gray-800">
        {' '}
        <h1 className="m-5 ml-0 self-center text-3xl whitespace-nowrap dark:text-whitee">
          Admin Dashboard
        </h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="flex flex-row items-center">
          {' '}
          <input
            type="text"
            placeholder="Enter crypto name"
            value={cryptoName}
            onChange={e => setCryptoName(e.target.value)}
            className="bg-gray-50 mt-6 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-full" // Ajoutez h-full ici
          />
          <button
            onClick={handleAddCrypto}
            className="ml-12 w-1/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-full" // Ajoutez h-full ici
          >
            Add Crypto
          </button>
        </div>
        <div>
          <ul className="admin-list">
            {' '}
            {cryptoList.map(crypto => (
              <li className="text-blue-500 font-semibold" key={crypto._id}>
                {crypto.name}
                <button
                  onClick={() => handleDeleteCrypto(crypto._id)}
                  className="ml-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
