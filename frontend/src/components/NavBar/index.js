import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../redux/reducers/auth";

const NavBar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //redux login states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });

  //get user info, so i could use user info, such as name and pic
  //! to be used in advance
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.info);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //navigations functions
  const goToMyProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const login = () => {
    navigate(`/login`);
  };

  const register = () => {
    navigate(`/register`);
  };

  const goToHome = () => {
    navigate(`/home`);
  };

  const searchNow = () => {
    navigate(`/home/${searchValue}`);
  };

  return (
    <div>
      {isLoggedIn ? (
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ border: " 1px solid black" }}
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem
                  onClick={() => {
                    goToHome();
                  }}
                >
                  <MDBNavbarLink active aria-current="page" href="#">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem
                  onClick={() => {
                    goToMyProfile();
                  }}
                >
                  <MDBNavbarLink href="#">Profile</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href="#">Friend Requests</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                >
                  <MDBNavbarLink href="#">Logout</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>

              <form className="d-flex input-group w-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <MDBBtn color="primary" onClick={searchNow}>
                  Search
                </MDBBtn>
              </form>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      ) : (
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand href="#">Brand</MDBNavbarBrand>

            <MDBNavbarToggler
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ border: " 1px solid black" }}
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem
                  onClick={() => {
                    login();
                  }}
                >
                  <MDBNavbarLink active aria-current="page" href="#">
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem
                  onClick={() => {
                    register();
                  }}
                >
                  <MDBNavbarLink active>Register</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      )}
    </div>
  );
};

export default NavBar;
