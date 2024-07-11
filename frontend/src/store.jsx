import { atom } from "recoil"

export const isLoginstate = atom({
    key: "loginstatus",
    default : false,
})

export const currQuestionState = atom({
    key: "CuurrentQuestion",
    default : 0,
})
