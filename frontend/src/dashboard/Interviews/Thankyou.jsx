// import { Outlet, useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";


function Thankyou() {
    // const navigate = useNavigate();
    return <>
        <div className="thankyoupagediv">
            <h2>Thank you for completing your mock interview! We hope this experience has provided you with valuable insights and practice. Your dedication to improving your skills is commendable, and we wish you the best of luck in your future interviews.</h2>
            <br />
            <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <Link className="button-82-front text" to="/dashboard">Go to Dashboard</Link>
            </button>
        </div>
    </>
}

export default Thankyou;