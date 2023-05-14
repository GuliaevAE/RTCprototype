
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Header from './components/Header'
import FirstStep from './pages/FirstStep/FirstStep';

function App() {

  return (
    <>
      <Router>
        <Header></Header>
        <main className=''>
          <Routes >
            <Route path="/" element={<FirstStep />} />
          </Routes>
        </main>
      </Router> 
      </>
  )
}

export default App
