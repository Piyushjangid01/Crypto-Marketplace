import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import { LineChart } from '../../Components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': "CG-GZU2Hpcc4ugKF6dQ2dthLWvr",
      },
    };
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch coin data');
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': "CG-GZU2Hpcc4ugKF6dQ2dthLWvr",
      },
    };
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch historical data');
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (!coinData || !historicalData) {
    return (
      <div className="">
        <div className=" absolute top-[40%]  left-[40%]  2xl:left-[45%] xl:left-[45%] w-16 h-16  border-4 border-gray-300 border-t-purple-700 rounded-2xl animate-spin mx-auto"></div>
        <div className=" absolute top-[40%]  left-[48%] 2xl:left-[47%] xl:left-[48%] w-16 h-16  border-4 border-gray-300 border-b-purple-700 rounded-2xl animate-spin mx-auto"></div>
      </div>
    );
  }

 
  return (
    <>
      {!coinData || !historicalData ? (
        <div className=" flex justify-center items-center h-[80vh] mt-40">
          <div className= " w-16 h-16 border-4 border-gray-400 border-t-[#4500c6] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="px-5">
          {/* Coin Name Section */}
          <div className="flex flex-col items-center gap-5 mt-20 mb-12">
            <img src={coinData.image.large} alt="Coin" className="max-w-[100px] mt-10" />
            <p>
              <b className=" 2xl:text-4xl text-2xl font-medium">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </b>
            </p>
          </div>
  
          {/* Coin Chart Section */}
          <div className="max-w-[900px] h-[250px] 2xl:h-[25rem] mx-auto">
            <LineChart historicalData={historicalData} />
          </div>
  
          {/* Coin Info Section */}
          <div className="max-w-[600px] mx-auto flex flex-col mt-12">
            <ul className="flex justify-between py-2 border-b border-gray-500 list-none 2xl:text-2xl">
              <li>Crypto Market Rank</li>
              <li>#{coinData.market_cap_rank}</li>
            </ul>
            <ul className="flex justify-between py-2 border-b border-gray-500 list-none 2xl:text-2xl">
              <li>Current Price</li>
              <li>
                {currency.symbol}
                {coinData.market_data.current_price[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className="flex justify-between py-2 border-b border-gray-500 list-none 2xl:text-2xl">
              <li>Market Cap</li>
              <li>
                {currency.symbol}
                {coinData.market_data.market_cap[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className="flex justify-between py-2 border-b border-gray-500 list-none 2xl:text-2xl">
              <li>24 Hour High</li>
              <li>
                {currency.symbol}
                {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul className="flex justify-between py-2 border-b border-gray-500 list-none 2xl:text-2xl">
              <li>24 Hour Low</li>
              <li>
                {currency.symbol}
                {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
  
};

export default Coin;
