import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import MedicationIcon from '@mui/icons-material/Medication';
import { clearLoginData } from "../../redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearlogoutData, logout } from "../../redux/logoutSlice";

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logoutSuccess = useSelector((state) => state.logoutReducer.data);

  useEffect(() => {
    if (logoutSuccess != null && logoutSuccess.status == 1) {
      dispatch(clearLoginData());
      dispatch(clearlogoutData())
      navigation('/')
    }
  }, [logoutSuccess]);


  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="my-3">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="top-section">
            <h1 className="logo">
              <MedicationIcon />{" "}
              Kior
            </h1>
            {/* <div className="bars" onClick={toggleSidebar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div> */}
          </div>
          <nav className="nav-menu">
            <ul>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <MedicationIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <MedicationIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Categories</span>

                </NavLink>
              </li>
              <li>
                <NavLink to="/test" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <MedicationIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Tests</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/Packages" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <MedicationIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Packages</span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => onLogoutClick()} >
                  <MedicationIcon style={{ color: '#fff' }} />{" "}
                  <span style={{ color: '#fff' }}>Logout</span>
                </NavLink>
              </li>
            </ul>

          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

