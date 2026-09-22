
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Aboutus from './components/about';
import Contactus from './components/contact';
import AddEmp from './components/addemp'
import EmpList from './components/emplist'
function App() {

  return (
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/new-emp" element={<AddEmp />} />
        <Route path="/emp-list" element={<EmpList />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
