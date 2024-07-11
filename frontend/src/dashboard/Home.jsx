import { useEffect } from "react";
import useGet from "../customhooks/useGet";
import Table from "./Interviews/Table";
import '../table.css'

function Home ({text}){

    let Interviews = useGet('http://localhost:3000/dashboard/allinterview');
    console.log(Interviews);
    return <>
        <h1>{text}</h1>
        <h1>this is Dashboard Home content</h1>
        {
            Interviews?(<Table Interview={Interviews}/>):("No Interview")
        }
        
    </>
}


export default Home;