
import { BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import Signup from "./components/SignupPage/Signup"
import Login from "./components/LoginPage/Login"
import Dashboard from "./components/Dashboard/Dashboard"
import { ToastContainer } from "react-toastify"
function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
