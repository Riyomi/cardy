import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const brand = 'cardy';
const copyright = '©2021 All rights reserved.';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar brand={brand} />
        <div id="content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile/:id" component={ProfilePage} />
          </Switch>
        </div>
        <Footer brand={brand} copyright={copyright} />
      </div>
    </Router>
  );
};

export default App;
