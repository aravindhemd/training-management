import './App.css';
import Employee from './components/Employee';
import Header from './components/Header';
import Login from './components/Login';
import Skill from './components/Skill';
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
            <Route path="/Skills" element={<Skill />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
