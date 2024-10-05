import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Quiz } from "./pages";
import { Login, Register } from "./pages/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
