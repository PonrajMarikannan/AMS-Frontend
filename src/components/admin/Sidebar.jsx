import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import man from '../../assets/boy.png';
import { IoGrid } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from 'react-icons/bi';
import { IoMdPersonAdd } from "react-icons/io";
import { FcLeave } from "react-icons/fc";
import { MdHealthAndSafety } from "react-icons/md";


function SideBar() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem('UserId');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (id === null) {
      navigate('/');
    }
  }, [id, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleMessages = () => setMessagesOpen(!messagesOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-72 bg-indigo-900 text-white flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <h1 className="mt-10 ml-20 mb-24 text-3xl font-bold">ADMIN</h1>
          <ul className="mt-8 space-y-4 ml-6">
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 font-semibold hover:bg-indigo-800">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <IoGrid />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-indigo-800">
              <Link to="/addstaffs" className="flex items-center space-x-2">
                <IoMdPersonAdd/>
                <span>Add Staff</span>
              </Link>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-indigo-800">
              <Link to="/SplChild" className="flex items-center space-x-2">
                <MdHealthAndSafety />
                <span>Special Care</span>
              </Link>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-indigo-800">
              <Link to="/handlerequest" className="flex items-center space-x-2">
                <FcLeave />
                <span>Leave Request</span>
              </Link>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-200 hover:bg-indigo-800">
              <a href="/" onClick={handleLogout} className="flex items-center space-x-2">
                <BiLogOut className="text-red-400" size={24} />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto mb-6 ml-10 flex items-center">
          <img className="h-12 w-12 rounded-full" src={man} alt="User profile" />
          <div className="ml-3">
            <p className="font-medium">Admin</p>
            <p className="text-sm text-gray-300">Kiev, Ukraine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
