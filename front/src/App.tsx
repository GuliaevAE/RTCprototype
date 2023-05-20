
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Header from './components/Header'
import FirstStep from './pages/Calculator/Calculator';

function App() {

  return (
    <>
      <Router>
        <Header/>
        <main className=''>
          <Routes >
            <Route path="/" element={<FirstStep />} />
            <Route path="/asd" element={<div></div>} />
          </Routes>
        </main>
      </Router> 
      </>
  )
}

export default App
