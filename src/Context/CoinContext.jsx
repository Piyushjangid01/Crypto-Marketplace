import { createContext, useEffect, useState } from "react";

 export const CoinContext = createContext()
 const CoinContextProvider = (props)=>{
    const[allCoin, setAllCoin] = useState([])
    const[currency,setCurrency] = useState({
        name:"usd",
        symbol:"$"
    })
    const fetchAllCoin = async()=>{
     const options = {
        method:"GET",
        headers:{accepts:"application/json","x-cg-demo-api-key":"CG-GZU2Hpcc4ugKF6dQ2dthLWvr"}
      
     }  
     fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,options)
     .then (Response=>Response.json())
     .then(Response=>setAllCoin(Response))
     .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllCoin();
    },[currency])
    const contextValue = {
      allCoin,currency,setCurrency
    }
    return(
        <CoinContext.Provider value={contextValue}>
          {props.children}
        </CoinContext.Provider>
    )
 }
 export default CoinContextProvider