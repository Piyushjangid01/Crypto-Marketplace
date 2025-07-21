import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'
const Home = () => {
    const{allCoin,currency} = useContext(CoinContext)
    const[displayCoin,setDisplayCoin] = useState([])
    const [input, setinput] = useState("")

 const inputHandler = (event)=>{
   setinput(event.target.value)
   if (event.target.value==="") {
    setDisplayCoin(allCoin)
   }
 }
 const searchHandler = async (event) => {
    event.preventDefault()
    const coins =  await allCoin.filter((item)=>{
       return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
 }
    useEffect(()=>{
        setDisplayCoin(allCoin);
    },[allCoin])

return (
    <div className=" px-4 pb-24 ">
      {/* Hero Section */}
      <div className=" max-w-[600px] mx-auto mt-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-[max(4vw,36px)] font-bold leading-tight mt-16">
          Largest <br /> Crypto MarketPlace
        </h1>
        <p className="text-gray-300 leading-relaxed w-3/4">
          Welcome to the world’s largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form
          onSubmit={searchHandler}
          className="flex items-center gap-3 p-2 w-4/5 bg-white rounded-md"
        >
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
            className="flex-1 w-full  px-2 text-black text-sm outline-none border-none"
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-2 text-sm rounded-md hover:bg-purple-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
  
      {/* Crypto Table Section */}
      <div className="crypto-table max-w-[800px] mx-auto mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
        {/* Table Header */}
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="market-cap text-right">Market Cap</p>
        </div>
        {/* Table Rows */}
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            key={index}
            className="table-layout "
          >
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-2">
              <img src={item.image} alt={item.name} className="w-9" />
              <p>{`${item.name} - ${item.symbol.toUpperCase()}`}</p>
            </div>
            <p>
              {currency.symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={`text-center ${
                item.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className="market-cap text-right">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
  
}

export default Home