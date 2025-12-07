import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SelectButton from './SelectButton';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

// Chart.js v3 imports & registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginTop: 25,
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid grey',
}));

export default function CoinInfo() {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  // Fetch coin meta
  useEffect(() => {
    if (!id) return;
    const fetchCoin = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  // Fetch historical prices
  useEffect(() => {
    if (!id) return;
    const fetchHistoricData = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        { params: { vs_currency: currency, days } }
      );
      setHistoricData(data.prices);
    };
    fetchHistoricData();
  }, [id, days, currency]); // 👈 include currency

  if (!coin?.market_data) return <CircularProgress style={{ color: 'gold' }} />;

  return (
    <Container>
      {/* -------- sidebar -------- */}
      <Sidebar>
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: 20 }}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" style={{ width: '100%', padding: 25, paddingBottom: 15 }}>
          {parse(coin.description.en.split('. ')[0])}.
        </Typography>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          Rank:&nbsp;{coin.market_cap_rank}
        </Typography>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          Current Price:&nbsp;
          {symbol}
          {coin.market_data.current_price[currency.toLowerCase()].toLocaleString()}
        </Typography>
        <Typography variant="h5">
          Market Cap:&nbsp;
          {symbol}
          {coin.market_data.market_cap[currency.toLowerCase()].toLocaleString()}
        </Typography>
      </Sidebar>

      {/* -------- chart -------- */}
      <div style={{ width: '70%', padding: 40 }}>
        {!historicData.length ? (
          <CircularProgress style={{ color: 'gold' }} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((d) => {
                  const date = new Date(d[0]);
                  return days === 1
                    ? date.toLocaleTimeString()
                    : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((d) => d[1]),
                    label: `Price (Past ${days} Day${days > 1 ? 's' : ''}) in ${currency}`,
                    borderColor: 'gold',
                  },
                ],
              }}
              options={{
                elements: { point: { radius: 1 } },
              }}
            />
            <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
              {[1, 7, 30, 90, 365].map((d) => (
                <SelectButton key={d} selected={d === days} onClick={() => setDays(d)}>
                  {d === 1 ? '24H' : `${d}D`}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
