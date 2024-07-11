import { Outlet, useNavigate } from "react-router-dom";

function Thankyou(){
    const navigate = useNavigate();
    return <>
        <h1>Thank you for Completing the Interview Go to Dashboard for the view Reviews of your ans.</h1>
        <button onClick={()=>{
            // console.log('awfe');
            navigate('/dashboard')
        }} >Go to Dashboard</button>
    </>
}

export default Thankyou;