import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CreateAccount from './pages/login/CreateAccount';
import Header from './components/Header';
import Inventory from './pages/inventory/Inventory';

function App() {
  const [user, setUser] = useState('');

  //layout of possible pages to be directed to with associated files
  return (
    <Router>
        <div className=''>
          <Header user={user} setUser={setUser} />
          <Routes>
           <Route path='/' element={<Home user={user} setUser={setUser}/>} />
            <Route path='/login' element={<Login user={user} setUser={setUser}/>} />
            <Route path='/create-account' element={<CreateAccount user={user} setUser={setUser}/>} />
            <Route path='/inventory' element={<Inventory user={user} setUser={setUser}/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
