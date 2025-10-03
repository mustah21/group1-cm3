import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import Signup from './pages/Signup';
import Login from './pages/Login';


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
