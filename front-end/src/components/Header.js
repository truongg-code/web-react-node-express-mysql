import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.scss";
import { fetchNavBar } from "../services/Service";
import QuickCart from "./QuickCart";
import { useShoppingContext } from "../contexts/ShoppingContext";
import SearchInput from "./SearchInput";

const Header = () => {
  const [navBarList, setNavBarList] = useState([]);

  const [isShowQuickCart, setIsShowQuickCart] = useState(false);

  const { cartQty } = useShoppingContext();
  const navigate = useNavigate();

  useEffect(() => {
    getNavBar();
  }, []);

  const getNavBar = async () => {
    let res = await fetchNavBar();
    if (res) {
      setNavBarList(res);
    }
  };

  const handleClose = () => {
    setIsShowQuickCart(false);
  };
  return (
    <>
      <div className="header-container">
        <QuickCart show={isShowQuickCart} handleClose={handleClose} />
        <Navbar
          expand="lg"
          className="bg-body-tertiary nav-container d-flex"
          fixed="top"
        >
          <Container>
            <div className="icon-header-mobile">
              <i
                className="fa-solid fa-magnifying-glass d-lg-none d-inline-block fs-1"
                id="search-icon"
              ></i>
              <i
                className="fa-solid fa-cart-shopping d-md-none"
                id="cart-icon"
                onClick={() => setIsShowQuickCart(true)}
              ></i>
            </div>
            <Navbar.Brand href="/">
              <img
                src="https://dreamparty.pk/cdn/shop/files/Logo.jpg?v=1668790297&width=190"
                alt="Logo shop"
                width={100}
                height={100}
                className="logo-shop"
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="hamburger"
            />
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-hidden">
              <Nav className="me-auto  flex-wrap col-7 link-option">
                {/* <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/collections/shop-all" className="nav-link">
                  Shop All
                </NavLink> */}

                {navBarList &&
                  navBarList.length > 0 &&
                  navBarList.map((item) => {
                    if (item.isParents === 0) {
                      return (
                        <NavLink
                          to={item.path}
                          className="nav-link"
                          key={`item-nav-${item.NavID}`}
                          // onClick={() => {
                          //   navigate(`${item.path}`);
                          //   window.location.reload();
                          // }}
                        >
                          {item.name}
                        </NavLink>
                      );
                    } else {
                      return (
                        <NavDropdown
                          title={item.name}
                          id="basic-nav-dropdown"
                          key={`item-nav-${item.NavID}`}
                        >
                          <NavDropdown.Item href="#action/3.1">
                            Action
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">
                            Another action
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">
                            Something
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">
                            Separated link
                          </NavDropdown.Item>
                        </NavDropdown>
                      );
                    }
                  })}

                {/* <NavDropdown title="Special Occassions" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}

                {/* <NavDropdown title="Items catagories" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}

                {/* <Nav.Link href="/">Instruction</Nav.Link>

                <NavLink to="/contact-us" className="nav-link">
                  Contact-us/Review
                </NavLink> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
          <SearchInput />
          <div className="symbol d-none d-md-flex">
            <i className="fa-regular fa-user"></i>
            <div className="cart-icon-container">
              <span className="cart-quantity">{cartQty}</span>
              <i
                className="fa-solid fa-cart-shopping d-inline-block"
                onClick={() => setIsShowQuickCart(true)}
              ></i>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
