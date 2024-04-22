import { Routes, Route } from 'react-router-dom';
import Nav from "./components/views/Nav/Nav";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import { Axios } from 'axios';

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/Login/" element={<Login />} />
        <Route path="/Register/*" element={<Register />} />
        <Route path="/Films/*"/>
      </Routes>
    </main>
  );
}

export default App;
