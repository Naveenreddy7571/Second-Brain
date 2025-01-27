import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Button from "../../Ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginservice } from "../../Services/services";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignin()
  {
    try
    {
      const response = await loginservice({username:email,password:password})
      if(response.status == 200)
      {
        toast.success("Login Sucessful");
        const token = response.data.token || "";
        localStorage.setItem("token",token);
        console.log(localStorage.getItem("token"));
        setTimeout(()=>{
          navigate("/dashboard")
        },500);
      }
    }
    catch(e:any)
    {
      toast.error(e.response.data.msg);
    }
  }
  return (
    <>
    <Navbar 
      buttons={[<Button title="signup" styleType="primary" size="sm" onClick={()=>{navigate("/signup")}}/>]}
    />
    <div className=" flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-[400px] mt-24">
        <h1 className="text-3xl font-bold text-center mb-2">Think it. Make it.</h1>
        <p className="text-gray-600 text-center mb-8">
          Log in to your Second Brain account
        </p>

        <div className="w-full">
          <div className="flex items-center border border-gray-300 rounded-md mb-5 px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-800 "
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md mb-5 px-3 py-2">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-800"
            />
          </div>
        </div>

        <div className="w-full">
          <Button title="Login" styleType="primary" size="sm" onClick={handleSignin}/>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
           </Link> 
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
