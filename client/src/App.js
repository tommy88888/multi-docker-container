import logo from './logo.svg';
import './App.css';
import Fibo from './Fibo.js';
import OtherPage from './OtherPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            fib calculator version 40
          </a>
        </header>
        <Routes>
          <Route exact path='/' element={<Fibo />} />
          <Route path='/otherpage' element={<OtherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
