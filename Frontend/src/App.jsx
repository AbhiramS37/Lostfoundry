import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Submit from "./Pages/Submit";
import Account from "./Pages/Account";
import Admin from "./Pages/Admin";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={< Admin />} />

      </Routes>
    </Router>
  );
}

export default App;
