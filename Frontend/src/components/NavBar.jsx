import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { useNavigate } from "react-router-dom";
import * as url from "../utilities/urlController";

const NavBar = () => {

  const Navigate = useNavigate();
  const auth = sessionStorage.getItem("authtoken");
  const role = sessionStorage.getItem("role");
  const handleLogOut = () => {
    sessionStorage.clear();
    Navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-title-div">
        <img className="navbar-icon" onClick={() => { Navigate("/") }}
          src="data:image/png;base64,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"
          alt="student-center"></img>
      </div>
      <h1 className="navbar-title">Student Management System</h1>
      <div className="navbar-pushtocorner">

        {auth ? (
          <div className="navbar-bnsDiv">

            <Menu menuClassName="userprofilemenu"
              align={"end"}
              arrow={true}
              viewScroll={"close"}
              position={"auto"}
              menuButton={<MenuButton className="userprofileBn">
                <img className="userprofilelogo"
                  src="data:image/png;base64,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"
                  alt="user-male-circle"></img> </MenuButton>} >

              {role === "ROLE_ADMIN" && <MenuItem> <a href={"/testscreen"}>Test Screen</a> </MenuItem>}
              {role != "ROLE_TEACHER" ? (
                <MenuItem onClick={() => { Navigate(url.studentprofile); }}> Profile </MenuItem>
              ) : (
                <MenuItem onClick={() => { Navigate(url.teacherprofile); }}> Profile </MenuItem>
              )}
              <MenuItem onClick={() => { Navigate(url.changepassword); }}> Change Password </MenuItem>
              <MenuItem onClick={() => { handleLogOut(); }}> Log Out </MenuItem>

            </Menu >

          </div >
        ) : (
          <div className="navbar-bnsDiv">

            <div className="navmenu">
              <a href="#footer">Contact us</a>
            </div>

            <button className="navbar-bns" onClick={() => { Navigate(url.login); }}>
              Log in
            </button>
          </div>
        )
        }
      </div >
    </div >
  );
};

export default NavBar;
