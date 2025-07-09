
import './App.css'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Services from './routes/Services'
import Contact from './routes/Contact'
import Seat from './component/seat'
import Theatre from './component/Theatre'
import Payment from './component/Payment'
import CardPaymentForm from './component/CardPayment'
import Ticket from './component/ticket'



function App() {
  return (
   <div className='App'>
    <Routes>
    <Route path='/maxbookings' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Services' element={<Services/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Seat' element={<Seat/>} />
        <Route path='/Theatre' element={<Theatre/>}/> 
        <Route path="/payment" element={<Payment />} />    
        <Route path="/CardPaymentForm" element={<CardPaymentForm />} />    
        <Route path="/ticket" element={<Ticket />} />    
    </Routes>
    

   </div>
  
     
    
  )
}

export default App
