import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/images/Logo-2.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AutoMan from "./autocomplete/autosuggest/AutoSuggest";
import CartButton from "./cart/CartButton";
import CartBadge from "./cart/CartBadge";
import NewDropDown from "./dropdown/NewDropDown";
import CatalogDropDown from "./dropdown/CatalogDropDown";
const mainNav = [
  {
    display: "TRANG CHỦ",
    path: "/",
    // dropdown:<CatalogDropDown/>
  },
  {
    display: "SẢN PHẨM",
    path: "/catalog",
  },
  {
    display: "TIN TỨC",
    path: "/accessories",
    dropdown: <NewDropDown />,
  },
  {
    display: "LIÊN HỆ",
    path: "/contact",
    // dropdown:<CatalogDropDown/>
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header">
      <div className="container">
        <div className="header__information">
          <div className="header__information__phone">
            <div className="header__information__sign__icon">
              <LocalPhoneIcon />
            </div>
            <div className="header__information__sign__text">
              CSKH:038769993
            </div>
          </div>
          <div className="header__information__sign">
            <div className="header__information__sign__icon">
              <LoginIcon />
            </div>
            <div className="header__information__sign__text">
              <div>
                <a href="/login">Đăng nhập</a>
              </div>
            </div>
            <div className="vertical"></div>
            <div className="header__information__sign__icon">
              <PersonAddIcon />
            </div>
            <div className="header__information__sign__text">
              <div>
                <a href="/signup">Đăng kí</a>
              </div>
            </div>
          </div>
        </div>
        <div className="header__main">
          <div className="header__main__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__main__search-bar">
            {/* <FreeSolo /> */}
            {/* <Autocomplete/> */}
            <AutoMan />
          </div>
          <div className="header__main__card-button">
            <CartButton />
          </div>
        </div>

        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>
                    {item.display}
                    {item.dropdown && <i className="bx bx-chevron-right"></i>}
                  </span>
                </Link>
                {item.dropdown && item.dropdown}
              </div>
            ))}
          </div>
          <div className="header__menu__center">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__menu__item header__menu__right__mobile">
            <div className="header__menu__item header__menu__right__mobile__item">
              <CartBadge />
            </div>
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-phone-call"></i>
              <span className="header__menu__right__item__text">
                CSKH:038769993
              </span>
            </div>
            {/* <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-user"></i>
                        </div> */}
          </div>
        </div>
        <div className="header__search__mobile">
          <AutoMan />
        </div>
      </div>
    </div>
  );
};

export default Header;
