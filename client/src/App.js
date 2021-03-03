import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PrivilegedPage from './components/PrivilegedPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/privileged" component={PrivilegedPage} />
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
