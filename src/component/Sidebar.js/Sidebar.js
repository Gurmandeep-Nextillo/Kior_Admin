import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import MedicationIcon from '@mui/icons-material/Medication';
import { clearLoginData } from "../../redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearlogoutData, logout } from "../../redux/logoutSlice";
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import test_img from '../../assests/img/test_img.png'
import patient_icon from '../../assests/img/patient_icon.png'

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
                  <GridViewIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <CategoryIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/test" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  {({ isActive }) => (
                    <>
                      <img src={test_img} alt="test_img" className={isActive ? 'active-link-img' : 'span_color-img'} />{" "}
                      <span>Tests</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/packages" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <InventoryOutlinedIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Packages</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/patient" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  {({ isActive }) => (
                    <>
                      <img src={patient_icon} alt="patient_icon" className={isActive ? 'active-link-img' : 'span_color-img'} />{" "}
                      <span>Patient</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/doctor" className={({ isActive }) => (isActive ? 'active-link' : 'span_color')}>
                  <MedicationOutlinedIcon className={({ isActive }) => (isActive ? 'active-link' : 'span_color')} />{" "}
                  <span>Doctor</span>
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => onLogoutClick()} >
                  <LogoutIcon style={{ color: '#fff' }} />{" "}
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

