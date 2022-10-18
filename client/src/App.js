import './App.css';
import {Route, Switch} from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' render={()=><Landing />}></Route>
      <Route exact path='/home'><Home /></Route>
      <Route path='/*' render = { () => <NotFound />} />

      </Switch>
      
    </div>
  );
}

export default App;
