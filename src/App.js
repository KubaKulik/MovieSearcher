import { Routes, Route } from "react-router-dom";
import Nav from "./components/views/Nav/Nav";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Films from "./components/Pages/FIlms/Films";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/Login/" element={<Login />} />
        <Route path="/Register/" element={<Register />} />
        <Route path="/Films/*" element={<Films />} />
      </Routes>
    </main>
  );
}

export default App;
