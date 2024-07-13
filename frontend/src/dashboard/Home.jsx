import { useEffect } from "react";
import useGet from "../customhooks/useGet";
import Table from "./Interviews/Table";
import '../table.css'
import { Outlet, Link } from "react-router-dom";

function Home({ text }) {

    let Interviews = useGet('http://localhost:3000/dashboard/allinterview');
    console.log(Interviews);
    return <>
        {
            (Interviews==null || Interviews.length == 0) ?(<NoInterview />): (<Table Interview={Interviews} />)
        }

    </>
}

function NoInterview() {
    return (
        <>
            <div className="nointerviewcontainer">
                <div>
                    <p>Ready to ace your next interview? Click 'Start practicing' to begin practicing and boost your confidence for any challenge ahead!</p>
                    <button className="button-82-pushable" role="button">
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <Link className="button-82-front text" to="/dashboard/playground">Start practicing</Link>
                    </button>

                </div>
            </div>
        </>
    );
}



export default Home;