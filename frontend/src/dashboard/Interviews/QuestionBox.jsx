import { useEffect, useState } from "react";
import LoaderDotes from "../loaders/LoaderDotes";
import useGet from "../../customhooks/useGet";
import { useRecoilState } from "recoil";
import { currQuestionState } from "../../store";
import Audioloader from "../loaders/Audioloader";
import Nextquestionloader from "../loaders/Nextquestionloader";
import { Outlet, useNavigate } from "react-router-dom";



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";



function QuestionBox({ interview_id, question_id }) {
    const navigate = useNavigate();
    const currQuestion = useGet(`http://localhost:3000/dashboard/getquestion/${question_id}`);
    console.log(currQuestion)
    let [currQuestionNo, setCurrQuestionNo] = useRecoilState(currQuestionState);

    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

    let [loaderFlagOnSubmit,setLoaderFlagOnSubmit] = useState(false);
    useEffect(() => {
        handleListen();
    }, [isListening]);

    const submitans =async ()=>{
        if(note==null){
            alert("Please Ansewer this Question if You Dont Know the ans then also you have to tell that...");
            return;
        }
        setLoaderFlagOnSubmit(true);

        let body = {
            "question_id" : question_id,
            "interview_id" : interview_id ,
            "audioUrl":"url",
            "textResponse" : note
        }
        const response = await fetch('http://localhost:3000/dashboard/submitresponse', {
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
            }
            setCurrQuestionNo(currQuestionNo + 1);
            setNote(null);
            setLoaderFlagOnSubmit(false);
            if(currQuestionNo==4){
                navigate("/dashboard/thankyou")
            }
        }).catch(error => {
            console.error('Error parsing JSON:', error);
            setLoaderFlagOnSubmit(false);
        });
    }


    const handleListen = () => {
        if (isListening) {
            mic.start();
            mic.onend = () => {
                console.log("continue..");
                mic.start();
            };
        } else {
            mic.stop();
            mic.onend = () => {
                console.log("Stopped Mic on Click");
            };
        }
        mic.onstart = () => {
            console.log("Mics on");
        };

        mic.onresult = (event) => {
            console.log('count');
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            console.log(transcript);
            setNote(transcript);
            mic.onerror = (event) => {
                console.log(event.error);
            };
        };
    };
    function HtmlBodyofQuestionbox({ category, question }) {
        return (
            <>
                <div className="questioncontainer">
                    <div className="questionbox">
                        <div className="boxlabel">
                            <div className="questioncategory"><small>{category}</small></div>
                            <small>{currQuestionNo + 1}/5</small>
                        </div>
                        <div className="questiondisplay">
                            <p> {question}</p>
                        </div>
                        <div className="translatetextbox">
                            {isListening ? <div className="recordinglader" ><Audioloader /></div> : ""}
                            <div className="transaltetext">{note?note:"No answer detected. "}</div>
                        </div>
                        <div className="btnrow">
                            <button className="actionbtn" type="button" onClick={() => {
                                setIsListening((prevState) => !prevState)
                            }} >{
                                isListening ? <Donebtn /> : <Micbtn />
                                }</button>

                            <button className="nextquestionbtn" type="button" onClick={() => {
                                submitans();
                            }} >
                                {loaderFlagOnSubmit?<Nextquestionloader/>:<span className="material-symbols-outlined">arrow_right_alt</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return <>
        {/* <h1>Current ring Interview {interview_id} this is Questionbox</h1> */}
        {
            currQuestion ? (
                <div>
                    <HtmlBodyofQuestionbox question={currQuestion.question} category={currQuestion.category} />
                </div>
            ) : (
                <LoaderDotes msg="Loading..." />
            )
        }

    </>
}


function Micbtn() {
    return (
        <>
            <span className="material-symbols-outlined">mic</span>
            <p>Answer</p>
        </>
    )
}

function Donebtn() {
    return (
        <>
            <span className="material-symbols-outlined">check</span>
            <p>Done</p>
        </>
    )
}


export default QuestionBox;