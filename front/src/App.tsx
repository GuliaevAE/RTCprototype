import { useState } from 'react'

import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import FirstStep from './pages/FirstStep/FirstStep';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Router> */}
        <Header></Header>
        <main className=''>
        <FirstStep />
          {/* <Routes > */}
            {/* <Route path="/" element={<FirstStep />} /> */}
          {/* </Routes> */}
        </main>
      {/* </Router>  */}
      </>
  )
}

export default App
