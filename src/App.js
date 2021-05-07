import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Search.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather App</h2>
        <img src='./app-icon.png' alt='Application Icon' vspace='20px' height='200px' width='200px'/>
        <Search/>
      </header>

      <footer className='App-footer'>
        <a href='https://github.com/Laemonz/react-weather-app'>Source Code</a>
      </footer>
    </div>
  );
}

export default App;
