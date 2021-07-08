import React from 'react'
import Login from "./components/LoginFunc"
import Slide from "./components/Slide"
import ProfileFunc from './components/ProfileFunc'
import Photo from "./components/Photo"
import CommentW from "./components/CommentW"
import CommentR from "./components/CommentR"
// import Poll from "./components/Poll"
import {BrowserRouter as Router , Switch , Route} from "react-router-dom"

function App() {
  return (
    <div>
    <Router>
      
      
      <Switch>
      <Route path="/Login"  component={Login}/>
       <Route path="/" exact component={Slide}/>
       <Route path="/profile" exact component={ProfileFunc}  />
       <Route path="/Photo" exact component={Photo}  />
       <Route path="/CommentW" exact component={CommentW}  />
       <Route path="/CommentR" exact component={CommentR}  />
       
       
      </Switch>
      </Router>
      
    </div>
  )
}

export default App

