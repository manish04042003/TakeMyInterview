import { useEffect, useState } from "react";

function useGet(url) {
    const [res, setRes] = useState(null);
    useEffect(()=>{
        const getData = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                }
            });
            response.json().then(data => {
                if (data.message == "success") {
                    setRes(data.data);
                }
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }
        getData();
    },[url])
 
    return res;
}

export default useGet