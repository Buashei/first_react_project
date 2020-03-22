import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//scss
import './reset.scss';
import Error404 from './pages/404/index';
import Navigation from './components/Navigation/Navigation'
import Home from './pages/Home/index'
import Cores from './pages/Cores/index';
import Capsules from './pages/Capsules/index';
import History from './pages/History/index';
import LandingPads from './pages/LandingPads/index';
import Launches from './pages/Launches';
import SingleLaunches from './pages/Launches/singlelaunch';
import Rockets from './pages/Rockets/index';
import SingleRockets from './pages/Rockets/singlerocket';
import LaunchPads from './pages/LaunchPads/index';

//ROUTER
function App() {
  return (
    <Router>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cores" component={Cores} />
      <Route exact path="/capsules" component={Capsules} />
      <Route exact path="/history" component={History} />
      <Route exact path="/landpads" component={LandingPads} />
      <Route exact path="/launches" component={Launches} />
      <Route exact path="/launches/:single_launch" component={SingleLaunches} />
      <Route exact path="/rockets" component={Rockets} />
      <Route exact path="/rockets/:single_rocket" component={SingleRockets} />
      <Route exact path="/launchpads" component={LaunchPads} />
      <Route exact path="*" component={Error404} />
    </Switch>
  </Router>
  );
}

export default App;
