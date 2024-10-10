import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Quiz } from "./pages";
import { Login, Register } from "./pages/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Fixed typo */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<div>Page Not Found</div>} />{" "}
        {/* Handle unknown routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
