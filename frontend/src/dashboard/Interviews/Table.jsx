import { Outlet, useNavigate } from "react-router-dom";

function Table({ Interview }) {
    const navigate = useNavigate();

    return (<>
        <div className="container">
            <h2>Interview History</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Review Link</div>
                    <div className="col col-4">Score</div>
                </li>
                {
                    Interview.map((obj) => (
                            <li className="table-row" key={obj.interview_id} >
                                <div className="col col-2" data-label="Date">{obj.startTime}</div>
                                <div className="col col-3 openlink" data-label="Review Link" onClick={(e)=>{
                                    navigate(`/dashboard/viewreview/${obj.interview_id}`);
                                }} >Open Review</div>
                                <div className="col col-4" data-label="Score">{obj.score}</div>
                            </li>
                    ))
                }
            </ul>
        </div>
    </>);
}

export default Table;