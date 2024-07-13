import React from 'react';
import { useParams } from 'react-router-dom';
import "../viewreview.css"
import useGet from '../../customhooks/useGet';
const ViewReview = () => {
  const { interviewid } = useParams();
  let allResponse = useGet(`http://localhost:3000/dashboard/getinterview/${interviewid}`);
  console.log(allResponse);
  return (
    <div>
      <div className="faqs maxWidth" id="faqsection">
        {/* <h1>Interview ID: {interviewid}</h1> */}
        <div className="accordion">
          {
             (allResponse==null || allResponse.length == 0) ?(
              <h1 style={{textAlign : "center"}}>No Response Recorded</h1>
             ):
              allResponse.map(e => {
                return (
                  <div key={e.response_id} className="accordion-item" >
                    <div className="accordion-button" onClick={(e) => {
                      // e.target.parentElement
                    console.log(e.target.parentElement.lastChild.classList.toggle('active'));
                  }}>
                      <p>{e.question}</p>
                      <span className="material-symbols-outlined arrow">
                        expand_more
                      </span>
                    </div>
                    <div className="accordion-content">
                      <InnerContent obj={e} />
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>

      {/* You can use the interviewid in your component logic here */}
    </div>
  );
};

function InnerContent({obj}) {
  return (
    <>
      <p> <b>Your Response</b> : {obj.textResponse} </p>
      <p> <b>Your Score</b> : {obj.score} </p>
      <p> <b>Best Answer</b> : {obj.bestAnswer} </p>
      <big><p> <b>Reviews</b></p></big>
      <p> <b>Mistake</b> :{obj.review[0].mistake} </p>
      <p> <b>Solution</b> :{obj.review[0].solution} </p>

      <p> <b>Mistake</b> :{obj.review[1].mistake} </p>
      <p> <b>Solution</b> :{obj.review[1].solution} </p>

      <p> <b>Mistake</b> :{obj.review[2].mistake} </p>
      <p> <b>Solution</b> :{obj.review[2].solution} </p>

    </>
  )
}

export default ViewReview;
