import logo from './logo.svg';
import './App.css';
import Fib from './Fib';
import OtherPage from './OtherPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fibo from './Fibo';

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
            fib calculator version 3
          </a>
        </header>
        <Route exact path='/' component={Fib} />
        {/* <Route exact path='/' component={Fibo} /> */}
        <Route path='/otherpage' component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
