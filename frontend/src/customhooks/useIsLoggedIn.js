import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginstate } from "../store";
import { useEffect, useState } from "react";



function useIsLoggedIn() {
    const [loding, setLoding] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginstatevalue,setloginstatevalue] = useRecoilState(isLoginstate);

    useEffect(()=>{
        const checktoken = async () => {
            let token = localStorage.getItem("token");
            
            if (token == null || token == "" || token == "null") {
                setIsLoggedIn(false);
                setloginstatevalue(false);
                setLoding(false);
            } else {
                const response = await fetch('http://localhost:3000/islogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
    
                response.json().then(data => {
                    if (data.message == "success") {
                        console.log(data);
                        setIsLoggedIn(true)
                        setloginstatevalue(true);
                    } else {
                        setIsLoggedIn(false)
                        setloginstatevalue(false)
                    }
                    setLoding(false);
                }).catch(error => {
                    setIsLoggedIn(false)
                    console.error('Error parsing JSON:', error);
                    setLoding(false);
                    setloginstatevalue(false);
                });
    
            }
            
        }

        checktoken();
        console.log(isLoggedIn);
    
    },[loginstatevalue])
 
    return { loding, isLoggedIn }
}

export default useIsLoggedIn