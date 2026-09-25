
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Aboutus from './components/about';
import Contactus from './components/contact';
import AddEmp from './components/addemp'
import EmpList from './components/emplist'
import EmpGrid from './components/empgrid'
import EmpAdvanceGrid from './components/empadvancegrid'
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
        <Route path="/emp-grid" element={<EmpGrid />} />
        <Route path="/emp-advance-grid" element={<EmpAdvanceGrid />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
