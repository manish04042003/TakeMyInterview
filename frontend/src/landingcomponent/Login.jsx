import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isLoginstate } from '../store';


function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState(null);
  const [isLogin, setLoginState] = useRecoilState(isLoginstate);
  const navigate = useNavigate();




  console.log(isLogin)
  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      response.json().then(data => {
        console.log(data);

        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          setLoginState(true)
          console.log(isLogin)
          console.log('Login successful!');
          navigate('/dashboard'); // Redirect to login
        } else {
          setLoginState(false);
          alert(data.message);
          return;
        }
      }).catch(error => {
        // Handle parsing error
        console.error('Error parsing JSON:', error);
      });
      // Successful login logic (e.g., store token in local storage, redirect)

    } catch (error) {
      setError(error.message);
    }
  }

  return <>
    <div className="loginandsignup">
      <form onSubmit={login}>
        <h1>Login</h1>
        <p>Email</p>
        <input type="email" onChange={(e) => {
          setemail(e.target.value);
        }} value={email} />

        <p>Password</p>
        <input type="password" onChange={(e) => {
          setpassword(e.target.value);
        }} value={password} />
        <button type="submit">Login</button>
      </form>
    </div>
  </>
}

export default Login;