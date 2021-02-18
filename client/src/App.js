import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Details from './pages/Details'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/details/:id">
          <Details/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
