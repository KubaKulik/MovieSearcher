import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/views/Nav/Nav";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import Films from "./components/Pages/FIlms/Films";
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main>
      <Nav loggedIn={loggedIn} />
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/films/*" element={loggedIn ? <Films /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
      </Routes>
    </main>
  );
}

// Komponent wylogowania
function Logout({ setLoggedIn }) {
  // Wylogowanie użytkownika
  setLoggedIn(false);
  // Przekierowanie na stronę logowania
  window.location.href = "/login";
  // Możesz również zamiast przekierowania użyć np. historii przeglądarki do nawigacji
  // history.push("/login");
  return null;
}

export default App;
