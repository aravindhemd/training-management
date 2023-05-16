import './App.css';
import Employee from './components/Employee';
import Header from './components/Header';
import Login from './components/Login';
import {
  BrowserRouter,
  Route,
  Routes
}
  from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <div className="App">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/Employee" element={<Employee />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
