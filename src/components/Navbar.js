import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { AuthContext } from "../pages/AuthProvider"; // Update the path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faCog, faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext); // Get user and logOut function from AuthContext

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
    },
    {
      name: "Meal Planner",
      path: "/mealplanner",
      icon: faUtensils,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: faCog,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">
          Fla<span>vour</span>Fusion
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>
              {link.name}
            </Link>
          ))}
        </div>
        <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="login-logout">
          {user ? (
            // If user is authenticated, show logout button
            <button onClick={logOut}>Logout</button>
          ) : (
            // If user is not authenticated, show login button
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
}
