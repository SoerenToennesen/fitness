import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {Home} from './Components/Home';
import {Overview} from './Components/Overview';
import {Nutrition} from './Components/Nutrition/Nutrition';
import {Exercise} from './Components/Exercise/Exercise';
import {Account} from './Components/Account';
import {Navbar, NavItem} from './Containers/Navbar';
import {Sidebar} from './Containers/Sidebar';
import { DropdownMenu } from './Containers/Dropdown';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

import { ReactComponent as BellIcon } from './Photos/bell.svg';
import { ReactComponent as MessengerIcon } from './Photos/messenger.svg';
import { ReactComponent as PlusIcon } from './Photos/plus.svg';
import { ReactComponent as CaretIcon } from './Photos/caret.svg';
import {NutritionHistory} from "./Components/Nutrition/NutritionHistory";
import {ExerciseHistory} from "./Components/Exercise/ExerciseHistory";
import {DummyClass} from "./Components/DummyClass";

function App() {

  const [inactive, setInactive] = useState(false);

  return (
    <BrowserRouter>

        <Sidebar onCollapse={(inactive: any) => {
          setInactive(inactive);
        }} />

        <div className={`container-navbar ${inactive ? "inactive" : ""}`}>
          <Navbar>
            <NavItem icon={<PlusIcon />} />
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<MessengerIcon />} />

            <NavItem icon={<CaretIcon />}>
              <DropdownMenu />
            </NavItem>
          </Navbar>
        </div>

        <div className={`container ${inactive ? "inactive" : ""}`}>
          <Switch>
            <Route exact path="/">
              <Overview />
            </Route>
            <Route exact path="/nutrition" component={Nutrition} />
            <Route exact path="/exercise" component={Exercise} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/exercise/history" component={ExerciseHistory}/>
            <Route exact path="/nutrition/history" component={NutritionHistory}/>
            <Route exact path="/dummyclass" component={DummyClass}/>
          </Switch>
        </div>

        {/*
        <h3 className="d-flex justify-content-center m-3">
          React JS Frontend
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/nutrition">
                Nutrition
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/exercise">
                Exercise
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/account">
                Account
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/nutrition' component={Nutrition}/>
          <Route path='/exercise' component={Exercise}/>
          <Route path='/account' component={Account}/>
        </Switch>*/}
    </BrowserRouter>
  );
}

export default App;






ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
