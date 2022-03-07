import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './css/Sidebar.css';
import logo from "../Photos/logos/mainlogo2.png"
import account_picture from "../Photos/users/defaultuser.png"
import account_picture2 from "../Photos/users/mypicture.png"
import { ReactTypical } from '@deadcoder0904/react-typical';

export function Sidebar(props: any) {

    const [inactive, setInactive] = useState(false);
    const [alreadyLoaded, setAlreadyLoaded] = useState(false);

    useEffect(() => {
        if (inactive) {
            document.querySelectorAll('.sub-menu').forEach((el: any) => {
                el.classList.remove("inactive");
            })
        }
        props.onCollapse(inactive);
    }, [inactive])

    function search() {
        //empty function for now
    }
    
    const ReactTypicalOrNormal = () => {
        setAlreadyLoaded(true);
        if (!alreadyLoaded) {
            return (
                <h5>
                    <ReactTypical wrapper="p" steps={[
                        'Zero',
                        300,
                        'Zero excuses',
                        300,
                        'Zero Calorie',
                        300,
                        'Zero Calorie rule',
                        300,
                        'Zero Calorie Water',
                    ]}/>
                </h5>
            );
        } else {
            return (
                <h5>
                    Menu
                </h5>
            )
        }
    }

    const menuItems = [
        {name: "Overview", exact: true, to: "/", iconClassName: "bi bi-speedometer2"},
        {name: "Nutrition", exact: true, to: "/nutrition", iconClassName: "bi bi-heart-fill",
            subMenus: [
                {name: "History", to: "/nutrition/history"},
                {name: "Something else...", to: "/nutrition/somethingelse..."}
            ]},
        {name: "Exercise", exact: true, to: "/exercise", iconClassName: "bi bi-earbuds",
            subMenus: [
                {name: "History", to: "/exercise/history"}
            ]},
        {name: "Account", to: "/account", iconClassName: "bi bi-person-lines-fill"},
    ];

    const MenuItem = (props: any) => {
        const { name, subMenus, iconClassName, onClick, to, exact } = props;
        const [expand, setExpand] = useState(false);
        return(
            <li onClick={props.onClick}>
                <NavLink exact to={to} className="menu-item" onClick={() => setExpand(!expand)}>
                    <div className="menu-icon">
                        <i className={iconClassName} />
                    </div>
                    <span>{name}</span>
                </NavLink>
                {
                    subMenus && subMenus.length > 0 ? (
                        <ul className={`sub-menu ${expand ? "active" : ""}`} >
                            {subMenus.map((menu: any, idx: any) => 
                                <li key={idx}>
                                    <NavLink to={menu.to}>
                                        {menu.name}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    ) : null
                }
            </li>
        )
    }

    return (
        <div className={`side-bar ${inactive ? 'inactive' : ''}`}>
            <div className="top-section">
                <div className="logo">
                    <img src={logo} alt="webscript" />
                </div>
                <div className="appname">
                    <ReactTypicalOrNormal />
                </div>
                <button className="toggle-bar-btn" onClick={() => setInactive(!inactive)}>
                    {inactive ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
                        </svg>
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                        </svg>
                    }
                </button>
                <div className="search-controller">
                    {inactive ? 
                        <button className="search-btn" onClick={() => setInactive(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    :
                        <button className="search-btn" onClick={() => search()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    }
                    <input type="text" placeholder="Search ..." />
                </div>
                <div className="divider" />
            </div>
            <div className="main-menu">
                <ul>
                    {
                        menuItems.map((menuItem: any, idx: any) => (
                            <MenuItem
                                key={idx}
                                name={menuItem.name}
                                exact={menuItem.exact}
                                to={menuItem.to}
                                subMenus={menuItem.subMenus || []}
                                iconClassName={menuItem.iconClassName}
                                //onClick={() => {
                                //    if (inactive) {
                                //        setInactive(false);
                                //    }
                                //}}
                            />
                        ))
                    }
                </ul>
            </div>
            <div className="side-bar-footer">
                <div className="account-avatar">
                    <img src={account_picture2} alt="account"/>
                </div>
                <div className="account-info">
                    <h5>Søren Tønnesen</h5>
                    <p>sorentoennesen@gmail.com</p>
                </div>
            </div>
        </div>
    )
}