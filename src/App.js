import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Browse from './pages/Browse/Browse';
import DeckDetails from 'pages/DeckDetails/DeckDetails';
import Dashboard from 'pages/Dashboard/Dashboard';
import Study from 'pages/Study/Study';
import CreateDeck from 'pages/CreateDeck/CreateDeck';

const App = () => {
  const brand = 'cardy';

  const DefaultRoutes = () => (
    <>
      <Navbar brand={brand} />
      <div id="content">
        <Switch>
          <Route path="/browse" component={Browse} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/deck/:id" component={DeckDetails} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-deck" component={CreateDeck} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
      <Footer brand={brand} />
    </>
  );

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/study" component={Study} />
          <Route component={DefaultRoutes} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
