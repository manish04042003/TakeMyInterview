import { useEffect, useState } from "react";
import LoaderDotes from "../loaders/LoaderDotes";
import QuestionBox from "./QuestionBox";
import { currQuestionState } from "../../store";
import { useRecoilState } from "recoil";

function PlayGround (){
    // let [Interview,setInterview]  = useState({
    //         "interview_id": "1720346075297",
    //         "userid": "1720080357525",
    //         "questionAndResponseSet": [
    //             {
    //                 "question": "66844bd918ab1b936fcdbdb5",
    //                 "response": null
    //             },
    //             {
    //                 "question": "66844c22f18ca398b079f7f1",
    //                 "response": null
    //             },
    //             {
    //                 "question": "66844c63f18ca398b079f7f5",
    //                 "response": null
    //             },
    //             {
    //                 "question": "66844d0bf18ca398b079f7ff",
    //                 "response": null
    //             },
    //             {
    //                 "question": "6684532df18ca398b079f807",
    //                 "response": null
    //             }
    //         ],
    //         "startTime": "2024-07-07T09:54:35.328Z",
    //         "score": 0,
    //         "_id": "668a65dbb3540d5107243418",
    //         "__v": 0
    //     });
    

    let [Interview,setInterview] = useState(null);
    
    let [currQuestionNo,setCurrQuestionNo] = useRecoilState(currQuestionState);
    console.log(currQuestionNo)
    useEffect(()=>{
        const CreateInterview = async () => {
            const response = await fetch('http://localhost:3000/dashboard/createinterview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                }
            });
            response.json().then(data => {
                if (data.message == "success") {
                    console.log(data);
                    localStorage.setItem('currQuestion',0);
                    setInterview(data.data);
                }
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }
        CreateInterview();
        console.log("Interview Created")
    },[])

    return <>
        <h1>this is play ground</h1>
        {
           Interview==null?(<LoaderDotes msg="Loading..."/>) :(
            <QuestionBox interview_id={Interview.interview_id} question_id={Interview.questionAndResponseSet[currQuestionNo].question} />
           )
        }
        
    </>
}


export default PlayGround;