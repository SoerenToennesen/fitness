import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {Overview} from './pages/Overview';
import {Nutrition} from './pages/Nutrition/Nutrition';
import {Exercise} from './pages/Exercise/Exercise';
import {Account} from './pages/Account';
import {Navbar, NavItem} from './components/Navbar';
import {Sidebar} from './components/Sidebar';
import { DropdownMenu } from './components/Dropdown';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import { ReactComponent as BellIcon } from './Photos/bell.svg';
import { ReactComponent as MessengerIcon } from './Photos/messenger.svg';
import { ReactComponent as PlusIcon } from './Photos/plus.svg';
import { ReactComponent as CaretIcon } from './Photos/caret.svg';
import {NutritionHistory} from "./pages/Nutrition/NutritionHistory";
import {ExerciseHistory} from "./pages/Exercise/ExerciseHistory";
import {SpinnerPage} from "./pages/SpinnerPage";
import SignIn, {SignUp} from "./pages/SignIn";

function App() {

  const [inactive, setInactive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  function updateLogin(setLogin: boolean) {
    setIsLoggedIn(setLogin);
  }

  function updateIsSignIn(isSignIn: boolean) {
    setIsSignIn(isSignIn);
  }

  return (
    <BrowserRouter>
        {isLoggedIn ? (
            <div>
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
                        <Route exact path="/signin">
                            <Redirect to="/" />
                        </Route>
                        <Route exact path="/" component={Overview} />
                        <Route exact path="/nutrition" component={Nutrition} />
                        <Route exact path="/exercise" component={Exercise} />
                        <Route exact path="/account" component={Account} />
                        <Route exact path="/exercise/history" component={ExerciseHistory}/>
                        <Route exact path="/nutrition/history" component={NutritionHistory}/>
                        <Route exact path="/spinner" component={SpinnerPage}/>
                        <Route render={() => <Redirect to={{pathname: "/"}} />} />
                    </Switch>
                </div>
            </div>
        ) :
        <div>
            <Switch>
                <Route exact path="/signin">
                  {isSignIn ? (
                    <SignIn
                        setIsLoggedIn={updateLogin}
                        setSignIn={updateIsSignIn}
                    />
                  ) : (
                    <SignUp
                        setSignIn={updateIsSignIn}
                    />
                  )}
                </Route>
                <Route render={() => <Redirect to={{pathname: "/signin"}} />} />
            </Switch>
        </div>
        }
    </BrowserRouter>
  );
}
export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
