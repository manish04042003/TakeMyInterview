import { useEffect, useState } from "react";

function usePost(url,body) {
    const [res, setRes] = useState(null);

    useEffect(()=>{
        const getData = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });

            response.json().then(data => {
                if (data.message == "success") {
                    console.log(data);
                    setRes(data);
                }
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }

        getData();
    
    },[url,body])
 
    return res;
}

export default usePost