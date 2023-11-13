// NavigationPanel.jsx
import React, { useRef, useState } from 'react';
import {
  BiLogoTwitter, BiLogoFacebook, BiLogoInstagram,
} from 'react-icons/bi';
import { HiMenuAlt4 } from 'react-icons/hi';
import { TfiGoogle } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/E-bikebackground.png';
import useClickOutside from '../hooks/useClickOutside';
import { logout } from '../redux/auth/authSlice';

function NavigationPanel() {
  const { isLogined, user } = useSelector((state) => state.authSlice);
  const isAdmin = user.role === 'admin';
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const navbarRef = useRef(null);

  const removeNavPanel = () => {
    setMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useClickOutside(navbarRef, removeNavPanel);

  return (
    <>
      <button type="button" id="openMenuButton" className="md:fixed top-15 left-5" onClick={() => setMenu(true)} aria-label="Open menu">
        <HiMenuAlt4 className="text-[40px]" />
      </button>
      {menu && (
        <nav ref={navbarRef} className="flex flex-col border-r bg-white text-center md:text-left border-white md:w-[16%] lg:w-[12%] fixed md:absolute top-0 left-0 bottom-0 right-0">
          <button type="button" id="closeMenuButton" aria-label="Close menu" onClick={removeNavPanel}>
            <HiMenuAlt4 className="text-[40px]" />
          </button>
          <img className="w-1/2 h-1/5 block mx-auto" src={logo} alt="car logo" />
          <div className="flex flex-col w-full h-4/5 absolute md:left-0 bottom-0 md:pl-3 justify-between">
            <ul className="mt-10">
              <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#3f4235] hover:text-white font-[900] text-xs my-2 block" to="/ebikes">E-BIKE</NavLink></li>
              <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">REMOVE BIKE</NavLink></li>
              {isLogined && isAdmin && <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/addEbike">ADD BIKE</NavLink></li>}
              {isLogined && (
                <>
                  <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/myreservations">MY RESERVATIONS</NavLink></li>
                  <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/ebikes/:id/reservations/new">BOOK A TEST DRIVE</NavLink></li>
                  <li><NavLink onClick={() => { removeNavPanel(); handleLogout(); }} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">LOG OUT</NavLink></li>
                </>
              )}
              {!isLogined && <li><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">HOME</NavLink></li>}
            </ul>
            <div>
              <ul className="icons-navigation-panel">
                <li className="items-navigation-panel"><NavLink onClick={removeNavPanel} to="/"><BiLogoTwitter /></NavLink></li>
                <li className="items-navigation-panel"><NavLink onClick={removeNavPanel} to="/"><BiLogoFacebook /></NavLink></li>
                <li className="items-navigation-panel"><NavLink onClick={removeNavPanel} to="/"><TfiGoogle /></NavLink></li>
                <li className="items-navigation-panel"><NavLink onClick={removeNavPanel} to="/"><BiLogoInstagram /></NavLink></li>
                {/* Removed unused Pinterest icon */}
              </ul>
              <p className="text-[8px] mx-0 text-center mb-3">@ 2023 PLAGGIO & CSPA - PIVA</p>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavigationPanel;
