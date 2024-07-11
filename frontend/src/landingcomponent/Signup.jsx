import { useState } from "react";
import { isLoginstate } from "../store";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";



function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLigin,setLoginState] = useRecoilState(isLoginstate);
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        if (email == '' || name == "" || password == '') {
            alert("Enter Require Field")
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password})
            });

            response.json().then(data => {
                console.log(data);

                if (data.message == "success") {
                    console.log(data.token)
                    localStorage.setItem("token", data.token);
                    setLoginState(true);
                    console.log('Sign Up successful!');
                    navigate('/dashboard'); // Redirect to login
                } else {
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
        <center>
            <form onSubmit={handleSignup} >
                <p>Name :</p>
                <input value={name} type="text" required onChange={(e)=>{
                    setName(e.target.value)
                }} />

                <p>Email :</p>
                <input type="email" value={email} required onChange={(e)=>{
                    setEmail(e.target.value);
                }} />
                <p>Password :</p>
                <input type="password" required value={password}  onChange={(e)=>{
                    setPassword(e.target.value);
                }} />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </center>

    </>
}

export default Signup;