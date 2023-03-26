import React, { useState  } from 'react';
import './App.css';
import LandingPage from './components/Landing_page';
import PostView from './components/Postview';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload"
const API_KEY = process.env.REACT_APP_API || "http://localhost:3001"

const App = ()=>{
  const [userData , setuserData] = useState([])


    fetch(API_KEY +"/post")
    .then((res)=>{
      return res.json()
    }).then((data)=>{
     
      setuserData(data)
    }).catch((err)=>{
      console.log(err)
    })
 

 
return(
    <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<LandingPage/>}/>
   <Route path='/login' element={<PostView data={userData}/>}/>
   <Route path='/Post' element={<Upload/>}/>
   </Routes>
   </BrowserRouter>
   </>
)
}


export default App