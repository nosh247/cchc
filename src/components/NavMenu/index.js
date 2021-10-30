import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavMenu.scss";
import landingData from "data/landingData";
import hamMenuImg from "assets/ham-menu.png";
import * as Scroll from "react-scroll";
import { Link } from "react-scroll";
import "animate.css/animate.css";

function useClickOutsideRef(callback, initialValue=null){
  const elementRef = useRef(initialValue);
  useEffect(()=>{
    function handler(e) {
      if(!elementRef.current?.contains(e.target)){
        callback();
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);

  },[callback]);

  return elementRef;
}

function NavMenu(props) {
  const location = useLocation();
  const modalRef = useClickOutsideRef(()=>setMenuOpen(false));

  const { Logout, isAuthenticated, setFeedback } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  let { navItemsLoggedIn, navItemsLoggedOut } = landingData;
  const [menu, setMenu] = useState(navItemsLoggedOut);
  const [isMainPage, setIsMainPage] = useState(false);

  //functions
  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menuopen");
    } else {
      document.body.classList.remove("menuopen");
    }

    setIsMainPage(!location.pathname.includes("/mint"));

    if (isAuthenticated) {
      if (menu !== navItemsLoggedIn) {
        setMenu(navItemsLoggedIn);
      }
    } else {
      if (menu !== navItemsLoggedOut) {
        setMenu(navItemsLoggedOut);
      }
    }
  }, [
    isAuthenticated,
    location,
    menu,
    navItemsLoggedIn,
    navItemsLoggedOut,
    menuOpen,
    isMainPage,
    setMenuOpen
  ]);

  const goHomeAndScroll = (link) => {
    setMenuOpen(false);
    if (link === "Logout") Logout();
    console.log("link:", link);
    setTimeout(() => {
      setFeedback("");
      Scroll.scroller.scrollTo(
        link,
        {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: 50,
        },
        1000
      );
    });
  };

  const selectNav = (link) => {
    setMenuOpen(false);
    if (link === "Logout") Logout();
  };

  return (
    <div className="nav-wrapper" ref={modalRef}>
      <span
        className={`ham-menu ${menuOpen ? "closed" : "openned"}`}
        onClick={() => openMenu()}
      >
        <img width="32" height="32" alt="hamburguer menu" src={hamMenuImg} />
        {isMainPage.toString()}
      </span>
      <ul className={`nav-items ${menuOpen? "openned animate__animated animate__bounceInDown" : "closed"}`}>
        {isMainPage &&
          menu.map((n, i) => (
            <Link
              to={n.to}
              className="nav-item"
              key={i}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => selectNav(n.to)}
            >
              <span className="nav-item-text">{n.name}</span>
            </Link>
          ))}
        {!isMainPage &&
          menu.map((n, i) => (
            <NavLink
              to={"/"}
              className="nav-item"
              key={i}
              onClick={() => goHomeAndScroll(n.to)}
            >
              <span className="nav-item-text">{n.name}</span>
            </NavLink>
          ))}
      </ul>
    </div>
  );
}
export default NavMenu;
