import { Outlet, Link } from "react-router-dom";
import mockguruimage from '../../public/mockguru.png'
import '../landingpage.css'
function Maincontent() {
   return <>
      <div className="landingcontent">
         <div>
            <h1>Supercharge your next job interview</h1>
            <p>Master your job interviews with MockGuru - the ultimate tool for tailored mock interviews, instant feedback, and strategic advice to secure your next career opportunity.</p>
         </div>
         <button className="button-82-pushable" role="button">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <Link className="button-82-front text" to="/dashboard/playground">Start practicing</Link>
         </button>
         <div className="imagediv">
            <img src={mockguruimage} alt="" />
         </div>
      </div>
   </>
}

export default Maincontent;