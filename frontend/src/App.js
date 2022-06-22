import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Discover from './pages/Discover'
import MyList from './pages/MyList'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import Info from './pages/Info'
// import SeachList from './pages/SearchList'



function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/mylist' element={<MyList />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/info' element={<Info />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
