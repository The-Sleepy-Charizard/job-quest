import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Homepage from './routes/Homepage.tsx'
import Dashboard from './routes/Dashboard.tsx'

function App() {
  const [ username, setUsername ] = useState('');
  return (
    <Routes>
      <Route path='/' element={<Homepage username={username} setUsername={setUsername}/>}/>
      <Route path='/dashboard' element={<Dashboard username={username}/>}/>
    </Routes>
  )
}

export default App;
