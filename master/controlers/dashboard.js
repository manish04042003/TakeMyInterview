const { User, Question, Interview, Response } = require('../schema');
const mongoose = require('mongoose');
const { evaluateMockInterview } = require('../gemini/gemini')

const uploadQuestion = async (req, res) => {
    let { question, category, level } = req.body;
    let q = new Question({ question, category, level });
    await q.save().then(() => {
        res.status(200).json({
            message: "success",
            data: q
        })
    }).catch((e) => {
        console.log(e);
        res.status(500).json({
            message: "error",
            error: e
        })
    })
}

const giverandomQuestion = async () => {
    let sampledDocs = await Question.aggregate([{ $sample: { size: 5 } }]);
    sampledDocs = sampledDocs.map(doc => doc._id.toHexString());
    let questionAndResponseSet = [];
    // console.log(sampledDocs);
    for (let i in sampledDocs) {
        let currobj = { question: sampledDocs[i], response: null };
        questionAndResponseSet.push(currobj);
    }
    // console.log(questionAndResponseSet);
    return questionAndResponseSet
}

const createInterview = async (req, res) => {
    let { userid } = req.data;
    let interview_id = new Date().getTime();
    let questionAndResponseSet = await giverandomQuestion();
    let currtime = new Date();
    let options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    startTime = new Intl.DateTimeFormat('en-IN', options).format(currtime);
    console.log(questionAndResponseSet);
    let currInterview = new Interview({ interview_id, userid, questionAndResponseSet, startTime });
    await currInterview.save().then(() => {
        res.status(200).json({
            message: "success",
            data: currInterview
        })
    }).catch((e) => {
        console.log(e);
        res.status(500).json({
            message: "error",
            error: e
        })
    })

}

const submitresponse = async (req, res) => {

    try {
        let { userid } = req.data;
        let response_id = new Date().getTime();
        let { question_id, interview_id, audioUrl, textResponse } = req.body;
        const ObjectId = mongoose.Types.ObjectId;
        let currQues = await Question.findOne({ _id: new ObjectId(`${question_id}`) });
        let question = currQues.question;
        // let score = 1, review= [], bestAnswer = "";
        let ansobj = await evaluateMockInterview(question, textResponse);
        console.log(ansobj);
        let score = ansobj.score;
        let review = ansobj.review;
        let bestAnswer = ansobj.bestAnswer;
        console.log(score, review, bestAnswer);
        console.log("gemini Answer created successfully........");
        console.log("Creating Response........");
        // creating Response
        let currResponse = new Response({
            response_id,
            userid,
            question_id,
            question,
            interview_id,
            score,
            review,
            bestAnswer,
            textResponse,
            audioUrl
        });

        await currResponse.save();
        console.log("Response Created Successfully........");

        let currInterview = await Interview.findOne({ interview_id });

        if (!currInterview) {
            return res.status(404).json({
                message: "error",
                error: "Interview not found"
            });
        }

        let newquestionAndResponseSet = currInterview.questionAndResponseSet.map(obj => {
            if (obj.question == question_id) {
                obj.response = response_id;
            }
            return obj;
        });

        // Use findByIdAndUpdate to ensure atomic update
        let updatedInterview = await Interview.findByIdAndUpdate(
            currInterview._id,
            { $set: { questionAndResponseSet: newquestionAndResponseSet, score: currInterview.score + score } },
            { new: true }
        );

        if (!updatedInterview) {
            return res.status(500).json({
                message: "error",
                error: "Failed to update interview"
            });
        }

        console.log("Interview Updated Successfully........");

        return res.status(200).json({
            message: "success",
            data: updatedInterview
        });

    } catch (e) {
        console.error("There is some error while processing the request", e);
        return res.status(500).json({
            message: "error",
            error: e
        });
    }
}

const getAllInterview = async (req, res) => {
    let { userid } = req.data;
    await Interview.find({ userid }).then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    });
}

const getinterview = async (req, res) => {
    let interview_id = req.params.interview_id;
    await Response.find({ interview_id }).then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    });
}

const getresponse = async (req, res) => {
    let { response_id } = req.body;

    await Response.find({ response_id }).then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    });
}

const checkeligibility = async (req, res) => {
    try {
        let { userid } = req.data;
        let user = await User.findOne({ userid });
        let timePeriod = 7 * 24 * 60 * 60 * 1000; // seven day
        if (user.isSubscribed) {
            timePeriod = timePeriod / 7; // one day
        }

        const now = new Date().getTime();
        const lastValidTime = now - timePeriod;

        if (!user.lastMockInterview || user.lastMockInterview < lastValidTime) {
            res.status(200).json({
                message: "success",
                eligibility: true
            })
        } else {
            res.status(500).json({
                message: "success",
                eligibility: false
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "error",
            error: e
        })
    }

}

const getquestion = async (req, res) => {
    const question_id = req.params.question_id;
    const ObjectId = mongoose.Types.ObjectId;
    await Question.findOne({ _id: new ObjectId(`${question_id}`) }).then((data) => {
        res.status(200).json({
            message: "success",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "error",
            error: err
        })
    });
}


module.exports = { createInterview, uploadQuestion, submitresponse, getAllInterview, getinterview, getresponse, checkeligibility, getquestion };