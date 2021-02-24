import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Coaches, Students, NewCoach, Coach, Student } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={() => <Home/>}/>
          <Route path="/coaches" exact component={() => <Coaches/>}/>
          <Route path="/students" exact component={() => <Students/>}/>
          <Route path="/newCoach" exact component={() => <NewCoach/>}/>
          <Route path="/coaches/:id" component={Coach}/>
          <Route path="/students/:id" component={Student}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
