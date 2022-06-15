import React, { useEffect } from "react";
import {
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../actions/userActions";

//icons
import { ImFire } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";


//Header component
function Header({ setSearch }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    // window.location(/);
  };

  useEffect(() => {}, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-slate-900 m-0 p-0" variant="dark">
          <Nav className="left-0 bg-slate-700">
              <Form inline>
              <div className="search-icon">
              <IoSearchOutline/>
              </div>
                <input
                  type="text"
                  placeholder="Search 8,000+ tutorials"
                  className="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
          </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand href="/" className="logo mx-auto">freeCodeCamp<span>(<ImFire/>)</span></Navbar.Brand>
          <Nav>
          <Nav.Link href="/courses"><span className="buttn">Menu</span></Nav.Link>
            {userInfo ? (
              <>
                {/* <Nav.Link href="/mynotes">My Notes</Nav.Link> */}
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                  style={{marginRight:30}}
                >
                  <NavDropdown.Item href="/profile">
                    <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    />
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login"><span className="button">Sign in</span></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
