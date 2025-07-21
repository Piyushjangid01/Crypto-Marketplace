
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './Components/Footer/Footer'
function App() {
  

  return (
    <>
    <div className='min-h-screen text-white bg-gradient-to-b from-[#0b004e] via-[#1d152f] to-[#002834]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:coinId' element={<Coin/>} />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
