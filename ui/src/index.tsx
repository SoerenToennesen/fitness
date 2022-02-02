import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {Home} from './Components/Home';
import {Dashboard} from './Components/Dashboard';
import {Department} from './Components/Department';
import {Employee} from './Components/Employee';
import {Navbar, NavItem} from './Containers/Navbar';
import {Sidebar} from './Containers/Sidebar';
import { DropdownMenu } from './Containers/Dropdown';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

import { ReactComponent as BellIcon } from './Photos/bell.svg';
import { ReactComponent as MessengerIcon } from './Photos/messenger.svg';
import { ReactComponent as PlusIcon } from './Photos/plus.svg';
import { ReactComponent as CaretIcon } from './Photos/caret.svg';

//Make the below to seperate pages
const Content = () => {
  return <h1>Content</h1>
}
const Courses = () => {
  return <h1>Content/Courses</h1>
}
const Videos = () => {
  return <h1>Content/Videos</h1>
}
const Design = () => {
  return <h1>Design</h1>
}

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
              <Dashboard />
            </Route>
            <Route exact path="/department" component={Department} />
            <Route exact path="/employee" component={Employee} />
            <Route exact path="/content">
              <Content />
            </Route>
            <Route path="/content/courses">
              <Courses />
            </Route>
            <Route path="/content/videos">
              <Videos />
            </Route>
            <Route path="/design">
              <Design />
            </Route>
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
              <NavLink className="btn btn-light btn-outline-primary" to="/department">
                Department
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/department' component={Department}/>
          <Route path='/employee' component={Employee}/>
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
