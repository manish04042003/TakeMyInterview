import { Outlet, Link } from "react-router-dom";
function Logo(){
    return(
        <Link className="logo" to="/"><h1>MockGuru</h1></Link>
    );
}

export default Logo