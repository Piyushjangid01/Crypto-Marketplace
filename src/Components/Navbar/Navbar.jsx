import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";

function Navbar() {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="  fixed top-0 bg-purple-600 w-full  flex items-center justify-between px-2 md:px-3 lg:px-7 xl:px-12 py-5 text-gray-300 border-b-2 border-gray-700">
      <Link to="/">
        <img className="w-[max(12vw,120px)]" src={logo} alt="Logo" />
      </Link>

      <ul className="hidden md:flex gap-10 list-none xl:text-xl">
        <Link to="/"><li className="cursor-pointer">Home</li></Link>
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">Pricing</li>
        <li className="cursor-pointer">Blog</li>
      </ul>

      <div className="flex items-center gap-[max(1vw,12px)]">
        <select
          onChange={currencyHandler}
          className="px-2 py-1 text-white bg-transparent border-2 border-white rounded-md"
        >
          <option value="usd" className="bg-[#09005c] text-white">
            USD
          </option>
          <option value="eur" className="bg-[#09005c] text-white">
            EUR
          </option>
          <option value="inr" className="bg-[#09005c] text-white">
            INR
          </option>
        </select>
        <button className="flex items-center gap-2 px-6 py-2 text-[15px] font-medium text-gray-900 bg-white rounded-2xl">
          Sign up <img className="w-[13px]" src={arrow_icon} alt="Arrow Icon" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
