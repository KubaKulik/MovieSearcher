import { Routes, Route } from 'react-router-dom';
import Nav from "./components/views/Nav/Nav";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/Login/" element={<Login />} />
        <Route path="/Register/*" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
