import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const Crypto = createContext();

export const CryptoState = () => useContext(Crypto);

export default function CryptoContextProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSymbol(currency === 'INR' ? '₹' : '$');
  }, [currency]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      { params: { vs_currency: currency } }
    );
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
   
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading }}>
      {children}
    </Crypto.Provider>
  );
}
