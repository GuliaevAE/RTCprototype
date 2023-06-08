
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Calculator from './pages/Calculator/Calculator';
import Catalog from './pages/Catalog/Catalog';
import Header from './components/Header';
// import Catalog_dinamicPage from './pages/Catalog/Catalog_dinamicPage';

function App() {

  return (
    <>
      <Router>
        <Header />
        <main className='mt-[6vmin]'>
          <Routes >
            <Route path="/" element={<Calculator />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:itemId" element={<Calculator />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
