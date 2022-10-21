import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Discover from './pages/Discover'
import MyList from './pages/MyList'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import Info from './pages/Info'
import SearchListPage from './pages/SearchListPage'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Router>
        <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/mylist' element={<MyList />} />
            <Route path='/discover' element={<Discover />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/info' element={<Info />} />
            <Route path='/searchpage' element={<SearchListPage />} />
          </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
