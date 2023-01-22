import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './Components/Header';
import Footer from "./Components/Footer";

function App() {
  return (
    <>
    <Router>
      <div className='m-auto'>
        <Header />
        <div className="container">
        <Routes>
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Register' element={<Registration/>} />
        </Routes>
        </div>
      </div>
    <Footer />
    </Router>
    </>
    );
}

export default App;
