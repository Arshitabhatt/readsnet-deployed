import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/navbar'
import UpcomingList from './components/Upcoming.component'
import AddEvent from './components/Add.component'
import ShowEvent from './components/Show.component'
import SingleEvent from './components/Single.component'

function App() {
  return (
    <Router>
      <Navbar />
      <br />
     <Route path="/" exact component={UpcomingList} />
     <Route path="/twiceread" exact component={ShowEvent} />
     <Route path='/twiceread/:id' exact component={SingleEvent} />
     <Route path="/addevent" exact component={AddEvent} />
    </Router>
  );
}

export default App;
