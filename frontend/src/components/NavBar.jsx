import React, { useState } from "react";
import { Icon, IconButton, Menu } from "@mui/material";
import { Person, Search } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Navbar.scss";
import { setLogout } from "../redux/state";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search ===""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {
              navigate(`/search/${search}`);
            }}
          />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-car" className="host">
            Add a car
          </a>
        ) : (
          <a href="/login" className="host">
            Add a car
          </a>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} open={dropDownMenu} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3030/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/`}>Car List</Link>
            <Link to="/create-car">Enter a Car</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
