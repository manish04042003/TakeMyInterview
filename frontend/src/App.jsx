import React from 'react';
import {
  RecoilRoot
} from 'recoil';



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maincontent from "./landingcomponent/Maincontent"
import Signup from "./landingcomponent/Signup";
import Login from "./landingcomponent/Login";
import ForgetChangePassword from  "./landingcomponent/ForgetChangePassword";
import NoPage from "./landingcomponent/Nopage";
import Dashboard from './dashboard/Dashboard';
import Home from './dashboard/Home';
import Landing from './Landing';
import PlayGround from './dashboard/Interviews/PlayGround';
import Thankyou from './dashboard/Interviews/Thankyou';
import ViewReview from './dashboard/Interviews/ViewReview';



function App() {
  return <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Maincontent />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forget" element={<ForgetChangePassword />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home text="Home" />} />
            <Route path='home' element={<Home text="Home" />} />
            <Route path='playground' element={<PlayGround/>} />
            <Route path='viewreview/:interviewid' element={<ViewReview/>} />
            <Route path='thankyou' element={<Thankyou/>} />

          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>


  </>
}

export default App
