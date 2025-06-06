import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const Login = () => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [rememberme, setrememberme] = useState(false);
  const Navigate = useNavigate();


  const fetchData = async () => {

    if (attempts >= 3) {
      toast.error(`Too many failed attempts! Try again later.`, { duration: 2000 });
      after3Min();
      return;
    }

    const userData = {
      username,
      password
    }

    const hasErrors = Object.keys(userData).some((key) => userData[key] === '');
    if (hasErrors) {
      toast.error('Please fill the form correctly');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/user/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.data);
      if (response.data.token) {
        sessionStorage.setItem("authtoken", response.data.token);
        sessionStorage.setItem("role", jwtDecode(response.data.token).roles)
        sessionStorage.setItem("Id", jwtDecode(response.data.token).userId)
        sessionStorage.setItem("leftsliter", true);
        toast.success(`Welcome user`, { duration: 2000 });
        setAttempts(0);
        Navigate("/");
      }
    } catch (err) {
      // console.log(err);
      toast.error(`Invaild credentials`, { duration: 2000 });
      setAttempts(prev => prev + 1);
    }
  }

  const after3Min = () => {
    setTimeout(() => {
      setAttempts(0);
    }, 180000)
  }

  return (
    <div className="Out-Frame">
      <div className="In-Frame">
        <h1 className="login-title">Log in</h1>
        <div className="fieldDiv">
          <label htmlFor="userid">Username:</label>
          <input type="text" id="userid" name="userid" onChange={(e) => { setusername(e.target.value) }} />
        </div>
        <div className="fieldDiv">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={(e) => { setpassword(e.target.value) }} />
        </div>
        <div className="rememberDiv">
          <input type="checkbox" name="rememberme" onChange={(e) => { setrememberme(e.target.value) }} />
          Remember me
        </div>
        <div className="buttonDiv">
          <button className="submitBn" onClick={fetchData}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
